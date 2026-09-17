import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { FileUp, ShieldCheck, Sparkles } from 'lucide-react'
import '../index.css'

function App() {
  const [fileName, setFileName] = useState('')

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-4xl">
        <header className="mb-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-600 p-2 text-white"><Sparkles size={20} /></div>
            <span className="text-xl font-bold tracking-tight">ApexDoc</span>
          </div>
          <span className="text-sm text-slate-500">Bank statement converter</span>
        </header>

        <section className="grid items-center gap-12 md:grid-cols-[1.1fr_.9fr]">
          <div>
            <p className="mb-4 font-semibold text-blue-600">PDF to Excel, simplified</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Turn bank statements into clean spreadsheets.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">Upload a PDF and extract transactions into an organised Excel file in a few clicks.</p>
          </div>
          <label className="cursor-pointer rounded-3xl border-2 border-dashed border-blue-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 transition hover:border-blue-500">
            <input className="sr-only" type="file" accept="application/pdf" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? '')} />
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600"><FileUp size={30} /></div>
            <h2 className="text-xl font-semibold">Drop your PDF here</h2>
            <p className="mt-2 text-sm text-slate-500">or click to browse your files</p>
            {fileName && <p className="mt-5 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700">{fileName}</p>}
            <button type="button" className="mt-6 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white">Choose PDF</button>
          </label>
        </section>

        <div className="mt-14 flex items-center gap-2 text-sm text-slate-500"><ShieldCheck size={18} className="text-emerald-600" /> Your files are processed securely.</div>
      </div>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
