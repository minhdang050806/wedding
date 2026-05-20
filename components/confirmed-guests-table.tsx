'use client';

import { CheckCircle2, Trash2, Users } from 'lucide-react';
import {
  ApiRsvp,
  GUEST_TYPE_LABELS,
  PICKUP_LOCATION_LABELS,
  TRANSPORT_LABELS,
  rsvpsApi,
  usePolled,
} from '@/lib/api';

export function ConfirmedGuestsTable() {
  const { data: rsvps, refresh } = usePolled<ApiRsvp[]>(rsvpsApi.list, []);

  const totalPeople = rsvps.reduce(
    (sum, r) => sum + (parseInt(r.numberOfGuests, 10) || 0),
    0,
  );

  const handleDelete = async (r: ApiRsvp) => {
    const label = `${r.guestSalutation || ''} ${r.guestName || r.fullName}`.trim();
    if (!confirm(`Xóa xác nhận của "${label}"?`)) return;
    try {
      await rsvpsApi.remove(r.id);
      await refresh();
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Xóa thất bại');
    }
  };

  const transportText = (r: ApiRsvp) => {
    if (r.transport === 'other')
      return r.transportOther ? `Khác · ${r.transportOther}` : 'Khác';
    if (r.transport === 'family' && r.pickupLocation)
      return `${TRANSPORT_LABELS.family} · ${PICKUP_LOCATION_LABELS[r.pickupLocation] ?? r.pickupLocation}`;
    return TRANSPORT_LABELS[r.transport] ?? r.transport;
  };

  return (
    <section className="relative w-full py-16 md:py-20 px-4 overflow-hidden bg-gradient-to-b from-transparent via-secondary/10 to-secondary/20">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      <div className="relative max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-luxe text-gold-foil text-[13px] mb-3">Khách đã xác nhận</p>
          <h2 className="font-script text-shimmer text-4xl md:text-5xl mb-3">
            Danh sách xác nhận tham dự
          </h2>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-12 bg-accent/40" />
            <span className="text-accent">❦</span>
            <span className="h-px w-12 bg-accent/40" />
          </div>
          {rsvps.length > 0 && (
            <p className="font-serif-elegant italic text-muted-foreground">
              {rsvps.length} khách mời đã xác nhận · {totalPeople} người tham dự
            </p>
          )}
        </div>

        {rsvps.length === 0 ? (
          <div className="max-w-md mx-auto text-center py-12 px-6 rounded-2xl border border-dashed border-accent/40 bg-white/60">
            <Users className="w-8 h-8 text-accent mx-auto mb-3" />
            <p className="font-serif-elegant text-lg text-foreground mb-1">
              Chưa có ai xác nhận
            </p>
            <p className="font-serif-elegant italic text-muted-foreground">
              Khi khách mời điền form xác nhận, thông tin sẽ hiển thị ở đây.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl card-glow border border-secondary/40 overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-primary/5 via-secondary/10 to-accent/5 border-b border-secondary/30">
                    <Th>Khách mời</Th>
                    <Th>Liên hệ</Th>
                    <Th align="center">Số người</Th>
                    <Th>Khách của</Th>
                    <Th>Di chuyển</Th>
                    <Th>Lời nhắn</Th>
                    <Th align="center">‎</Th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r, i) => (
                    <tr
                      key={r.id}
                      className={`border-b border-secondary/15 last:border-0 transition-colors
                                  hover:bg-secondary/10 ${i % 2 === 0 ? '' : 'bg-secondary/[0.03]'}`}
                    >
                      <Td>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <div>
                            {r.guestSalutation && (
                              <span className="text-muted-foreground text-sm">
                                {r.guestSalutation}{' '}
                              </span>
                            )}
                            <span className="font-semibold text-foreground">
                              {r.guestName || r.fullName}
                            </span>
                            {r.fullName !==
                              `${r.guestSalutation || ''} ${r.guestName || ''}`.trim() && (
                              <p className="text-xs text-muted-foreground italic mt-0.5">
                                ({r.fullName})
                              </p>
                            )}
                          </div>
                        </div>
                      </Td>
                      <Td>
                        <a
                          href={`tel:${r.phone}`}
                          className="text-foreground hover:text-primary font-mono text-sm"
                        >
                          {r.phone}
                        </a>
                      </Td>
                      <Td align="center">
                        <span className="inline-flex items-center justify-center min-w-[2rem] px-2.5 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-sm">
                          {r.numberOfGuests}
                        </span>
                      </Td>
                      <Td>
                        <span className="text-foreground text-sm">
                          {GUEST_TYPE_LABELS[r.guestType] ?? r.guestType}
                        </span>
                      </Td>
                      <Td>
                        <span className="text-foreground text-sm">{transportText(r)}</span>
                      </Td>
                      <Td>
                        {r.message ? (
                          <span className="text-muted-foreground text-sm italic line-clamp-2">
                            "{r.message}"
                          </span>
                        ) : (
                          <span className="text-muted-foreground/50 text-sm">·</span>
                        )}
                      </Td>
                      <Td align="center">
                        <button
                          onClick={() => handleDelete(r)}
                          title="Xóa xác nhận"
                          aria-label="Xóa xác nhận"
                          className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </Td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-secondary/20">
              {rsvps.map((r) => (
                <div key={r.id} className="p-5 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <div>
                        {r.guestSalutation && (
                          <span className="text-muted-foreground text-sm">
                            {r.guestSalutation}{' '}
                          </span>
                        )}
                        <span className="font-semibold text-foreground">
                          {r.guestName || r.fullName}
                        </span>
                        <p className="text-xs text-muted-foreground italic mt-0.5">
                          {r.fullName}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(r)}
                      className="p-1.5 rounded-full text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                      aria-label="Xóa xác nhận"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-sm pl-6">
                    <MobileField label="SĐT" value={r.phone} />
                    <MobileField label="Số người" value={`${r.numberOfGuests} người`} />
                    <MobileField
                      label="Khách của"
                      value={GUEST_TYPE_LABELS[r.guestType] ?? r.guestType}
                    />
                    <MobileField label="Di chuyển" value={transportText(r)} />
                  </div>

                  {r.message && (
                    <p className="text-muted-foreground text-sm italic pl-6 border-l-2 border-accent/30">
                      "{r.message}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function Th({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <th
      className={`px-4 py-3 text-${align} font-luxe text-[13px] text-gold-foil whitespace-nowrap`}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = 'left',
}: {
  children: React.ReactNode;
  align?: 'left' | 'center';
}) {
  return <td className={`px-4 py-4 text-${align} align-top`}>{children}</td>;
}

function MobileField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-luxe text-[12px] text-gold-foil mb-0.5">{label}</p>
      <p className="text-foreground">{value}</p>
    </div>
  );
}
