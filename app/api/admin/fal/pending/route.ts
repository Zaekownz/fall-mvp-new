
import { NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
export async function GET() {
  const list = await prisma.fal.findMany({
    where: { status: { in: ['PENDING','IN_REVIEW'] } },
    orderBy: { createdAt: 'asc' }
  })
  return NextResponse.json({ items: list })
}
