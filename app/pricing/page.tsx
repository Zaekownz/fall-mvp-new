
'use client'
export default function Pricing() {
  async function buy(credits: number) {
    const res = await fetch('/api/checkout/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: 'demo-user', credits })
    })
    const data = await res.json()
    if (data.url) window.location.href = data.url
  }
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Kredi Paketleri</h2>
      <div className="grid gap-4">
        <button onClick={() => buy(1)} className="rounded bg-emerald-600 text-white p-3">1 Kredi – 4.99₺</button>
        <button onClick={() => buy(5)} className="rounded bg-emerald-600 text-white p-3">5 Kredi – 19.99₺</button>
      </div>
    </div>
  )
}
