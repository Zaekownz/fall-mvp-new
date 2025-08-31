
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
import { DAILY_LIMIT, ETA_MINUTES_PER_FAL, DEMO_USER_ID } from '@/src/lib/env'

export async function GET() {
  const list = await prisma.fal.findMany({
    where: { userId: DEMO_USER_ID },
    orderBy: { createdAt: 'desc' }
  })
  const pendingCount = await prisma.fal.count({ where: { status: { in: ['PENDING','IN_REVIEW'] } } })
  const etaMinutes = Math.max(ETA_MINUTES_PER_FAL, pendingCount * ETA_MINUTES_PER_FAL)
  return NextResponse.json({ items: list, etaMinutes })
}

export async function POST(req: NextRequest) {
  const body = await req.json()
  const { title, note, imageUrls, questions } = body as { title:string; note?:string; imageUrls:string[]; questions:string[] }

  const start = new Date(); start.setHours(0,0,0,0)
  const end = new Date(); end.setHours(23,59,59,999)
  const countToday = await prisma.fal.count({ where: { createdAt: { gte: start, lte: end } } })
  if (countToday >= DAILY_LIMIT) return new NextResponse('Günlük limit dolu', { status: 429 })
  if (!imageUrls || imageUrls.length < 3) return new NextResponse('3 fotoğraf gerekli', { status: 400 })

  const fal = await prisma.fal.create({
    data: {
      userId: DEMO_USER_ID,
      title, note,
      imageUrls,
      questions: (questions||[]).slice(0,2)
    }
  })
  return NextResponse.json({ fal })
}
