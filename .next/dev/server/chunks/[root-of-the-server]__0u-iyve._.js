module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:fs/promises [external] (node:fs/promises, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:fs/promises", () => require("node:fs/promises"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/credits/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs/promises [external] (node:fs/promises, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/headers.js [app-route] (ecmascript)");
;
;
;
;
const APPSUMO_COOKIE = 'apexdoc_appsumo_activated';
const APPSUMO_CODE_PATTERN = /^APX-[A-Z0-9]{5}-[A-Z0-9]{5}$/;
async function isValidAppSumoCode(code) {
    const csv = await (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs$2f$promises__$5b$external$5d$__$28$node$3a$fs$2f$promises$2c$__cjs$29$__["readFile"])((0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["join"])(process.cwd(), 'data', 'appsumo-codes.csv'), 'utf8');
    return new Set(csv.split(/\r?\n/).map((line)=>line.trim().toUpperCase()).filter(Boolean)).has(code);
}
function jsonError(message, status = 400) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: false,
        error: message
    }, {
        status
    });
}
const MAX_LICENSE_KEY_LENGTH = 256;
const DEFAULT_WORKER_URL = 'https://apexdocs.pluggerrohan.workers.dev';
function getClientIp(request) {
    return request.headers.get('CF-Connecting-IP') || request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
async function POST(request) {
    let body;
    try {
        body = await request.json();
    } catch  {
        return jsonError('Invalid JSON body.');
    }
    const action = body?.action;
    const licenseKey = typeof body?.licenseKey === 'string' ? body.licenseKey.trim() : '';
    const appSumoCode = typeof body?.code === 'string' ? body.code.trim().toUpperCase() : '';
    if (action === 'activate_appsumo') {
        if (!APPSUMO_CODE_PATTERN.test(appSumoCode)) return jsonError('Enter a valid AppSumo code.');
        try {
            if (!await isValidAppSumoCode(appSumoCode)) return jsonError('That AppSumo code is not valid.', 422);
            const cookieStore = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$headers$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["cookies"])();
            cookieStore.set(APPSUMO_COOKIE, '1', {
                httpOnly: true,
                sameSite: 'lax',
                secure: ("TURBOPACK compile-time value", "development") === 'production',
                maxAge: 60 * 60 * 24 * 365,
                path: '/'
            });
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                activated: true,
                credits: 3
            });
        } catch  {
            return jsonError('AppSumo activation is temporarily unavailable.', 503);
        }
    }
    if (![
        'restore',
        'quota',
        'consume',
        'consume_pages'
    ].includes(action)) return jsonError('Unsupported action.');
    if (action === 'restore' && (!licenseKey || licenseKey.length > MAX_LICENSE_KEY_LENGTH)) return jsonError('A valid license key is required.');
    // The Worker URL is the only app-facing integration point. Secrets stay in Vercel Vars.
    const workerUrl = process.env.CREDITS_WORKER_URL || process.env.DODO_CREDITS_API_URL || DEFAULT_WORKER_URL;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    let target;
    try {
        target = new URL(workerUrl);
        if (target.protocol !== 'https:') return jsonError('Credit registry must use HTTPS.', 503);
    } catch  {
        return jsonError('Credit registry URL is invalid.', 503);
    }
    try {
        const paths = action === 'restore' ? [
            '',
            '/api/credits',
            '/credits',
            '/license/restore'
        ] : [
            ''
        ];
        let upstream;
        let result;
        for (const path of paths){
            const endpoint = new URL(path || target.pathname || '/', target);
            upstream = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    accept: 'application/json'
                },
                body: JSON.stringify({
                    action,
                    ...action === 'restore' ? {
                        licenseKey,
                        license_key: licenseKey
                    } : {},
                    ...action === 'consume_pages' ? {
                        pages: Number(body?.pages)
                    } : {},
                    ip: getClientIp(request)
                }),
                cache: 'no-store',
                signal: AbortSignal.timeout(8000)
            });
            result = await upstream.json().catch(()=>null);
            if (upstream.ok && result?.ok) break;
            if (upstream.status !== 404 && upstream.status !== 405) break;
        }
        if (!upstream?.ok || !result?.ok) {
            // External credit worker returned an error — fall back to local mode for
            // quota/consume actions so conversions are not blocked.
            if (action === 'quota' || action === 'consume' || action === 'consume_pages') {
                return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                    ok: true,
                    remaining: 999,
                    local: true
                });
            }
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: false,
                error: result?.error || 'License recovery is unavailable right now.'
            }, {
                status: upstream?.status >= 400 ? upstream.status : 502
            });
        }
        if (action === 'quota' || action === 'consume' || action === 'consume_pages') {
            const remaining = Number(result.remaining);
            if (!Number.isSafeInteger(remaining) || remaining < 0) return jsonError('Invalid quota response.', 502);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                remaining,
                ...result.pages ? {
                    pages: Number(result.pages)
                } : {}
            });
        }
        const credits = Number(result.credits);
        if (!Number.isSafeInteger(credits) || credits < 0) return jsonError('Invalid credit registry response.', 502);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            credits
        });
    } catch  {
        // External credit worker unreachable — fall back to local mode so conversions
        // are not blocked. The client tracks free-tier credits in localStorage.
        if (action === 'quota' || action === 'consume' || action === 'consume_pages') {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                remaining: 999,
                local: true
            });
        }
        return jsonError('License recovery is unavailable right now.', 502);
    }
}
async function GET() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        ok: true,
        service: 'credits',
        status: 'ready',
        configured: Boolean(process.env.CREDITS_WORKER_URL || process.env.DODO_CREDITS_API_URL)
    });
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0u-iyve._.js.map