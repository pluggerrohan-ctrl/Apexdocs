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
    ()=>POST,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
const runtime = 'nodejs';
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
    if (![
        'restore',
        'quota',
        'consume'
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
                    ip: getClientIp(request)
                }),
                cache: 'no-store',
                signal: AbortSignal.timeout(8000)
            });
            result = await upstream.json().catch(()=>null);
            if (upstream.ok && result?.ok) break;
            if (upstream.status !== 404 && upstream.status !== 405) break;
        }
        if (!upstream?.ok || !result?.ok) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: false,
            error: result?.error || 'License recovery is unavailable right now.'
        }, {
            status: upstream?.status >= 400 ? upstream.status : 502
        });
        if (action === 'quota' || action === 'consume') {
            const remaining = Number(result.remaining);
            if (!Number.isSafeInteger(remaining) || remaining < 0 || remaining > 3) return jsonError('Invalid quota response.', 502);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                ok: true,
                remaining
            });
        }
        const credits = Number(result.credits);
        if (!Number.isSafeInteger(credits) || credits < 0) return jsonError('Invalid credit registry response.', 502);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            ok: true,
            credits
        });
    } catch  {
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

//# sourceMappingURL=%5Broot-of-the-server%5D__0n6828t._.js.map