'use client';

import { useEffect, useRef, useState } from 'react';

export type ApiGuest = {
  id: string;
  salutation: string;
  name: string;
  createdAt: number;
};

export type ApiRsvp = {
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

export const TRANSPORT_LABELS: Record<string, string> = {
  self: 'Tự di chuyển',
  family: 'Đi theo gia đình chuẩn bị',
  other: 'Khác',
};

export const PICKUP_LOCATION_LABELS: Record<string, string> = {
  rox: 'Toà Rox 54A Nguyễn Chí Thanh',
  'ha-dong': 'Hà Đông',
  tthnqg: 'Trung tâm hội nghị Quốc Gia',
};

export const PICKUP_LOCATION_OPTIONS = [
  { value: 'rox', label: PICKUP_LOCATION_LABELS.rox },
  { value: 'ha-dong', label: PICKUP_LOCATION_LABELS['ha-dong'] },
  { value: 'tthnqg', label: PICKUP_LOCATION_LABELS.tthnqg },
];

export const GUEST_TYPE_LABELS: Record<string, string> = {
  'groom-family': 'Nhà trai',
  'bride-family': 'Nhà gái',
  friend: 'Bạn bè',
};

const POLL_INTERVAL_MS = 5000;

async function jsonFetch<T>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const res = await fetch(input, {
    cache: 'no-store',
    ...init,
    headers: { 'content-type': 'application/json', ...(init?.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = (data && data.error) || `Request failed (${res.status})`;
    throw new Error(msg);
  }
  return data as T;
}

// ───────── Guests ──────────────────────────────────────────────

export const guestsApi = {
  list: () => jsonFetch<{ guests: ApiGuest[] }>('/api/guests').then((r) => r.guests),
  create: (input: { salutation: string; name: string }) =>
    jsonFetch<{ guest: ApiGuest }>('/api/guests', {
      method: 'POST',
      body: JSON.stringify(input),
    }).then((r) => r.guest),
  update: (id: string, input: { salutation: string; name: string }) =>
    jsonFetch<{ guest: ApiGuest }>(`/api/guests/${id}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    }).then((r) => r.guest),
  remove: (id: string) =>
    jsonFetch<{ ok: true }>(`/api/guests/${id}`, { method: 'DELETE' }),
};

// ───────── RSVPs ───────────────────────────────────────────────

export const rsvpsApi = {
  list: () => jsonFetch<{ rsvps: ApiRsvp[] }>('/api/rsvps').then((r) => r.rsvps),
  getByKey: (guestKey: string) =>
    jsonFetch<{ rsvp: ApiRsvp | null }>(
      `/api/rsvps/by-key/${encodeURIComponent(guestKey)}`,
    ).then((r) => r.rsvp),
  upsert: (input: Omit<ApiRsvp, 'id' | 'submittedAt'>) =>
    jsonFetch<{ rsvp: ApiRsvp }>('/api/rsvps', {
      method: 'POST',
      body: JSON.stringify(input),
    }).then((r) => r.rsvp),
  remove: (id: string) =>
    jsonFetch<{ ok: true }>(`/api/rsvps/${id}`, { method: 'DELETE' }),
};

// ───────── Polling hook ────────────────────────────────────────

export function usePolled<T>(
  fetcher: () => Promise<T>,
  initial: T,
  intervalMs = POLL_INTERVAL_MS,
): { data: T; refresh: () => Promise<void>; loading: boolean; error: string | null } {
  const [data, setData] = useState<T>(initial);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetcherRef = useRef(fetcher);
  fetcherRef.current = fetcher;
  const mountedRef = useRef(true);

  const refresh = async () => {
    try {
      const value = await fetcherRef.current();
      if (mountedRef.current) {
        setData(value);
        setError(null);
      }
    } catch (e) {
      if (mountedRef.current) {
        setError(e instanceof Error ? e.message : 'Lỗi tải dữ liệu');
      }
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  };

  useEffect(() => {
    mountedRef.current = true;
    refresh();
    const id = setInterval(refresh, intervalMs);

    const onFocus = () => refresh();
    window.addEventListener('focus', onFocus);

    return () => {
      mountedRef.current = false;
      clearInterval(id);
      window.removeEventListener('focus', onFocus);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [intervalMs]);

  return { data, refresh, loading, error };
}
