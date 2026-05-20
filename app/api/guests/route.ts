import { NextResponse } from 'next/server';
import { createGuest, listGuests } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const guests = await listGuests();
  return NextResponse.json({ guests });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = String(body?.name ?? '').trim().replace(/\s+/g, ' ');
    const salutation = String(body?.salutation ?? '').trim().replace(/\s+/g, ' ');

    if (!name) {
      return NextResponse.json({ error: 'Tên không được trống' }, { status: 400 });
    }

    const existing = await listGuests();
    const label = (salutation ? `${salutation} ${name}` : name).toLowerCase();
    const isDup = existing.some(
      (g) =>
        (g.salutation ? `${g.salutation} ${g.name}` : g.name).toLowerCase() === label,
    );
    if (isDup) {
      return NextResponse.json({ error: 'Khách đã có trong danh sách' }, { status: 409 });
    }

    const guest = await createGuest({ name, salutation });
    return NextResponse.json({ guest }, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Yêu cầu không hợp lệ' }, { status: 400 });
  }
}
