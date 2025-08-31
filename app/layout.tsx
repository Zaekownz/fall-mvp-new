
import './globals.css'
import type { ReactNode } from 'react'

export const metadata = { title: 'Falın Sırrı', description: 'Eğlence amaçlı fal platformu' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="tr"><body>{children}</body></html>
  )
}
