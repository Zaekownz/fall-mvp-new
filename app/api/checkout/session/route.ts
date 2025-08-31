
import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  const { credits } = await req.json()
  const amountTRY = (credits || 1) * 499
  const fakeUrl = `/pricing?fakeCheckout=1&amount=${amountTRY}`
  return NextResponse.json({ url: fakeUrl })
}
