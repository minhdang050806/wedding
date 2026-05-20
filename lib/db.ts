import { Redis } from '@upstash/redis';

/**
 * Wedding KV store.
 *
 * Uses Upstash Redis (= Vercel KV) in production. Falls back to a
 * process-local in-memory Map when env vars are missing — so `npm run dev`
 * still works without setup, with the caveat that data resets on restart
 * and isn't shared across processes.
 *
 * RSVPs use Redis Hash (HSET/HGETALL/HDEL) so that each submission is
 * an atomic write to a single hash field. The old approach (GET full array →
 * splice → SET) had a race window on Vercel's concurrent serverless functions:
 * two simultaneous submits would both read the same stale list and the later
 * write would silently discard the earlier one.
 */

const GUESTS_KEY = 'wedding:guests';
const RSVPS_HASH_KEY = 'wedding:rsvps_h'; // Redis Hash: field=guestKey, value=StoredRsvp

type MemoryStoreShape = Record<string, unknown[]>;
type MemoryHashShape = Record<string, Record<string, unknown>>;

class MemoryStore {
  private lists: MemoryStoreShape = {};
  private hashes: MemoryHashShape = {};

  async get<T>(key: string): Promise<T[] | null> {
    return (this.lists[key] as T[]) ?? null;
  }
  async set<T>(key: string, value: T[]): Promise<void> {
    this.lists[key] = value as unknown[];
  }
  async hget<T>(key: string, field: string): Promise<T | null> {
    return ((this.hashes[key]?.[field] as T) ?? null);
  }
  async hset<T>(key: string, field: string, value: T): Promise<void> {
    if (!this.hashes[key]) this.hashes[key] = {};
    this.hashes[key][field] = value as unknown;
  }
  async hgetall<T>(key: string): Promise<Record<string, T> | null> {
    const h = this.hashes[key];
    if (!h) return null;
    return h as Record<string, T>;
  }
  async hdel(key: string, field: string): Promise<void> {
    if (this.hashes[key]) delete this.hashes[key][field];
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

// ───────── Guests (array, low-concurrency admin tool) ──────────

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

// ───────── RSVPs (Redis Hash — each guestKey is a separate field) ──

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
  if (redis) {
    const hash = await redis.hgetall<Record<string, StoredRsvp>>(RSVPS_HASH_KEY);
    if (!hash) return [];
    return Object.values(hash);
  }
  const hash = await memory.hgetall<StoredRsvp>(RSVPS_HASH_KEY);
  if (!hash) return [];
  return Object.values(hash);
}

export async function findRsvpByGuestKey(
  guestKey: string,
): Promise<StoredRsvp | null> {
  if (redis) {
    const rsvp = await redis.hget<StoredRsvp>(RSVPS_HASH_KEY, guestKey);
    return rsvp ?? null;
  }
  return memory.hget<StoredRsvp>(RSVPS_HASH_KEY, guestKey);
}

export async function upsertRsvp(
  input: Omit<StoredRsvp, 'id' | 'submittedAt'>,
): Promise<StoredRsvp> {
  if (redis) {
    const existing = await redis.hget<StoredRsvp>(RSVPS_HASH_KEY, input.guestKey);
    const next: StoredRsvp = {
      ...input,
      id: existing?.id ?? cryptoRandomId(),
      submittedAt: Date.now(),
    };
    // Atomic: only touches the one field for this guestKey
    await redis.hset(RSVPS_HASH_KEY, { [input.guestKey]: next });
    return next;
  }
  const existing = await memory.hget<StoredRsvp>(RSVPS_HASH_KEY, input.guestKey);
  const next: StoredRsvp = {
    ...input,
    id: existing?.id ?? cryptoRandomId(),
    submittedAt: Date.now(),
  };
  await memory.hset(RSVPS_HASH_KEY, input.guestKey, next);
  return next;
}

export async function deleteRsvp(id: string): Promise<boolean> {
  if (redis) {
    const all = await listRsvps();
    const entry = all.find((r) => r.id === id);
    if (!entry) return false;
    await redis.hdel(RSVPS_HASH_KEY, entry.guestKey);
    return true;
  }
  const all = await listRsvps();
  const entry = all.find((r) => r.id === id);
  if (!entry) return false;
  await memory.hdel(RSVPS_HASH_KEY, entry.guestKey);
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
