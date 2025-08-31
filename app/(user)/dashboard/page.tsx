
'use client'
import useSWR from 'swr'
const fetcher = (url:string)=> fetch(url).then(r=>r.json())

export default function Dashboard() {
  const { data, isLoading } = useSWR('/api/fal', fetcher)
  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Panelim</h2>
        <a href="/uploads/new" className="rounded-lg bg-fuchsia-600 px-4 py-2 text-white">Yeni Fal Yükle</a>
      </div>
      {isLoading && <p>Yükleniyor...</p>}
      {data && <p className="text-sm opacity-80">Tahmini süre: ~{data.etaMinutes} dk</p>}
      <div className="grid gap-3">
        {data?.items?.map((f:any)=> (
          <div key={f.id} className="border rounded p-3">
            <div className="font-semibold">{f.title}</div>
            <div className="text-xs opacity-70">Durum: {f.status}</div>
            {f.comment && <div className="mt-2 text-sm">Yorum: {f.comment}</div>}
          </div>
        ))}
        {!isLoading && data?.items?.length===0 && <div className="text-sm opacity-70">Henüz fal yok.</div>}
      </div>
    </div>
  )
}
