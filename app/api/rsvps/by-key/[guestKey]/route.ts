import { NextResponse } from 'next/server';
import { findRsvpByGuestKey } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ guestKey: string }> },
) {
  const { guestKey } = await params;
  const rsvp = await findRsvpByGuestKey(decodeURIComponent(guestKey));
  return NextResponse.json({ rsvp });
}
