
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-fuchsia-600 via-amber-400 to-emerald-500 text-white">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h1 className="text-5xl font-extrabold drop-shadow">Falın Sırrı – Eğlence Amaçlı Fal Platformu</h1>
        <p className="mt-4 text-lg max-w-2xl">Fotoğrafını yükle, kredini kullan, yorumunu panelinden takip et. Hızlı, güvenli, KVKK uyumlu.</p>
        <div className="mt-8 flex gap-4">
          <Link className="rounded-2xl bg-black/20 px-6 py-3 backdrop-blur hover:bg-black/30" href="/pricing">Kredi Satın Al</Link>
          <Link className="rounded-2xl bg-white text-black px-6 py-3" href="/sign-in">Giriş Yap</Link>
        </div>
      </div>
    </main>
  )
}
