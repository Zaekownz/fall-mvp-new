
'use client'
import useSWR from 'swr'
import { useState } from 'react'
const fetcher = (u:string)=> fetch(u).then(r=>r.json())

export default function Pending() {
  const { data, mutate } = useSWR('/api/admin/fal/pending', fetcher)
  const [comment, setComment] = useState<Record<string,string>>({})
  async function submit(id:string) {
    await fetch('/api/admin/fal/comment', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ id, comment: comment[id] || '' }) })
    setComment(prev => ({...prev, [id]: ''}))
    mutate()
  }
  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Bekleyen Fallar</h2>
      <div className="grid gap-4">
        {data?.items?.map((f:any)=>(
          <div key={f.id} className="border rounded p-3">
            <div className="font-semibold">{f.title}</div>
            <div className="text-xs opacity-70 mb-2">Sorular: {(f.questions||[]).join(' • ') || '—'}</div>
            <textarea className="w-full border rounded p-2" placeholder="Yorum yaz..." value={comment[f.id]||''} onChange={e=>setComment({...comment, [f.id]: e.target.value})} />
            <button onClick={()=>submit(f.id)} className="mt-2 rounded bg-emerald-600 text-white px-3 py-1">Yorumu Kaydet</button>
          </div>
        ))}
        {data?.items?.length===0 && <div className="text-sm opacity-70">Bekleyen fal yok.</div>}
      </div>
    </div>
  )
}
