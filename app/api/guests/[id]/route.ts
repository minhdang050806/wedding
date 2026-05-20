import { NextResponse } from 'next/server';
import { deleteGuest, listGuests, updateGuest } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const name = String(body?.name ?? '').trim().replace(/\s+/g, ' ');
    const salutation = String(body?.salutation ?? '').trim().replace(/\s+/g, ' ');

    if (!name) {
      return NextResponse.json({ error: 'Tên không được trống' }, { status: 400 });
    }

    const list = await listGuests();
    const label = (salutation ? `${salutation} ${name}` : name).toLowerCase();
    const isDup = list.some(
      (g) =>
        g.id !== id &&
        (g.salutation ? `${g.salutation} ${g.name}` : g.name).toLowerCase() === label,
    );
    if (isDup) {
      return NextResponse.json({ error: 'Khách đã có trong danh sách' }, { status: 409 });
    }

    const updated = await updateGuest(id, { name, salutation });
    if (!updated) {
      return NextResponse.json({ error: 'Không tìm thấy khách' }, { status: 404 });
    }
    return NextResponse.json({ guest: updated });
  } catch {
    return NextResponse.json({ error: 'Yêu cầu không hợp lệ' }, { status: 400 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const ok = await deleteGuest(id);
  if (!ok) {
    return NextResponse.json({ error: 'Không tìm thấy khách' }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
