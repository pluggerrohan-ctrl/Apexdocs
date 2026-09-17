import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const PDFCO_API_KEY = Deno.env.get("PDFCO_API_KEY") ?? "";
const PDFCO_TIMEOUT_MS = 100;

function pdfCoFetch(input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> {
  return fetch(input, { ...init, signal: AbortSignal.timeout(PDFCO_TIMEOUT_MS) });
}

const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Keep this in sync with FREE_MONTHLY_LIMIT in src/lib/usageLimits.ts.
// The client-side value is only used for optimistic UI display —
// this is the value that actually gets enforced.
const FREE_MONTHLY_LIMIT = 2;

function currentMonthKey(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

interface UsageRow {
  device_id: string;
  month: string;
  count: number;
  is_pro: boolean;
}

// Server-side source of truth. A device id coming from the client is
// just an identifier, not a trust boundary — the free/pro decision is
// made here, against the database, not against anything the browser sends.
async function checkUsageLimit(
  deviceId: string,
): Promise<{ allowed: boolean; isPro: boolean; remaining: number }> {
  const month = currentMonthKey();
  const { data, error } = await supabaseAdmin
    .from("usage_limits")
    .select("device_id, month, count, is_pro")
    .eq("device_id", deviceId)
    .maybeSingle<UsageRow>();

  if (error) {
    // Fail open on infra errors so a DB hiccup doesn't block a legit
    // user, but log it so it can be investigated.
    console.error("[usage] lookup failed:", error.message);
    return { allowed: true, isPro: false, remaining: FREE_MONTHLY_LIMIT };
  }

  if (data?.is_pro) {
    return { allowed: true, isPro: true, remaining: Infinity };
  }

  const count = data && data.month === month ? data.count : 0;
  return {
    allowed: count < FREE_MONTHLY_LIMIT,
    isPro: false,
    remaining: Math.max(0, FREE_MONTHLY_LIMIT - count),
  };
}

async function recordConversion(deviceId: string): Promise<void> {
  const month = currentMonthKey();
  const { data } = await supabaseAdmin
    .from("usage_limits")
    .select("month, count")
    .eq("device_id", deviceId)
    .maybeSingle<{ month: string; count: number }>();

  const nextCount = data && data.month === month ? data.count + 1 : 1;

  const { error } = await supabaseAdmin
    .from("usage_limits")
    .upsert(
      { device_id: deviceId, month, count: nextCount, updated_at: new Date().toISOString() },
      { onConflict: "device_id" },
    );

  if (error) console.error("[usage] increment failed:", error.message);
}

// Set to true only while debugging locally — some debugLog calls print
// the first 200 chars of actual extracted statement text, which can
// include real transaction data. Keep this false in production.
const DEBUG = false;

function debugLog(label: string, data: unknown) {
  if (!DEBUG) return;
  // Log only structural info — never log full text/values that may contain account data
  if (typeof data === "string") {
    console.log(`[DEBUG] ${label}: string length=${data.length}, first 200 chars=${data.substring(0, 200)}`);
  } else if (Array.isArray(data)) {
    console.log(`[DEBUG] ${label}: array length=${data.length}`);
    if (data.length > 0) {
      const first = data[0];
      if (Array.isArray(first)) {
        console.log(`[DEBUG] ${label}[0]: array length=${first.length}`);
      } else if (typeof first === "object" && first !== null) {
        console.log(`[DEBUG] ${label}[0] keys: ${Object.keys(first).join(", ")}`);
      } else {
        console.log(`[DEBUG] ${label}[0] type: ${typeof first}`);
      }
    }
  } else if (typeof data === "object" && data !== null) {
    console.log(`[DEBUG] ${label}: object keys=${Object.keys(data).join(", ")}`);
  } else {
    console.log(`[DEBUG] ${label}: ${String(data).substring(0, 200)}`);
  }
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

interface PdfCoPresignedResponse {
  presignedUrl?: string;
  url?: string;
  error?: boolean;
  status?: number;
  message?: string;
}

interface TransactionRow {
  [key: string]: string;
}

interface ColumnDef {
  name: string;
  index: number;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function jsonResponse(
  body: Record<string, unknown>,
  status = 200,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function bufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// ─────────────────────────────────────────────
// PDF.co API calls
// ─────────────────────────────────────────────

async function uploadToPdfCo(
  fileBuffer: ArrayBuffer,
  fileName: string,
): Promise<string> {
  // Step 1: Get presigned URL from PDF.co
  const presignEndpoint = "https://api.pdf.co/v1/file/upload/get-presigned-url";
  const presignParams = new URLSearchParams();
  presignParams.append("name", fileName);

  const presignResp = await pdfCoFetch(
    `${presignEndpoint}?${presignParams.toString()}`,
    {
      method: "GET",
      headers: {
        "x-api-key": PDFCO_API_KEY,
        "Content-Type": "application/json",
      },
    },
  );

  const presignStatus = presignResp.status;
  let presignData: PdfCoPresignedResponse;

  try {
    presignData = await presignResp.json();
  } catch {
    const rawBody = await presignResp.text().catch(() => "unreadable");
    console.error("[PDF.co] Presigned URL request failed:", {
      httpStatus: presignStatus,
      responseBody: rawBody,
    });
    throw new Error(
      `PDF.co upload failed: could not parse presigned URL response (HTTP ${presignStatus})`,
    );
  }

  if (presignData.error || !presignData.presignedUrl || !presignData.url) {
    console.error("[PDF.co] Presigned URL response contained an error:", {
      httpStatus: presignStatus,
      errorMessage: presignData.message,
      hasPresignedUrl: !!presignData.presignedUrl,
      hasUrl: !!presignData.url,
    });
    throw new Error(
      `PDF.co upload failed: ${presignData.message ?? "Presigned URL not returned"}`,
    );
  }

  // Step 2: PUT the actual PDF bytes to the presigned URL
  const putResp = await pdfCoFetch(presignData.presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/pdf",
    },
    body: fileBuffer,
  });

  if (!putResp.ok) {
    const putBody = await putResp.text().catch(() => "unreadable");
    console.error("[PDF.co] PUT to presigned URL failed:", {
      httpStatus: putResp.status,
      responseBody: putBody,
    });
    throw new Error(
      `PDF.co upload failed: file upload HTTP ${putResp.status}`,
    );
  }

  // Return the PDF.co file URL for use in extraction
  return presignData.url;
}

async function extractTablesFromPdf(
  fileUrl: string,
  ): Promise<string[][]> {
  const endpoint = "https://api.pdf.co/v1/pdf/convert/to/csv";
  const params = new URLSearchParams();
  params.append("url", fileUrl);
  params.append("inline", "false");
  params.append("name", "extracted_tables");


  const resp = await pdfCoFetch(`${endpoint}?${params.toString()}`, {
    method: "POST",
    headers: {
      "x-api-key": PDFCO_API_KEY,
      "Content-Type": "application/json",
    },
  });

  const data = await resp.json();

  debugLog("CSV extraction response", data);

  if (data.error) {
    throw new Error(`PDF.co CSV extraction failed: ${data.message ?? "Unknown"}`);
  }

  if (!data.url) {
    throw new Error("PDF.co CSV did not return a result URL");
  }

  const csvResp = await pdfCoFetch(data.url);
  const csvText = await csvResp.text();

  debugLog("CSV result text", csvText);

  const parsed = parseCsv(csvText);
  debugLog("CSV parsed rows", parsed);
  return parsed;
}

async function extractJsonFromPdf(
  fileUrl: string,
  ): Promise<string[][]> {
  const endpoint = "https://api.pdf.co/v1/pdf/convert/to/json2";
  const params = new URLSearchParams();
  params.append("url", fileUrl);
  params.append("inline", "false");
  params.append("name", "extracted_json");
  params.append("tableDetection", "true");


  const resp = await pdfCoFetch(`${endpoint}?${params.toString()}`, {
    method: "POST",
    headers: {
      "x-api-key": PDFCO_API_KEY,
      "Content-Type": "application/json",
    },
  });

  const data = await resp.json();

  debugLog("JSON2 extraction response", data);

  if (data.error) {
    throw new Error(`PDF.co JSON extraction failed: ${data.message ?? "Unknown"}`);
  }

  if (!data.url) {
    throw new Error("PDF.co JSON did not return a result URL");
  }

  const jsonResp = await pdfCoFetch(data.url);
  const jsonText = await jsonResp.text();

  debugLog("JSON2 result text", jsonText);

  const parsed = parseJson2Tables(jsonText);
  debugLog("JSON2 parsed rows", parsed);
  return parsed;
}

// ─────────────────────────────────────────────
// Parsing helpers
// ─────────────────────────────────────────────

function parseCsv(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = "";
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];

    if (inQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        currentRow.push(currentField.trim());
        currentField = "";
      } else if (char === "\n" || char === "\r") {
        if (char === "\r" && nextChar === "\n") {
          i++;
        }
        currentRow.push(currentField.trim());
        if (currentRow.length > 1 || currentRow[0] !== "") {
          rows.push(currentRow);
        }
        currentRow = [];
        currentField = "";
      } else {
        currentField += char;
      }
    }
  }

  if (currentField !== "" || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    if (currentRow.length > 1 || currentRow[0] !== "") {
      rows.push(currentRow);
    }
  }

  return rows;
}

// Parse PDF.co JSON2 format to extract tables
// PDF.co JSON2 can return several structures:
// 1. { items: [{ tables: [[["Date","Description"],["01/01","Opening"]]] }] }
// 2. { body: { items: [{ text, rowID, columnID, x, y, width, height }] } }
// 3. { items: [{ text, rowID, columnID }] } (flat text items with grid coords)
// 4. { tables: [[[...]]] }
// 5. { body: { items: [{ items: [{ text, rowID, columnID }] }] } }
function parseJson2Tables(jsonText: string): string[][] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    debugLog("JSON2 parse failed: not valid JSON", jsonText);
    return [];
  }

  debugLog("JSON2 top-level object", parsed);

  // ─── Structure 1: items[].tables[] ───
  const itemsWithTables = findItemsArray(parsed);
  if (itemsWithTables) {
    for (const item of itemsWithTables) {
      if (item && typeof item === "object" && Array.isArray((item as Record<string, unknown>).tables)) {
        const tables = (item as Record<string, unknown[]>).tables;
        const allRows: string[][] = [];
        for (const table of tables) {
          if (Array.isArray(table)) {
            for (const row of table) {
              if (Array.isArray(row)) {
                allRows.push(row.map((cell) => String(cell ?? "").trim()));
              }
            }
          }
        }
        if (allRows.length > 0) {
          debugLog("JSON2 extracted from items[].tables[]", allRows);
          return allRows;
        }
      }
    }
  }

  // ─── Structure 2: direct tables array ───
  if (parsed && typeof parsed === "object" && Array.isArray((parsed as Record<string, unknown>).tables)) {
    const tables = (parsed as Record<string, unknown[]>).tables;
    const allRows: string[][] = [];
    for (const table of tables) {
      if (Array.isArray(table)) {
        for (const row of table) {
          if (Array.isArray(row)) {
            allRows.push(row.map((cell) => String(cell ?? "").trim()));
          }
        }
      }
    }
    if (allRows.length > 0) {
      debugLog("JSON2 extracted from top-level tables[]", allRows);
      return allRows;
    }
  }

  // ─── Structure 3: body.items[] or items[] with text + rowID/columnID ───
  // These are flat text items that need to be assembled into a grid
  const textItems = findTextItems(parsed);
  if (textItems.length > 0) {
    debugLog("JSON2 found text items", textItems);
    const gridRows = assembleGridFromTextItems(textItems);
    if (gridRows.length > 0) {
      debugLog("JSON2 assembled grid from text items", gridRows);
      return gridRows;
    }

    // Fallback: group text items by Y coordinate into rows
    const yGroupedRows = groupTextItemsByY(textItems);
    if (yGroupedRows.length > 0) {
      debugLog("JSON2 Y-grouped rows", yGroupedRows);
      return yGroupedRows;
    }
  }

  // ─── Structure 4: items[] with text only (split by whitespace) ───
  if (itemsWithTables) {
    const textRows: string[][] = [];
    for (const item of itemsWithTables) {
      if (item && typeof item === "object") {
        const textVal = (item as Record<string, unknown>).text;
        if (typeof textVal === "string" && textVal.trim()) {
          const parts = textVal.trim().split(/\t|\s{2,}|\|/).map((p) => p.trim()).filter(Boolean);
          if (parts.length > 1) textRows.push(parts);
        }
      }
    }
    if (textRows.length > 0) {
      debugLog("JSON2 text-split rows", textRows);
      return textRows;
    }
  }

  return [];
}

// Find the items array in various possible locations
function findItemsArray(obj: unknown): unknown[] | null {
  if (!obj || typeof obj !== "object") return null;
  const o = obj as Record<string, unknown>;

  if (Array.isArray(o.items)) return o.items;

  if (o.body && typeof o.body === "object") {
    const body = o.body as Record<string, unknown>;
    if (Array.isArray(body.items)) return body.items;
  }

  if (o.document && typeof o.document === "object") {
    const doc = o.document as Record<string, unknown>;
    if (Array.isArray(doc.items)) return doc.items;
  }

  return null;
}

// Find flat text items with text + coordinates anywhere in the JSON
function findTextItems(obj: unknown): TextItem[] {
  const items: TextItem[] = [];

  function search(node: unknown) {
    if (!node || typeof node !== "object") return;

    if (Array.isArray(node)) {
      for (const el of node) search(el);
      return;
    }

    const o = node as Record<string, unknown>;

    // Check if this node looks like a text item
    if (typeof o.text === "string") {
      items.push({
        text: o.text,
        rowID: typeof o.rowID === "number" ? o.rowID : (typeof o.row === "number" ? o.row : undefined),
        columnID: typeof o.columnID === "number" ? o.columnID : (typeof o.column === "number" ? o.column : (typeof o.col === "number" ? o.col : undefined)),
        x: typeof o.x === "number" ? o.x : (typeof o.left === "number" ? o.left : undefined),
        y: typeof o.y === "number" ? o.y : (typeof o.top === "number" ? o.top : undefined),
        width: typeof o.width === "number" ? o.width : undefined,
        height: typeof o.height === "number" ? o.height : undefined,
      });
    }

    // Recurse into children/properties
    for (const key of Object.keys(o)) {
      if (key !== "text" && key !== "rowID" && key !== "columnID") {
        search(o[key]);
      }
    }
  }

  search(obj);
  return items;
}

interface TextItem {
  text: string;
  rowID?: number;
  columnID?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

// Assemble a 2D grid from text items using rowID/columnID
function assembleGridFromTextItems(items: TextItem[]): string[][] {
  const hasRowCol = items.every((it) => it.rowID !== undefined && it.columnID !== undefined);
  if (!hasRowCol) return [];

  const grid = new Map<number, Map<number, string>>();
  let maxRow = 0;
  let maxCol = 0;

  for (const item of items) {
    const row = item.rowID!;
    const col = item.columnID!;
    if (!grid.has(row)) grid.set(row, new Map());
    const existing = grid.get(row)!.get(col);
    // If multiple items map to the same cell, concatenate with space
    grid.get(row)!.set(col, existing ? `${existing} ${item.text}` : item.text);
    if (row > maxRow) maxRow = row;
    if (col > maxCol) maxCol = col;
  }

  const rows: string[][] = [];
  for (let r = 0; r <= maxRow; r++) {
    const rowMap = grid.get(r);
    if (!rowMap) continue;
    const row: string[] = [];
    for (let c = 0; c <= maxCol; c++) {
      row.push((rowMap.get(c) ?? "").trim());
    }
    // Only add rows that have at least one non-empty cell
    if (row.some((cell) => cell !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

// Group text items into rows by Y coordinate (for items without rowID/columnID)
function groupTextItemsByY(items: TextItem[]): string[][] {
  const withY = items.filter((it) => it.y !== undefined && it.text.trim() !== "");
  if (withY.length === 0) return [];

  // Sort by Y coordinate
  withY.sort((a, b) => (a.y! - b.y!));

  // Group items that have similar Y values (within 5 pixels)
  const rowGroups: TextItem[][] = [];
  let currentGroup: TextItem[] = [];
  let currentY: number | null = null;

  for (const item of withY) {
    if (currentY === null || Math.abs(item.y! - currentY) <= 5) {
      currentGroup.push(item);
      if (currentY === null) currentY = item.y!;
    } else {
      if (currentGroup.length > 0) rowGroups.push(currentGroup);
      currentGroup = [item];
      currentY = item.y!;
    }
  }
  if (currentGroup.length > 0) rowGroups.push(currentGroup);

  // For each row group, sort by X and extract text values
  const rows: string[][] = [];
  for (const group of rowGroups) {
    group.sort((a, b) => (a.x ?? 0) - (b.x ?? 0));
    const rowText = group.map((it) => it.text.trim()).filter(Boolean);
    if (rowText.length > 0) {
      rows.push(rowText);
    }
  }

  return rows;
}

// ─────────────────────────────────────────────
// Table detection & column identification
// ─────────────────────────────────────────────

// Keywords that identify transaction-related column headers
const HEADER_KEYWORDS = [
  "date", "transaction date", "value date", "posting date", "txn date",
  "description", "narration", "details", "particulars", "remarks",
  "reference", "ref no", "reference no", "reference number", "cheque no",
  "cheque number", "chq no", "ref",
  "debit", "withdrawal", "withdrawals", "dr",
  "credit", "deposit", "deposits", "cr",
  "balance", "closing balance", "running balance", "avail balance",
  "amount", "txn amount", "transaction amount",
  "type", "transaction type", "dr/cr",
  "sl no", "sl.", "sno", "s.no", "serial",
  "branch", "ifsc", "upi id", "upi ref",
  "category", "mode",
];

const DATE_PATTERNS = [
  /^\d{1,2}[\/\-\.\s](\d{1,2}|jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[\/\-\.\s]\d{2,4}/i,
  /^\d{4}[\/\-\.\s]\d{1,2}[\/\-\.\s]\d{1,2}/,
  /^(\d{1,2})(st|nd|rd|th)?\s+(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{2,4}/i,
  /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\w*\s+\d{1,2},?\s*\d{2,4}/i,
];

const NUMERIC_PATTERN = /^[\d,]+\.\d{2}$/;
const SIGNED_NUMERIC = /^-?[\d,]+\.\d{2}$/;

function isDateValue(val: string): boolean {
  return DATE_PATTERNS.some((p) => p.test(val.trim()));
}

function isNumericValue(val: string): boolean {
  const cleaned = val.replace(/[,₹$€£]/g, "").trim();
  return SIGNED_NUMERIC.test(cleaned) || NUMERIC_PATTERN.test(cleaned) ||
    /^-?[\d,]+(\.\d+)?$/.test(cleaned);
}

function looksLikeHeaderRow(row: string[]): boolean {
  const lowerRow = row.map((c) => c.toLowerCase().trim());
  const matchCount = lowerRow.filter((cell) =>
    HEADER_KEYWORDS.some((kw) =>
      cell === kw || cell.includes(kw) || kw.includes(cell)
    )
  ).length;
  return matchCount >= 2;
}

function isTransactionDataRow(row: string[], numColumns: number): boolean {
  if (row.length < 2) return false;
  const nonEmpty = row.filter((c) => c.trim() !== "");
  if (nonEmpty.length < 2) return false;

  // A transaction row should have at least a date or a numeric value
  const hasDate = row.some((c) => isDateValue(c));
  const hasNumeric = row.some((c) => isNumericValue(c));

  // Relaxed: accept rows with a date OR a numeric value OR rows with 3+ non-empty cells
  // that are after the header (the header check is done separately)
  return hasDate || hasNumeric || nonEmpty.length >= 3;
}

function findHeaderRow(rows: string[][]): { headerRow: string[]; headerIndex: number } {
  // Scan first 30 rows to find a likely header
  for (let i = 0; i < Math.min(rows.length, 30); i++) {
    if (looksLikeHeaderRow(rows[i])) {
      return { headerRow: cleanHeaderRow(rows[i]), headerIndex: i };
    }
  }

  // If no explicit header found, try to infer from data patterns
  return { headerRow: inferHeaders(rows), headerIndex: -1 };
}

function cleanHeaderRow(row: string[]): string[] {
  return row.map((h, i) => {
    let cleaned = h.trim().replace(/\s+/g, " ");
    if (!cleaned) cleaned = `Column ${i + 1}`;
    return cleaned;
  });
}

function inferHeaders(rows: string[][]): string[] {
  // Analyze the first few data rows to infer column types
  const sampleRows = rows.filter((r) => r.length >= 2).slice(0, 20);
  if (sampleRows.length === 0) return [];

  const maxCols = Math.max(...sampleRows.map((r) => r.length));
  const headers: string[] = [];

  for (let col = 0; col < maxCols; col++) {
    const colValues = sampleRows.map((r) => (r[col] ?? "").trim()).filter(Boolean);
    if (colValues.length === 0) {
      headers.push(`Column ${col + 1}`);
      continue;
    }

    const dateCount = colValues.filter((v) => isDateValue(v)).length;
    const numericCount = colValues.filter((v) => isNumericValue(v)).length;
    const ratio = colValues.length;

    if (dateCount / ratio > 0.5) {
      headers.push("Date");
    } else if (numericCount / ratio > 0.6) {
      // Distinguish debit/credit/balance by position
      const prevHeader = headers[headers.length - 1] ?? "";
      if (prevHeader.toLowerCase().includes("debit") || prevHeader.toLowerCase().includes("withdrawal")) {
        headers.push("Credit");
      } else if (prevHeader.toLowerCase().includes("credit") || prevHeader.toLowerCase().includes("deposit")) {
        headers.push("Balance");
      } else {
        headers.push("Amount");
      }
    } else {
      // Text column
      if (headers.some((h) => h.toLowerCase().includes("date"))) {
        headers.push("Description");
      } else {
        headers.push(`Column ${col + 1}`);
      }
    }
  }

  return headers;
}

function extractTransactions(
  rows: string[][],
  headerRow: string[],
  headerIndex: number,
): TransactionRow[] {
  const columns: ColumnDef[] = headerRow.map((name, index) => ({ name, index }));
  const startIndex = headerIndex >= 0 ? headerIndex + 1 : 0;
  const transactions: TransactionRow[] = [];

  for (let i = startIndex; i < rows.length; i++) {
    const row = rows[i];
    if (!isTransactionDataRow(row, columns.length)) continue;

    const txn: TransactionRow = {};
    for (const col of columns) {
      txn[col.name] = (row[col.index] ?? "").trim();
    }
    // Only add rows that have meaningful content
    const hasContent = Object.values(txn).some((v) => v !== "");
    if (hasContent) {
      transactions.push(txn);
    }
  }

  return transactions;
}

// ─────────────────────────────────────────────
// XLSX generation (minimal OOXML builder)
// ─────────────────────────────────────────────

function escapeXml(text: string): string {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function colLetter(index: number): string {
  let result = "";
  let n = index;
  while (n >= 0) {
    result = String.fromCharCode(65 + (n % 26)) + result;
    n = Math.floor(n / 26) - 1;
  }
  return result;
}

function buildXlsx(headers: string[], transactions: TransactionRow[]): Uint8Array {
  const sheetsXml = buildSheetXml(headers, transactions);
  const sharedStrings = buildSharedStrings(headers, transactions);
  const stylesXml = buildStylesXml();

  const files: Record<string, string | Uint8Array> = {
    "[Content_Types].xml": buildContentTypes(),
    "_rels/.rels": buildRootRels(),
    "xl/workbook.xml": buildWorkbook(),
    "xl/_rels/workbook.xml.rels": buildWorkbookRels(),
    "xl/styles.xml": stylesXml,
    "xl/worksheets/sheet1.xml": sheetsXml,
    "xl/sharedStrings.xml": sharedStrings,
    "xl/_rels/sheet1.xml.rels": buildSheetRels(),
    "docProps/core.xml": buildCoreProps(),
    "docProps/app.xml": buildAppProps(),
  };

  return buildZip(files);
}

function buildSheetXml(headers: string[], transactions: TransactionRow[]): string {
  let rowsXml = "";
  let rowIndex = 1;

  // Header row
  const headerCells = headers.map((h, colIdx) => {
    const ref = `${colLetter(colIdx)}${rowIndex}`;
    return `<c r="${ref}" s="1" t="s"><v>${getSharedStringIndex(h)}</v></c>`;
  }).join("");
  rowsXml += `<row r="${rowIndex}">${headerCells}</row>`;
  rowIndex++;

  // Data rows
  for (const txn of transactions) {
    const cells: string[] = [];
    headers.forEach((header, colIdx) => {
      const value = txn[header] ?? "";
      const ref = `${colLetter(colIdx)}${rowIndex}`;
      // Check if value is numeric
      const numValue = value.replace(/[,₹$€£\s]/g, "");
      if (/^-?\d+(\.\d+)?$/.test(numValue) && numValue !== "") {
        cells.push(`<c r="${ref}" s="2"><v>${numValue}</v></c>`);
      } else {
        cells.push(`<c r="${ref}" s="3" t="s"><v>${getSharedStringIndex(value)}</v></c>`);
      }
    });
    rowsXml += `<row r="${rowIndex}">${cells.join("")}</row>`;
    rowIndex++;
  }

  const dimension = `A1:${colLetter(Math.max(headers.length - 1, 0))}${rowIndex - 1}`;
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<dimension ref="${dimension}"/>
<sheetViews><sheetView workbookViewId="0"><pane ySplit="1" topLeftCell="A2" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>
<sheetFormatPr defaultRowHeight="15"/>
<sheetData>${rowsXml}</sheetData>
<autoFilter ref="A1:${colLetter(Math.max(headers.length - 1, 0))}1"/>
</worksheet>`;
}

// Shared strings table
let sharedStringsList: string[] = [];
let sharedStringsMap: Map<string, number> = new Map();

function getSharedStringIndex(text: string): number {
  if (sharedStringsMap.has(text)) {
    return sharedStringsMap.get(text)!;
  }
  const index = sharedStringsList.length;
  sharedStringsList.push(text);
  sharedStringsMap.set(text, index);
  return index;
}

function buildSharedStrings(headers: string[], transactions: TransactionRow[]): string {
  // Reset and populate
  sharedStringsList = [];
  sharedStringsMap = new Map();

  headers.forEach((h) => getSharedStringIndex(h));
  transactions.forEach((txn) => {
    headers.forEach((h) => getSharedStringIndex(txn[h] ?? ""));
  });

  const count = sharedStringsList.length;
  const items = sharedStringsList.map((s) =>
    `<si><t xml:space="preserve">${escapeXml(s)}</t></si>`
  ).join("");

  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<sst xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" count="${count}" uniqueCount="${count}">${items}</sst>`;
}

function buildStylesXml(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
<fonts count="2">
<font><sz val="11"/><name val="Calibri"/></font>
<font><b/><sz val="11"/><color rgb="FFFFFFFF"/><name val="Calibri"/></font>
</fonts>
<fills count="3">
<fill><patternFill patternType="none"/></fill>
<fill><patternFill patternType="gray125"/></fill>
<fill><patternFill patternType="solid"><fgColor rgb="FF1E40AF"/><bgColor indexed="64"/></patternFill></fill>
</fills>
<borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
<cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
<cellXfs count="4">
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
<xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1" applyAlignment="1"><alignment horizontal="center" vertical="center" wrapText="1"/></xf>
<xf numFmtId="4" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"><alignment horizontal="right"/></xf>
<xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0" applyAlignment="1"><alignment vertical="center" wrapText="1"/></xf>
</cellXfs>
<cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles>
</styleSheet>`;
}

function buildContentTypes(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
<Default Extension="xml" ContentType="application/xml"/>
<Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/>
<Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>
<Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
<Override PartName="/xl/sharedStrings.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sharedStrings+xml"/>
<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>
<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>
</Types>`;
}

function buildRootRels(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>
</Relationships>`;
}

function buildWorkbook(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
<sheets><sheet name="Transactions" sheetId="1" r:id="rId1"/></sheets>
</workbook>`;
}

function buildWorkbookRels(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/>
<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>
<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/sharedStrings" Target="sharedStrings.xml"/>
</Relationships>`;
}

function buildSheetRels(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
</Relationships>`;
}

function buildCoreProps(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
<dc:creator>ApexDoc</dc:creator>
<cp:lastModifiedBy>ApexDoc</cp:lastModifiedBy>
<dcterms:created xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:created>
<dcterms:modified xsi:type="dcterms:W3CDTF">${new Date().toISOString()}</dcterms:modified>
</cp:coreProperties>`;
}

function buildAppProps(): string {
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">
<Application>ApexDoc</Application>
</Properties>`;
}

// ─────────────────────────────────────────────
// Minimal ZIP builder (stored, no compression)
// ─────────────────────────────────────────────

// CRC32 lookup table
const crcTable: number[] = (() => {
  const table: number[] = [];
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc = crcTable[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function strToUint8(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

function buildZip(files: Record<string, string | Uint8Array>): Uint8Array {
  const fileEntries: { name: string; data: Uint8Array; crc: number; offset: number }[] = [];
  const centralDir: Uint8Array[] = [];
  let offset = 0;

  const fileNames = Object.keys(files);

  for (const name of fileNames) {
    const content = files[name];
    const data = typeof content === "string" ? strToUint8(content) : content;
    const crc = crc32(data);

    fileEntries.push({ name, data, crc, offset });

    // Local file header
    const nameBytes = strToUint8(name);
    const localHeader = new Uint8Array(30 + nameBytes.length);
    const localView = new DataView(localHeader.buffer);

    localView.setUint32(0, 0x04034b50, true); // signature
    localView.setUint16(4, 20, true); // version needed
    localView.setUint16(6, 0, true); // flags
    localView.setUint16(8, 0, true); // compression (stored)
    localView.setUint16(10, 0, true); // mod time
    localView.setUint16(12, 0, true); // mod date
    localView.setUint32(14, crc, true); // crc32
    localView.setUint32(18, data.length, true); // compressed size
    localView.setUint32(22, data.length, true); // uncompressed size
    localView.setUint16(26, nameBytes.length, true); // filename length
    localView.setUint16(28, 0, true); // extra field length
    localHeader.set(nameBytes, 30);

    centralDir.push(localHeader);
    centralDir.push(data);

    offset += localHeader.length + data.length;
  }

  // Build central directory records
  let cdOffset = 0;
  const cdEntries: Uint8Array[] = [];
  let cdStartOffset = offset;

  for (const entry of fileEntries) {
    const nameBytes = strToUint8(entry.name);
    const cdHeader = new Uint8Array(46 + nameBytes.length);
    const cdView = new DataView(cdHeader.buffer);

    cdView.setUint32(0, 0x02014b50, true); // central dir signature
    cdView.setUint16(4, 20, true); // version made by
    cdView.setUint16(6, 20, true); // version needed
    cdView.setUint16(8, 0, true); // flags
    cdView.setUint16(10, 0, true); // compression
    cdView.setUint16(12, 0, true); // mod time
    cdView.setUint16(14, 0, true); // mod date
    cdView.setUint32(16, entry.crc, true);
    cdView.setUint32(20, entry.data.length, true); // compressed
    cdView.setUint32(24, entry.data.length, true); // uncompressed
    cdView.setUint16(28, nameBytes.length, true);
    cdView.setUint16(30, 0, true); // extra
    cdView.setUint16(32, 0, true); // comment
    cdView.setUint16(34, 0, true); // disk number
    cdView.setUint16(36, 0, true); // internal attrs
    cdView.setUint32(38, 0, true); // external attrs
    cdView.setUint32(42, entry.offset, true); // local header offset
    cdHeader.set(nameBytes, 46);

    cdEntries.push(cdHeader);
    cdOffset += cdHeader.length;
  }

  // End of central directory
  const eocd = new Uint8Array(22);
  const eocdView = new DataView(eocd.buffer);
  eocdView.setUint32(0, 0x06054b50, true);
  eocdView.setUint16(4, 0, true); // disk number
  eocdView.setUint16(6, 0, true); // disk with cd
  eocdView.setUint16(8, fileNames.length, true); // entries on disk
  eocdView.setUint16(10, fileNames.length, true); // total entries
  eocdView.setUint32(12, cdOffset, true); // cd size
  eocdView.setUint32(16, cdStartOffset, true); // cd offset
  eocdView.setUint16(20, 0, true); // comment length

  // Combine everything
  const allParts = [...centralDir, ...cdEntries, eocd];
  const totalLength = allParts.reduce((sum, p) => sum + p.length, 0);
  const result = new Uint8Array(totalLength);
  let pos = 0;
  for (const part of allParts) {
    result.set(part, pos);
    pos += part.length;
  }

  return result;
}

// ─────────────────────────────────────────────
// Main conversion pipeline
// ─────────────────────────────────────────────

function decodePdfLiteral(value: string): string {
  return value
    .replace(/\\([\\()])/g, "$1")
    .replace(/\\n/g, "\n")
    .replace(/\\r/g, "\r")
    .replace(/\\t/g, "\t")
    .replace(/\\[0-7]{1,3}/g, (octal) => String.fromCharCode(parseInt(octal.slice(1), 8)));
}

function extractNativePdfText(fileBuffer: ArrayBuffer): string {
  const bytes = new Uint8Array(fileBuffer);
  const binary = new TextDecoder("latin1").decode(bytes);
  const text: string[] = [];

  // Extract visible PDF string operands. This intentionally avoids executing
  // PDF content and keeps the fallback dependency-free inside the Edge Function.
  for (const match of binary.matchAll(/\((?:\\.|[^\\)])*\)/g)) {
    const value = decodePdfLiteral(match[0].slice(1, -1)).replace(/\s+/g, " ").trim();
    if (value) text.push(value);
  }

  // Some producers use hexadecimal text operands instead of literal strings.
  for (const match of binary.matchAll(/<([0-9A-Fa-f]{4,})>/g)) {
    const hex = match[1];
    let value = "";
    for (let i = 0; i + 1 < hex.length; i += 2) value += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16));
    if (value.trim()) text.push(value.replace(/\s+/g, " ").trim());
  }

  return text.join("\n");
}

function parseNativeStatement(fileBuffer: ArrayBuffer): { headers: string[]; transactions: TransactionRow[] } | null {
  const text = extractNativePdfText(fileBuffer);
  if (!text) return null;

  const headers = ["Date", "Description", "Debit", "Credit"];
  const transactions: TransactionRow[] = [];
  const datePattern = /^(\d{1,4}[\/\-.]\d{1,2}[\/\-.]\d{1,4}|\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{2,4})\b/i;
  const amountPattern = /(?:[$£€]|AED|USD|GBP|\(?-?)[0-9][0-9,]*(?:\.[0-9]{2})?\)?(?:\s*(?:DR|CR))?/gi;

  for (const rawLine of text.split(/\r?\n/)) {
    const line = rawLine.replace(/\s+/g, " ").trim();
    const date = line.match(datePattern)?.[1];
    if (!date) continue;

    const remainder = line.slice((line.indexOf(date) + date.length)).trim();
    const amounts = [...remainder.matchAll(amountPattern)];
    if (amounts.length === 0) continue;

    const firstAmountIndex = amounts[0].index ?? remainder.length;
    const description = remainder.slice(0, firstAmountIndex).replace(/[|\\t]+/g, " ").trim();
    const values = amounts.map((match) => match[0].replace(/[,$£€]|USD|GBP|AED/gi, "").trim());
    const debit = values.length > 1 ? values[0] : /\\bDR\\b|-/i.test(values[0]) ? values[0].replace(/[()]/g, "") : "";
    const credit = values.length > 1 ? values[1] : /\\bCR\\b/i.test(amounts[0][0]) ? values[0].replace(/[()]/g, "") : debit ? "" : values[0];
    transactions.push({ Date: date, Description: description || "Transaction", Debit: debit, Credit: credit });
  }

  return transactions.length ? { headers, transactions } : null;
}

async function processSinglePdf(
  fileBuffer: ArrayBuffer,
  fileName: string,
  bankSlug?: string,
): Promise<{ headers: string[]; transactions: TransactionRow[] } | null> {
  // PDF.co is an optional fast path. A short deadline prevents a missing key,
  // exhausted credits, or a network stall from delaying the native fallback.
  if (!PDFCO_API_KEY) return parseNativeStatement(fileBuffer);

  try {
    const fileUrl = await uploadToPdfCo(fileBuffer, fileName);
  debugLog("Uploaded file URL", fileUrl);

  // Step 2: Extract the PDF's native text/table content only.
  let rows: string[][] = [];
  let extractionMethod = "";

  const attempts: { name: string; fn: () => Promise<string[][]> }[] = [
    { name: "CSV", fn: () => extractTablesFromPdf(fileUrl) },
    { name: "JSON2", fn: () => extractJsonFromPdf(fileUrl) },
  ];

  for (const attempt of attempts) {
    try {
      debugLog(`Trying extraction method: ${attempt.name}`, "");
      rows = await attempt.fn();
      if (rows && rows.length > 0) {
        extractionMethod = attempt.name;
        debugLog(`Extraction succeeded with ${attempt.name}`, rows);
        break;
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      debugLog(`Extraction method ${attempt.name} failed`, msg);
    }
  }

  if (!rows || rows.length === 0) {
    debugLog("All extraction methods returned empty", "");
    return parseNativeStatement(fileBuffer);
  }

  debugLog(`Using ${extractionMethod}, total rows extracted`, rows);

  // Normalize to string[][]
  const stringRows: string[][] = rows.map((r) =>
    (Array.isArray(r) ? r : [r]).map((c) => String(c ?? "").trim())
  );

  // Step 3: Detect header row
  const { headerRow, headerIndex } = findHeaderRow(stringRows);
  debugLog("Detected header row", headerRow);
  debugLog("Header row index", headerIndex);

  if (!headerRow || headerRow.length === 0) {
    debugLog("No header row detected, returning null", "");
    return null;
  }

  // Step 4: Extract transaction rows
  let transactions = extractTransactions(stringRows, headerRow, headerIndex);
  debugLog("Extracted transactions count", String(transactions.length));

  if (transactions.length === 0) {
    // Fallback: try with inferred headers from data patterns
    debugLog("No transactions with detected headers, trying inferred headers", "");
    const inferred = inferHeaders(stringRows);
    debugLog("Inferred headers", inferred);
    transactions = extractTransactions(stringRows, inferred, -1);
    if (transactions.length > 0) {
      return { headers: inferred, transactions };
    }

    // Last resort: treat ALL non-empty rows as data, use first row as header if it looks like one
    debugLog("Trying last-resort: treat all non-empty rows as data", "");
    const nonEmptyRows = stringRows.filter((r) => r.some((c) => c.trim() !== ""));
    if (nonEmptyRows.length >= 2) {
      // Check if first row looks like a header
      if (looksLikeHeaderRow(nonEmptyRows[0])) {
        const fallbackHeaders = cleanHeaderRow(nonEmptyRows[0]);
        const fallbackTxns = nonEmptyRows.slice(1).map((row) => {
          const txn: TransactionRow = {};
          fallbackHeaders.forEach((h, i) => { txn[h] = (row[i] ?? "").trim(); });
          return txn;
        }).filter((txn) => Object.values(txn).some((v) => v !== ""));
        if (fallbackTxns.length > 0) {
          debugLog("Last-resort extraction succeeded", String(fallbackTxns.length));
          return { headers: fallbackHeaders, transactions: fallbackTxns };
        }
      } else {
        // No header found — use generic column names
        const maxLen = Math.max(...nonEmptyRows.map((r) => r.length));
        const genericHeaders = Array.from({ length: maxLen }, (_, i) => `Column ${i + 1}`);
        const fallbackTxns = nonEmptyRows.map((row) => {
          const txn: TransactionRow = {};
          genericHeaders.forEach((h, i) => { txn[h] = (row[i] ?? "").trim(); });
          return txn;
        }).filter((txn) => Object.values(txn).some((v) => v !== ""));
        if (fallbackTxns.length > 0) {
          debugLog("Generic headers extraction succeeded", String(fallbackTxns.length));
          return { headers: genericHeaders, transactions: fallbackTxns };
        }
      }
    }

    debugLog("All extraction attempts failed, returning null", "");
    return null;
  }

  return { headers: headerRow, transactions };
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.warn(`[ApexDoc] PDF.co unavailable; using native parser (${reason})`);
    return parseNativeStatement(fileBuffer);
  }
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    // PDF.co is optional; processSinglePdf automatically uses the native
    // parser when the key is absent or the remote service is unavailable.
    // Parse multipart form data
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const bankSlug = formData.get("bankSlug")?.toString() || undefined;

    if (!files || files.length === 0) {
      return jsonResponse({ error: "No files provided" }, 400);
    }

    if (files.length > 2) {
      return jsonResponse({ error: "Maximum 2 PDF files allowed per conversion" }, 400);
    }

    // Server-side usage gate — this is the real check. Runs before any
    // PDF.co call so a blocked request doesn't burn API credits either.
    const deviceId = formData.get("deviceId")?.toString();
    if (!deviceId) {
      return jsonResponse({
        error: "Missing device identifier.",
        code: "MISSING_DEVICE_ID",
      }, 400);
    }

    const usage = await checkUsageLimit(deviceId);
    if (!usage.allowed) {
      return jsonResponse({
        error: "Free monthly conversions used up for this device. Upgrade to Pro for unlimited conversions.",
        code: "LIMIT_REACHED",
      }, 429);
    }

    const allHeaders: string[] = [];
    const allTransactions: TransactionRow[] = [];

    for (const file of files) {
      // Validate file type
      if (!file.name.toLowerCase().endsWith(".pdf") && file.type !== "application/pdf") {
        return jsonResponse({
          error: `File "${file.name}" is not a PDF. Only PDF files are accepted.`,
        }, 400);
      }

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        return jsonResponse({
          error: `File "${file.name}" exceeds the maximum size of 10MB.`,
        }, 400);
      }

      if (file.size === 0) {
        return jsonResponse({
          error: `File "${file.name}" is empty.`,
        }, 400);
      }

      const fileBuffer = await file.arrayBuffer();

      const result = await processSinglePdf(fileBuffer, file.name, bankSlug);

      if (result) {
        // Merge headers if they're the same structure, otherwise combine
        if (allHeaders.length === 0) {
          allHeaders.push(...result.headers);
        } else {
          // Add any new columns that weren't in the first file's headers
          for (const h of result.headers) {
            if (!allHeaders.includes(h)) {
              allHeaders.push(h);
            }
          }
        }

        // Merge transactions, filling missing columns with empty strings
        for (const txn of result.transactions) {
          const merged: TransactionRow = {};
          for (const h of allHeaders) {
            merged[h] = txn[h] ?? "";
          }
          allTransactions.push(merged);
        }
      }
    }

    if (allTransactions.length === 0) {
      return jsonResponse({
        error: "No transaction data could be extracted from the provided PDF(s). The file may not contain recognizable transaction tables, or the PDF might be corrupted or password-protected.",
        details: "Only native PDF text/table extraction is supported; the PDF contained no supported transaction lines.",
      }, 422);
    }

    // Generate XLSX
    const xlsxData = buildXlsx(allHeaders, allTransactions);

    // Only count it against the free quota once we know it succeeded.
    if (!usage.isPro) await recordConversion(deviceId);

    // Convert to base64 for JSON response
    const base64 = bufferToBase64(xlsxData.buffer);

    return jsonResponse({
      success: true,
      filename: "apexdoc_converted.xlsx",
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      data: base64,
      rowCount: allTransactions.length,
      columns: allHeaders,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "An unexpected error occurred during conversion.";
    console.error("[ApexDoc] Conversion pipeline error:", message);
    return jsonResponse({ error: message }, 500);
  }
});
