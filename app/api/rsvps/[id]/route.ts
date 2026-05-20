import { NextResponse } from 'next/server';
import { deleteRsvp } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ok = await deleteRsvp(id);
  if (!ok) {
    return NextResponse.json({ error: 'Không tìm thấy xác nhận' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
