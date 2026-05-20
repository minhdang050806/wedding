import { NextResponse } from 'next/server';
import { listRsvps, upsertRsvp } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  const rsvps = await listRsvps();
  return NextResponse.json({ rsvps });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const guestKey = String(body?.guestKey ?? '').trim();
    const fullName = String(body?.fullName ?? '').trim();
    const phone = String(body?.phone ?? '').trim();

    if (!guestKey || !fullName || !phone) {
      return NextResponse.json(
        { error: 'Thiếu thông tin bắt buộc' },
        { status: 400 },
      );
    }

    const rsvp = await upsertRsvp({
      guestKey,
      guestSalutation: body.guestSalutation || undefined,
      guestName: body.guestName || undefined,
      fullName,
      phone,
      numberOfGuests: String(body?.numberOfGuests ?? '1'),
      guestType: String(body?.guestType ?? 'friend'),
      transport: String(body?.transport ?? 'self'),
      transportOther: body?.transportOther ? String(body.transportOther) : undefined,
      pickupLocation: body?.pickupLocation ? String(body.pickupLocation) : undefined,
      message: body?.message ? String(body.message) : undefined,
    });

    return NextResponse.json({ rsvp }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Yêu cầu không hợp lệ' }, { status: 400 });
  }
}
