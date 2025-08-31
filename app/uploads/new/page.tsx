
'use client'
import { useState } from 'react'

export default function NewUpload() {
  const [files, setFiles] = useState<(File|null)[]>([null,null,null])
  const [q1, setQ1] = useState('')
  const [q2, setQ2] = useState('')
  const [title, setTitle] = useState('Kahve Falı')
  const [note, setNote] = useState('')
  const [msg, setMsg] = useState<string>('')

  function onFile(i:number, f: File | null) {
    setFiles(prev => prev.map((p,idx)=> idx===i?f:p))
  }

  async function uploadAll(): Promise<string[]> {
    const urls: string[] = []
    for (let i=0;i<3;i++) {
      const f = files[i]
      if (!f) throw new Error('3 fotoğraf seçin')
      const r = await fetch('/api/upload/presign', { method: 'POST', body: JSON.stringify({ ext: f.name.split('.').pop() }), headers: {'Content-Type':'application/json'} })
      const { url, key } = await r.json()
      urls.push(key)
    }
    return urls
  }

  async function submit() {
    try {
      setMsg('Yükleniyor...')
      const imageUrls = await uploadAll()
      const res = await fetch('/api/fal', {
        method: 'POST',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify({ title, note, imageUrls, questions: [q1, q2].filter(Boolean) })
      })
      if (!res.ok) throw new Error(await res.text())
      setMsg('Falınız sıraya alındı. Panelinizden takip edebilirsiniz.')
    } catch (e:any) {
      setMsg('Hata: ' + e.message)
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">Kahve Falı Yükle</h2>
      <p className="text-sm opacity-80">3 foto: fincan içi, tabak, üstten görünüm.</p>
      <input className="w-full border rounded p-2" placeholder="Başlık" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="w-full border rounded p-2" placeholder="Not (opsiyonel)" value={note} onChange={e=>setNote(e.target.value)} />
      <div className="grid grid-cols-1 gap-3">
        <input type="file" accept="image/*" onChange={e=>onFile(0, e.target.files?.[0] ?? null)} />
        <input type="file" accept="image/*" onChange={e=>onFile(1, e.target.files?.[0] ?? null)} />
        <input type="file" accept="image/*" onChange={e=>onFile(2, e.target.files?.[0] ?? null)} />
      </div>
      <div className="grid gap-2">
        <input className="w-full border rounded p-2" placeholder="Soru 1 (opsiyonel)" value={q1} onChange={e=>setQ1(e.target.value)} />
        <input className="w-full border rounded p-2" placeholder="Soru 2 (opsiyonel)" value={q2} onChange={e=>setQ2(e.target.value)} />
      </div>
      <button onClick={submit} className="rounded bg-fuchsia-600 text-white px-4 py-2">Falımı Gönder</button>
      {msg && <p className="text-sm">{msg}</p>}
    </div>
  )
}
