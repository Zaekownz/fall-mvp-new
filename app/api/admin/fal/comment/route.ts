
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'
export async function POST(req: NextRequest) {
  const { id, comment } = await req.json() as { id: string; comment: string }
  const updated = await prisma.fal.update({
    where: { id },
    data: { comment, status: 'COMMENTED', commentedBy: 'admin' }
  })
  console.log('[notify] comment ready for fal', id)
  return NextResponse.json({ ok: true, fal: updated })
}
