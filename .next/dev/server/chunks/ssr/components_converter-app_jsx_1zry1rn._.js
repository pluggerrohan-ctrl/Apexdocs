module.exports = [
"[project]/components/converter-app.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConverterApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/file-up.mjs [app-ssr] (ecmascript) <export default as FileUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shield-check.mjs [app-ssr] (ecmascript) <export default as ShieldCheck>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.mjs [app-ssr] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/loader-circle.mjs [app-ssr] (ecmascript) <export default as LoaderCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.mjs [app-ssr] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/rotate-ccw.mjs [app-ssr] (ecmascript) <export default as RotateCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.mjs [app-ssr] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.mjs [app-ssr] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/xlsx/xlsx.mjs [app-ssr] (ecmascript)");
'use client';
;
;
;
;
const CREDIT_KEY = 'apexdoc_credits_v2';
const FREE_CREDIT_LIMIT = 3;
function parseRows(raw) {
    const rows = [];
    const dateAtStart = /^(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})(?:\s+|(?=[A-Za-z]))/i;
    const columnPattern = /(?:—|–|(?<![A-Za-z])[-+]?\(?\s*(?:[$€£₹]\s*)?\d[\d,]*(?:\.\d{2})?\)?)/g;
    const lines = raw.replace(/\r/g, '').split(/\n+/).map((line)=>line.replace(/\s+/g, ' ').trim()).filter(Boolean);
    let previousBalance = null;
    for (const line of lines){
        const dateMatch = line.match(dateAtStart);
        if (!dateMatch) continue;
        const date = dateMatch[1];
        const body = line.slice(dateMatch[0].length).replace(/^[-|:]\s*/, '').trim();
        const columns = [
            ...body.matchAll(columnPattern)
        ];
        if (columns.length < 2) continue;
        // Statements commonly expose either amount + balance, or debit + credit + balance.
        const transactionColumns = columns.slice(-3);
        const firstColumnIndex = transactionColumns[0].index ?? 0;
        const leftSide = body.slice(0, firstColumnIndex).trim();
        const description = leftSide.replace(/\s+(?:[A-Z]{2,}[A-Z0-9-]*|[A-Z0-9]{4,})$/, '').trim();
        const value = (text)=>{
            if (!text || /^[—–-]$/.test(text.trim())) return '';
            const number = Number(text.replace(/[^\d.-]/g, ''));
            return Number.isFinite(number) ? Math.abs(number) : '';
        };
        const balance = value(transactionColumns.at(-1)?.[0]);
        const amount = value(transactionColumns.at(-2)?.[0]);
        const debit = transactionColumns.length >= 3 ? value(transactionColumns[0][0]) : previousBalance !== null && balance < previousBalance ? amount : '';
        const credit = transactionColumns.length >= 3 ? value(transactionColumns[1][0]) : previousBalance !== null && balance > previousBalance ? amount : '';
        rows.push({
            Date: date,
            Description: description || 'Bank transaction',
            Debit: debit,
            Credit: credit,
            Balance: balance
        });
        previousBalance = balance;
    }
    if (rows.length) return rows;
    // Some statements expose each table column as its own text layer. In that case,
    // reconstruct date-delimited records and infer debit/credit from balance movement.
    const datePattern = /\b(?:\d{4}[\/-]\d{1,2}[\/-]\d{1,2}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4})\b/g;
    const matches = [
        ...raw.matchAll(datePattern)
    ];
    const numberPattern = /(?:[$€£₹]\s*)?\(?\d[\d,]*(?:\.\d{2})?\)?/g;
    for(let index = 0; index < matches.length; index += 1){
        const start = matches[index].index ?? 0;
        const end = matches[index + 1]?.index ?? raw.length;
        const date = matches[index][0];
        const block = raw.slice(start + date.length, end).replace(/\s+/g, ' ').trim();
        const numbers = [
            ...block.matchAll(numberPattern)
        ];
        if (!numbers.length) continue;
        const values = numbers.map((match)=>Number(match[0].replace(/[^\d.]/g, ''))).filter(Number.isFinite);
        const balance = values.at(-1);
        if (!Number.isFinite(balance)) continue;
        const amount = values.length > 1 ? values.at(-2) : previousBalance === null ? '' : Math.abs(balance - previousBalance);
        const descriptionEnd = numbers[0].index ?? block.length;
        const description = block.slice(0, descriptionEnd).replace(/\s+/g, ' ').trim();
        const delta = previousBalance === null ? 0 : balance - previousBalance;
        rows.push({
            Date: date,
            Description: description || 'Bank transaction',
            Debit: delta < 0 ? amount : '',
            Credit: delta > 0 ? amount : '',
            Balance: balance
        });
        previousBalance = balance;
    }
    if (rows.length) return rows;
    // Final fallback for PDFs whose text layer places every cell on its own line.
    const statementLines = raw.split(/\r?\n/).map((line)=>line.trim()).filter(Boolean);
    let current = null;
    let pendingText = [];
    let pendingNumbers = [];
    const flush = ()=>{
        if (!current || !pendingNumbers.length) return;
        const balance = pendingNumbers.at(-1);
        const amount = pendingNumbers.length > 1 ? pendingNumbers.at(-2) : '';
        const delta = rows.length ? balance - rows.at(-1).Balance : 0;
        rows.push({
            Date: current,
            Description: pendingText.filter((text)=>!/^[A-Z0-9-]{4,}$/.test(text)).join(' ') || 'Bank transaction',
            Debit: delta < 0 ? amount : '',
            Credit: delta > 0 ? amount : '',
            Balance: balance
        });
        pendingText = [];
        pendingNumbers = [];
    };
    for (const line of statementLines){
        const date = line.match(/^(\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})$/);
        if (date) {
            flush();
            current = date[1];
            continue;
        }
        const number = line.match(/^(?:[$€£₹]\s*)?\(?\d[\d,]*(?:\.\d{2})?\)?$/);
        if (number) pendingNumbers.push(Number(line.replace(/[^\d.]/g, '')));
        else if (current && !/^(Date|Description|Reference|Debit|Credit|Balance|Currency)$/i.test(line)) pendingText.push(line);
    }
    flush();
    if (rows.length) return rows;
    // Normalized text fallback: PDF.js may insert newlines between every cell.
    const normalized = raw.replace(/[|\u00a0]+/g, ' ').replace(/\s+/g, ' ').trim();
    const recordPattern = /(?:^|\s)(\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})(.*?)(?=\s+(?:\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}|\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}[\/-]\d{1,2}[\/-]\d{1,2})|$)/g;
    let priorBalance = null;
    for (const match of normalized.matchAll(recordPattern)){
        const date = match[1];
        const body = match[2].trim();
        const numbers = [
            ...body.matchAll(/(?:[$€£₹]\s*)?\(?\d[\d,]*(?:\.\d{2})?\)?/g)
        ];
        if (numbers.length < 2) continue;
        const values = numbers.map((item)=>Number(item[0].replace(/[^\d.]/g, ''))).filter(Number.isFinite);
        const balance = values.at(-1);
        const amount = values.at(-2);
        if (!Number.isFinite(balance)) continue;
        const firstNumber = numbers[0].index ?? body.length;
        const description = body.slice(0, firstNumber).replace(/\s+(?:REF|PAY|ELEC|CARD|INV|TRF|FEE|INS|INT)[-\w]+$/i, '').trim();
        const delta = priorBalance === null ? 0 : balance - priorBalance;
        rows.push({
            Date: date,
            Description: description || 'Bank transaction',
            Debit: delta < 0 ? amount : '',
            Credit: delta > 0 ? amount : '',
            Balance: balance
        });
        priorBalance = balance;
    }
    return rows;
}
function hasUsableRows(rows) {
    if (!Array.isArray(rows) || rows.length === 0) return false;
    const validDates = rows.filter((row)=>/\d{1,4}[\/-]\d{1,2}[\/-]\d{1,4}|\d{1,2}\s+[A-Za-z]{3,9}\s+\d{2,4}/.test(String(row.Date))).length;
    const numericBalances = rows.filter((row)=>row.Balance !== '' && Number.isFinite(Number(row.Balance))).length;
    const meaningfulDescriptions = rows.filter((row)=>String(row.Description || '').trim().length >= 3).length;
    return validDates >= Math.max(1, Math.ceil(rows.length * 0.7)) && meaningfulDescriptions >= Math.max(1, Math.ceil(rows.length * 0.7)) && (numericBalances >= 1 || rows.some((row)=>row.Debit !== '' || row.Credit !== ''));
}
async function extractPdf(file, onProgress) {
    try {
        const pdfjs = await __turbopack_context__.A("[project]/node_modules/pdfjs-dist/legacy/build/pdf.mjs [app-ssr] (ecmascript, async loader)");
        const buffer = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument({
            data: new Uint8Array(buffer),
            useSystemFonts: false,
            useWorkerFetch: false,
            isEvalSupported: false,
            disableWorker: true,
            disableFontFace: true
        }).promise;
        let raw = '';
        let hasText = false;
        for(let index = 1; index <= pdf.numPages; index += 1){
            const page = await pdf.getPage(index);
            const content = await page.getTextContent();
            const items = content.items.filter((item)=>'str' in item && item.str.trim());
            const lines = [];
            for (const item of items){
                const y = Math.round(item.transform[5]);
                const line = lines.find((entry)=>Math.abs(entry.y - y) <= 2);
                if (line) line.parts.push(item.str);
                else lines.push({
                    y,
                    parts: [
                        item.str
                    ]
                });
            }
            const pageText = lines.sort((a, b)=>b.y - a.y).map((line)=>line.parts.join(' ')).join('\n');
            if (pageText.trim()) hasText = true;
            raw += `${pageText}\n`;
        }
        if (hasText && hasUsableRows(parseRows(raw))) return raw;
        // A PDF can contain decorative text without usable transaction rows. Run local OCR
        // instead of stopping early so scanned and flattened bank statements still convert.
        raw = hasText ? '' : raw;
        onProgress?.('Scanning pages locally…');
        const { createWorker } = await __turbopack_context__.A("[project]/node_modules/tesseract.js/src/index.js [app-ssr] (ecmascript, async loader)");
        const worker = await createWorker('eng');
        try {
            for(let index = 1; index <= pdf.numPages; index += 1){
                const page = await pdf.getPage(index);
                const viewport = page.getViewport({
                    scale: 2
                });
                const canvas = document.createElement('canvas');
                canvas.width = viewport.width;
                canvas.height = viewport.height;
                await page.render({
                    canvasContext: canvas.getContext('2d'),
                    viewport
                }).promise;
                const result = await worker.recognize(canvas);
                raw += `${result.data.text}\n`;
                onProgress?.(`Scanning page ${index} of ${pdf.numPages}…`);
            }
        } finally{
            await worker.terminate();
        }
        return raw;
    } catch  {
        return await file.text().catch(()=>'');
    }
}
function ConverterApp({ bank }) {
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [credits, setCredits] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [fileName, setFileName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [licenseKey, setLicenseKey] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    const [menuOpen, setMenuOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [showExhausted, setShowExhausted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isConverting, setIsConverting] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [quotaLocked, setQuotaLocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const convertingRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        let active = true;
        const sync = ()=>setCredits(Number(window.localStorage.getItem(CREDIT_KEY) || 0));
        const initializeQuota = async ()=>{
            const stored = window.localStorage.getItem(CREDIT_KEY);
            if (stored === null) window.localStorage.setItem(CREDIT_KEY, String(FREE_CREDIT_LIMIT));
            sync();
            try {
                const response = await fetch('/api/credits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'quota'
                    })
                });
                const result = await response.json();
                if (!active || !response.ok || !result.ok) return;
                const remaining = Math.max(0, Number(result.remaining));
                window.localStorage.setItem(CREDIT_KEY, String(remaining));
                setCredits(remaining);
                if (remaining === 0) setQuotaLocked(true);
            } catch  {
            // Preserve the local free-tier experience when the optional quota worker is unavailable.
            }
        };
        initializeQuota();
        window.addEventListener('storage', sync);
        return ()=>{
            active = false;
            window.removeEventListener('storage', sync);
        };
    }, []);
    const saveCredits = (value)=>{
        const next = Math.max(0, value);
        window.localStorage.setItem(CREDIT_KEY, String(next));
        setCredits(next);
    };
    const convert = async (file)=>{
        const isPdf = file && (file.type === 'application/pdf' || file.name?.toLowerCase().endsWith('.pdf'));
        if (!isPdf) return setStatus('Please choose a PDF statement.');
        if (convertingRef.current) return;
        if (quotaLocked || credits < 1) return setShowExhausted(true);
        convertingRef.current = true;
        setIsConverting(true);
        setFileName(file.name);
        setStatus('Extracting text locally…');
        try {
            const localExtraction = extractPdf(file, setStatus);
            let extractedText = '';
            try {
                extractedText = await Promise.race([
                    localExtraction,
                    new Promise((resolve)=>setTimeout(()=>resolve(''), 8000))
                ]);
            } catch  {
                extractedText = '';
            }
            let rows = parseRows(extractedText);
            if (!hasUsableRows(rows)) {
                rows = [];
                setStatus('Local conversion needs help. Trying secure PDF backup…');
                const form = new FormData();
                form.append('file', file);
                const fallbackResponse = await fetch('/api/pdfco', {
                    method: 'POST',
                    body: form
                });
                const fallbackResult = await fallbackResponse.json().catch(()=>null);
                if (fallbackResponse.ok && fallbackResult?.ok && hasUsableRows(fallbackResult.rows)) rows = fallbackResult.rows;
            }
            if (!hasUsableRows(rows)) {
                setStatus('No readable transactions found. Your credit was not used.');
                return;
            }
            let serverRemaining = null;
            try {
                const quotaResponse = await fetch('/api/credits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: 'consume'
                    })
                });
                const quotaResult = quotaResponse.ok ? await quotaResponse.json().catch(()=>null) : null;
                if (quotaResponse.status === 429 || quotaResponse.ok && quotaResult?.ok && quotaResult.allowed === false) {
                    saveCredits(0);
                    setQuotaLocked(true);
                    setShowExhausted(true);
                    return;
                }
                if (quotaResponse.ok && quotaResult.ok) serverRemaining = Number(quotaResult.remaining);
            } catch  {
            // Use local credits only if the optional worker is unavailable.
            }
            const sheet = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["utils"].json_to_sheet(rows, {
                header: [
                    'Date',
                    'Description',
                    'Debit',
                    'Credit',
                    'Balance'
                ]
            });
            sheet['!cols'] = [
                {
                    wch: 14
                },
                {
                    wch: 42
                },
                {
                    wch: 14
                },
                {
                    wch: 14
                },
                {
                    wch: 16
                }
            ];
            const workbook = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["utils"].book_new();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["utils"].book_append_sheet(workbook, sheet, 'Transactions');
            const workbookBuffer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$xlsx$2f$xlsx$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["write"](workbook, {
                bookType: 'xlsx',
                type: 'array'
            });
            const downloadUrl = URL.createObjectURL(new Blob([
                workbookBuffer
            ], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }));
            const downloadLink = document.createElement('a');
            downloadLink.href = downloadUrl;
            downloadLink.download = `${bank.slug}-statement.xlsx`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            downloadLink.remove();
            setTimeout(()=>URL.revokeObjectURL(downloadUrl), 1000);
            saveCredits(serverRemaining === null ? Math.max(0, Number(window.localStorage.getItem(CREDIT_KEY) || 0) - 1) : serverRemaining);
            setStatus(`Done — ${rows.length} transaction rows exported.`);
        } catch  {
            setStatus('Conversion service was unreachable. Please retry; your credit was not used.');
        } finally{
            convertingRef.current = false;
            setIsConverting(false);
        }
    };
    const restore = async ()=>{
        if (!licenseKey.trim()) return setStatus('Enter your License Key to restore credits.');
        setStatus('Checking your license securely…');
        try {
            const response = await fetch('/api/credits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    action: 'restore',
                    licenseKey: licenseKey.trim()
                })
            });
            const result = await response.json();
            if (!response.ok || !result.ok) return setStatus(result.error || 'License recovery is unavailable.');
            saveCredits(Number(result.credits) || 0);
            setStatus('Balance restored successfully.');
        } catch  {
            setStatus('License recovery is unavailable right now.');
        }
    };
    const jumpTo = (id)=>{
        setMenuOpen(false);
        document.getElementById(id)?.scrollIntoView({
            behavior: 'smooth'
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "site-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "topbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "brand",
                        href: "#converter",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-mark",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {
                                    size: 19
                                }, void 0, false, {
                                    fileName: "[project]/components/converter-app.jsx",
                                    lineNumber: 314,
                                    columnNumber: 75
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 314,
                                columnNumber: 46
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "ApexDoc"
                            }, void 0, false, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 314,
                                columnNumber: 104
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 314,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "header-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                className: "credit-badge",
                                "aria-label": `Remaining balance: ${credits} free Excel sheets`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "credit-badge-full",
                                        children: [
                                            "Credit: ",
                                            credits
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 315,
                                        columnNumber: 135
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "credit-badge-short",
                                        children: [
                                            "Credit: ",
                                            credits
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 315,
                                        columnNumber: 195
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 315,
                                columnNumber: 39
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "menu-wrap",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "menu-button",
                                        "aria-label": "Open navigation menu",
                                        "aria-expanded": menuOpen,
                                        onClick: ()=>setMenuOpen(!menuOpen),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {
                                            size: 21
                                        }, void 0, false, {
                                            fileName: "[project]/components/converter-app.jsx",
                                            lineNumber: 315,
                                            columnNumber: 422
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 315,
                                        columnNumber: 292
                                    }, this),
                                    menuOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "menu-panel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>jumpTo('converter'),
                                                children: "Home"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 315,
                                                columnNumber: 498
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>jumpTo('pricing'),
                                                children: "Pricing"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 315,
                                                columnNumber: 555
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>jumpTo('faq'),
                                                children: "FAQ"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 315,
                                                columnNumber: 613
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>jumpTo('support'),
                                                children: "Support"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 315,
                                                columnNumber: 663
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "restore-menu",
                                                onClick: ()=>jumpTo('recovery'),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                        size: 14
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/converter-app.jsx",
                                                        lineNumber: 315,
                                                        columnNumber: 789
                                                    }, this),
                                                    " Restore Balance"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 315,
                                                columnNumber: 721
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 315,
                                        columnNumber: 470
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 315,
                                columnNumber: 265
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 315,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/converter-app.jsx",
                lineNumber: 313,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "trust-banner",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shield$2d$check$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShieldCheck$3e$__["ShieldCheck"], {
                                size: 16
                            }, void 0, false, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 318,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "Private by default."
                                    }, void 0, false, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 318,
                                        columnNumber: 68
                                    }, this),
                                    " Files are processed in your browser and never stored."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 318,
                                columnNumber: 62
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 318,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "converter",
                        className: "hero content-width",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "hero-copy",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "eyebrow",
                                        children: [
                                            bank.country.toUpperCase(),
                                            " · ",
                                            bank.name.toUpperCase()
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 319,
                                        columnNumber: 89
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        children: bank.slug === 'bank' ? 'Bank statement to Excel converter' : `${bank.name} statement to Excel converter`
                                    }, void 0, false, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 319,
                                        columnNumber: 172
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "hero-description",
                                        children: "Convert PDF statements into a clean, audit-ready spreadsheet privately in your browser. Supports 1000+ formats with no paid APIs and no document uploads."
                                    }, void 0, false, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 319,
                                        columnNumber: 287
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "feature-list",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: "Local parsing"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/converter-app.jsx",
                                                        lineNumber: 319,
                                                        columnNumber: 512
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "Zero API cost"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/converter-app.jsx",
                                                        lineNumber: 319,
                                                        columnNumber: 532
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 319,
                                                columnNumber: 506
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: "One clean sheet"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/converter-app.jsx",
                                                        lineNumber: 319,
                                                        columnNumber: 573
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "Date, Description, Debit, Credit, Balance"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/converter-app.jsx",
                                                        lineNumber: 319,
                                                        columnNumber: 595
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 319,
                                                columnNumber: 567
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: "Instant export"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/converter-app.jsx",
                                                        lineNumber: 319,
                                                        columnNumber: 664
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                        children: "Excel-ready XLSX"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/converter-app.jsx",
                                                        lineNumber: 319,
                                                        columnNumber: 685
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 319,
                                                columnNumber: 658
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 319,
                                        columnNumber: 476
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 319,
                                columnNumber: 62
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "upload-card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        ref: inputRef,
                                        className: "sr-only",
                                        type: "file",
                                        accept: "application/pdf",
                                        disabled: isConverting || quotaLocked || credits < 1,
                                        onChange: (event)=>convert(event.target.files?.[0])
                                    }, void 0, false, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 319,
                                        columnNumber: 766
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "upload-panel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "upload-icon",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$up$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__FileUp$3e$__["FileUp"], {
                                                    size: 27
                                                }, void 0, false, {
                                                    fileName: "[project]/components/converter-app.jsx",
                                                    lineNumber: 319,
                                                    columnNumber: 1015
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 319,
                                                columnNumber: 986
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: [
                                                    "Drop your ",
                                                    bank.slug === 'bank' ? 'PDF' : bank.name,
                                                    " statement"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 319,
                                                columnNumber: 1041
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "PDF only · processed locally · never stored"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 319,
                                                columnNumber: 1112
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "upload-button",
                                                children: [
                                                    status.includes('Extracting') ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__LoaderCircle$3e$__["LoaderCircle"], {
                                                        className: "spin",
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/converter-app.jsx",
                                                        lineNumber: 319,
                                                        columnNumber: 1227
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {
                                                        size: 16
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/converter-app.jsx",
                                                        lineNumber: 319,
                                                        columnNumber: 1273
                                                    }, this),
                                                    " Choose PDF"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 319,
                                                columnNumber: 1162
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: isConverting ? status : status || fileName || '3 free Excel sheets included'
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 319,
                                                columnNumber: 1314
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 319,
                                        columnNumber: 956
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 319,
                                columnNumber: 735
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 319,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "pricing",
                        className: "section content-width",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: "PRICING"
                            }, void 0, false, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 320,
                                columnNumber: 63
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Simple credits. Private conversions."
                            }, void 0, false, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 320,
                                columnNumber: 97
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "pricing-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "plan",
                                                children: "STARTER"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 181
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "$10"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 212
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Convert 50 PDF Bank Statements to Excel. Perfect for small business billing."
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 232
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "🔒 100% Risk-Free Money-Back Guarantee: If you experience any parsing glitches, email us for an instant full refund."
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 315
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                className: "payment-button",
                                                href: "https://checkout.dodopayments.com/buy/pdt_0NnVgAgVoDrlsxkmpv1JC?quantity=1",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                children: "Buy 50 credits"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 438
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 320,
                                        columnNumber: 172
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        className: "featured",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "plan",
                                                children: "PRO"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 641
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: "$39"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 668
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Convert 250 PDF Bank Statements to Excel. Best value for professional CPAs and accounting firms."
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 688
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                className: "payment-button",
                                                href: "https://checkout.dodopayments.com/buy/pdt_0NnVoDX9vsN8YPPyBqB4R?quantity=1",
                                                target: "_blank",
                                                rel: "noreferrer",
                                                children: "Buy 250 credits"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 791
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 320,
                                        columnNumber: 611
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 320,
                                columnNumber: 142
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                id: "recovery",
                                className: "recovery",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        children: "Recover your credits"
                                    }, void 0, false, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 320,
                                        columnNumber: 1011
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Bought credits before? Enter your unique License Key to sync your remaining balance on this browser session."
                                    }, void 0, false, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 320,
                                        columnNumber: 1040
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "recovery-row",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                "aria-label": "License Key",
                                                placeholder: "License Key",
                                                value: licenseKey,
                                                onChange: (event)=>setLicenseKey(event.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 1185
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: restore,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$rotate$2d$ccw$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__RotateCcw$3e$__["RotateCcw"], {
                                                        size: 15
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/converter-app.jsx",
                                                        lineNumber: 320,
                                                        columnNumber: 1346
                                                    }, this),
                                                    " Restore Balance"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 320,
                                                columnNumber: 1320
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 320,
                                        columnNumber: 1155
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 320,
                                columnNumber: 971
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 320,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        id: "faq",
                        className: "section content-width",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "eyebrow",
                                children: "FAQ"
                            }, void 0, false, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 321,
                                columnNumber: 59
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Private by default."
                            }, void 0, false, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 321,
                                columnNumber: 89
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "faq-grid",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "Does my PDF leave my device?"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 321,
                                                columnNumber: 152
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "No. Text extraction and XLSX generation happen inside this browser."
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 321,
                                                columnNumber: 189
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 321,
                                        columnNumber: 143
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "What if my PDF is scanned?"
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 321,
                                                columnNumber: 282
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Text PDFs work best. Scanned PDFs may need OCR, so always compare the downloaded spreadsheet with your original statement."
                                            }, void 0, false, {
                                                fileName: "[project]/components/converter-app.jsx",
                                                lineNumber: 321,
                                                columnNumber: 317
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/converter-app.jsx",
                                        lineNumber: 321,
                                        columnNumber: 273
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 321,
                                columnNumber: 117
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 321,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/converter-app.jsx",
                lineNumber: 317,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                id: "support",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: [
                            "Need help? ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                href: "mailto:namanbilthariya@gmail.com",
                                children: "namanbilthariya@gmail.com"
                            }, void 0, false, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 322,
                                columnNumber: 50
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 322,
                        columnNumber: 33
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "https://x.com/namanbuildai",
                        target: "_blank",
                        rel: "noreferrer",
                        children: "@namanbuildai"
                    }, void 0, false, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 322,
                        columnNumber: 129
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/all-banks",
                        children: "All Supported Banks"
                    }, void 0, false, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 322,
                        columnNumber: 216
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "/allbanks",
                        children: "All Supported Banks (850+)"
                    }, void 0, false, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 322,
                        columnNumber: 260
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                        className: "legal-copy",
                        children: "Terms & Conditions: We respect your privacy and do not store, track, or save any of your uploaded bank statement documents or financial data; all parsing occurs locally within your browser sandbox. This tool parses native text-PDF structures via automated regex matching. While we strive for 100% extraction accuracy, all converted files are provided 'as-is' without warranties. Users must cross-verify the output spreadsheet against the original PDF. We accept zero liability or financial responsibility for any formatting mismatches, parsing omissions, or mathematical errors in the generated sheets."
                    }, void 0, false, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 322,
                        columnNumber: 310
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "easylaunch-badge",
                        href: "https://easylaunch.dev/saas/apexdoc-pdf-converter",
                        target: "_blank",
                        rel: "noopener noreferrer",
                        style: {
                            display: 'inline-flex',
                            alignItems: 'center',
                            marginTop: 12
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                            src: "https://easylaunch.dev/badge/easylaunch-badge-light.svg",
                            alt: "Featured on EasyLaunch",
                            width: "120",
                            height: "36",
                            style: {
                                display: 'block'
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/converter-app.jsx",
                            lineNumber: 322,
                            columnNumber: 1167
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/converter-app.jsx",
                        lineNumber: 322,
                        columnNumber: 964
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/converter-app.jsx",
                lineNumber: 322,
                columnNumber: 12
            }, this),
            showExhausted && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-backdrop",
                role: "presentation",
                onClick: ()=>setShowExhausted(false),
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "credit-modal",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "credit-modal-title",
                    onClick: (event)=>event.stopPropagation(),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "modal-close",
                            "aria-label": "Close",
                            onClick: ()=>setShowExhausted(false),
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {
                                size: 18
                            }, void 0, false, {
                                fileName: "[project]/components/converter-app.jsx",
                                lineNumber: 323,
                                columnNumber: 350
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/converter-app.jsx",
                            lineNumber: 323,
                            columnNumber: 259
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "credit-modal-title",
                            children: "Free credit exhausted"
                        }, void 0, false, {
                            fileName: "[project]/components/converter-app.jsx",
                            lineNumber: 323,
                            columnNumber: 374
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Please upgrade your pack below to continue converting statements."
                        }, void 0, false, {
                            fileName: "[project]/components/converter-app.jsx",
                            lineNumber: 323,
                            columnNumber: 428
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "modal-action",
                            onClick: ()=>{
                                setShowExhausted(false);
                                jumpTo('pricing');
                            },
                            children: "View pricing"
                        }, void 0, false, {
                            fileName: "[project]/components/converter-app.jsx",
                            lineNumber: 323,
                            columnNumber: 500
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/converter-app.jsx",
                    lineNumber: 323,
                    columnNumber: 115
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/converter-app.jsx",
                lineNumber: 323,
                columnNumber: 23
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/converter-app.jsx",
        lineNumber: 312,
        columnNumber: 10
    }, this);
}
}),
];

//# sourceMappingURL=components_converter-app_jsx_1zry1rn._.js.map