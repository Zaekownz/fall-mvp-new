
import { NextResponse } from 'next/server'
export async function POST(req: Request) {
  return NextResponse.json({ url: 'https://example.com/upload', key: 'fal/demo/key.jpg' })
}
