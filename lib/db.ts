import { Redis } from '@upstash/redis';

/**
 * Wedding KV store.
 *
 * Uses Upstash Redis (= Vercel KV) in production. Falls back to a
 * process-local in-memory Map when env vars are missing — so `npm run dev`
 * still works without setup, with the caveat that data resets on restart
 * and isn't shared across processes.
 */

const GUESTS_KEY = 'wedding:guests';
const RSVPS_KEY = 'wedding:rsvps';

type StoreShape = Record<string, unknown[]>;

class MemoryStore {
  private data: StoreShape = {};
  async get<T>(key: string): Promise<T[] | null> {
    return (this.data[key] as T[]) ?? null;
  }
  async set<T>(key: string, value: T[]): Promise<void> {
    this.data[key] = value as unknown[];
  }
}

const memory = new MemoryStore();

const hasUpstash =
  !!process.env.KV_REST_API_URL && !!process.env.KV_REST_API_TOKEN;

const redis = hasUpstash
  ? new Redis({
      url: process.env.KV_REST_API_URL!,
      token: process.env.KV_REST_API_TOKEN!,
    })
  : null;

async function readList<T>(key: string): Promise<T[]> {
  if (redis) {
    const value = await redis.get<T[]>(key);
    return Array.isArray(value) ? value : [];
  }
  const value = await memory.get<T>(key);
  return value ?? [];
}

async function writeList<T>(key: string, list: T[]): Promise<void> {
  if (redis) {
    await redis.set(key, list);
    return;
  }
  await memory.set(key, list);
}

// ───────── Guests ──────────────────────────────────────────────

export type StoredGuest = {
  id: string;
  salutation: string;
  name: string;
  createdAt: number;
};

export async function listGuests(): Promise<StoredGuest[]> {
  return readList<StoredGuest>(GUESTS_KEY);
}

export async function createGuest(
  g: Omit<StoredGuest, 'id' | 'createdAt'>,
): Promise<StoredGuest> {
  const list = await listGuests();
  const guest: StoredGuest = {
    ...g,
    id: cryptoRandomId(),
    createdAt: Date.now(),
  };
  await writeList(GUESTS_KEY, [...list, guest]);
  return guest;
}

export async function updateGuest(
  id: string,
  patch: Partial<Pick<StoredGuest, 'salutation' | 'name'>>,
): Promise<StoredGuest | null> {
  const list = await listGuests();
  const idx = list.findIndex((g) => g.id === id);
  if (idx === -1) return null;
  list[idx] = { ...list[idx], ...patch };
  await writeList(GUESTS_KEY, list);
  return list[idx];
}

export async function deleteGuest(id: string): Promise<boolean> {
  const list = await listGuests();
  const next = list.filter((g) => g.id !== id);
  if (next.length === list.length) return false;
  await writeList(GUESTS_KEY, next);
  return true;
}

// ───────── RSVPs ───────────────────────────────────────────────

export type StoredRsvp = {
  id: string;
  guestKey: string;
  guestSalutation?: string;
  guestName?: string;
  fullName: string;
  phone: string;
  numberOfGuests: string;
  guestType: string;
  transport: string;
  transportOther?: string;
  pickupLocation?: string;
  message?: string;
  submittedAt: number;
};

export async function listRsvps(): Promise<StoredRsvp[]> {
  return readList<StoredRsvp>(RSVPS_KEY);
}

export async function findRsvpByGuestKey(
  guestKey: string,
): Promise<StoredRsvp | null> {
  const list = await listRsvps();
  return list.find((r) => r.guestKey === guestKey) ?? null;
}

export async function upsertRsvp(
  input: Omit<StoredRsvp, 'id' | 'submittedAt'>,
): Promise<StoredRsvp> {
  const list = await listRsvps();
  const idx = list.findIndex((r) => r.guestKey === input.guestKey);
  const next: StoredRsvp = {
    ...input,
    id: idx >= 0 ? list[idx].id : cryptoRandomId(),
    submittedAt: Date.now(),
  };
  if (idx >= 0) list[idx] = next;
  else list.push(next);
  await writeList(RSVPS_KEY, list);
  return next;
}

export async function deleteRsvp(id: string): Promise<boolean> {
  const list = await listRsvps();
  const next = list.filter((r) => r.id !== id);
  if (next.length === list.length) return false;
  await writeList(RSVPS_KEY, next);
  return true;
}

function cryptoRandomId(): string {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export const TRANSPORT_LABELS: Record<string, string> = {
  self: 'Tự di chuyển',
  family: 'Đi theo gia đình chuẩn bị',
  other: 'Khác',
};

export const GUEST_TYPE_LABELS: Record<string, string> = {
  'groom-family': 'Nhà trai',
  'bride-family': 'Nhà gái',
  friend: 'Bạn bè',
};

export const isBackendConfigured = hasUpstash;
