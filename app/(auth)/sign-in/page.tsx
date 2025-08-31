
export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-sm space-y-4">
        <h2 className="text-2xl font-bold">Giriş</h2>
        <form className="space-y-3">
          <input className="w-full border rounded p-2" placeholder="E-posta" />
          <input className="w-full border rounded p-2" placeholder="Şifre" type="password" />
          <button className="w-full rounded bg-fuchsia-600 text-white p-2">Giriş Yap</button>
        </form>
        <p className="text-sm opacity-80">Demo arayüz — auth entegrasyonu sonradan eklenecek.</p>
      </div>
    </div>
  )
}
