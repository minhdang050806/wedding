'use client';

import { useRef, useState } from 'react';
import { Pencil, X, Plus, Check } from 'lucide-react';
import { ApiGuest, guestsApi, usePolled } from '@/lib/api';

const slugify = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');

const fullLabel = (g: Pick<ApiGuest, 'salutation' | 'name'>) =>
  g.salutation ? `${g.salutation} ${g.name}` : g.name;

export function GuestDraftSection() {
  const { data: guests, refresh } = usePolled<ApiGuest[]>(guestsApi.list, []);
  const [salutation, setSalutation] = useState('');
  const [name, setName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 1800);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSalutation('');
    setName('');
  };

  const handleSave = async () => {
    const cleanName = name.trim().replace(/\s+/g, ' ');
    const cleanSalutation = salutation.trim().replace(/\s+/g, ' ');
    if (!cleanName || saving) return;

    setSaving(true);
    try {
      if (editingId) {
        const updated = await guestsApi.update(editingId, {
          name: cleanName,
          salutation: cleanSalutation,
        });
        setEditingId(null);
        showToast(`Đã cập nhật "${fullLabel(updated)}"`);
      } else {
        const created = await guestsApi.create({
          name: cleanName,
          salutation: cleanSalutation,
        });
        showToast(`Đã thêm "${fullLabel(created)}" ✦`);
      }
      setSalutation('');
      setName('');
      nameRef.current?.focus();
      await refresh();
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Lưu thất bại');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (g: ApiGuest) => {
    if (!confirm(`Xóa "${fullLabel(g)}" khỏi danh sách khách mời?`)) return;
    try {
      await guestsApi.remove(g.id);
      if (editingId === g.id) cancelEdit();
      await refresh();
    } catch (e) {
      showToast(e instanceof Error ? e.message : 'Xóa thất bại');
    }
  };

  const handleEdit = (g: ApiGuest) => {
    setEditingId(g.id);
    setSalutation(g.salutation || '');
    setName(g.name);
    nameRef.current?.focus();
  };

  const openInvite = (g: ApiGuest) => {
    const slug = slugify(fullLabel(g)) || g.id;
    const url = `/invite/${slug}?name=${encodeURIComponent(
      g.name,
    )}&salutation=${encodeURIComponent(g.salutation || '')}&key=${encodeURIComponent(g.id)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section
      id="guests"
      className="relative w-full py-20 md:py-24 px-4 bg-romantic-gradient overflow-hidden"
    >
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-secondary/30 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="font-luxe text-gold-foil text-[11px] mb-3">Draft khách mời</p>
          <h2 className="font-script text-shimmer text-5xl md:text-6xl mb-3">
            Danh sách khách mời
          </h2>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-12 bg-accent/40" />
            <span className="text-accent">❦</span>
            <span className="h-px w-12 bg-accent/40" />
          </div>
          <p className="font-serif-elegant italic text-muted-foreground">
            Nhập cách xưng hô và tên để tạo thiệp mời cá nhân hóa
          </p>
        </div>

        <div className="bg-white rounded-3xl card-glow border border-secondary/40 p-6 md:p-10">
          {editingId && (
            <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-secondary/20 border border-secondary/40 px-4 py-2">
              <span className="font-serif-elegant text-sm text-foreground">
                Đang chỉnh sửa khách mời…
              </span>
              <button
                onClick={cancelEdit}
                className="font-luxe text-[10px] text-muted-foreground hover:text-primary transition-colors"
              >
                Hủy
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_auto] gap-3 mb-3">
            <div className="flex flex-col gap-1">
              <label className="font-luxe text-[10px] text-gold-foil pl-2">
                Cách xưng hô
              </label>
              <input
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') nameRef.current?.focus();
                  if (e.key === 'Escape' && editingId) cancelEdit();
                }}
                placeholder="Anh, Chị, Cô…"
                className="rounded-full bg-input border border-border px-5 py-3
                           text-foreground font-serif-elegant placeholder:text-muted-foreground/70
                           focus:outline-none focus:ring-2 focus:ring-primary/40
                           transition"
                aria-label="Cách xưng hô"
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-luxe text-[10px] text-gold-foil pl-2">
                Tên khách mời
              </label>
              <input
                ref={nameRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave();
                  if (e.key === 'Escape' && editingId) cancelEdit();
                }}
                placeholder="Ví dụ: Minh, Lan, Gia đình bác Tâm…"
                className="rounded-full bg-input border border-border px-5 py-3
                           text-foreground font-serif-elegant placeholder:text-muted-foreground/70
                           focus:outline-none focus:ring-2 focus:ring-primary/40
                           transition"
                aria-label="Tên khách mời"
                autoComplete="off"
              />
            </div>

            <button
              onClick={handleSave}
              disabled={!name.trim() || saving}
              className="md:self-end px-8 py-3 rounded-full font-luxe text-xs text-white shadow-lg
                         bg-gradient-to-r from-primary via-[#8B2447] to-primary
                         bg-[length:200%_auto] hover:bg-right transition-all duration-500
                         disabled:opacity-40 disabled:cursor-not-allowed
                         flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {editingId ? (
                <>
                  <Check className="w-4 h-4" />
                  {saving ? 'Đang lưu…' : 'Cập nhật'}
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  {saving ? 'Đang lưu…' : 'Lưu'}
                </>
              )}
            </button>
          </div>

          {(salutation.trim() || name.trim()) && (
            <p className="mb-6 text-center font-serif-elegant italic text-muted-foreground text-sm">
              Hiển thị:{' '}
              <span className="text-foreground not-italic font-medium">
                {fullLabel({ salutation: salutation.trim(), name: name.trim() || '…' })}
              </span>
            </p>
          )}

          {!(salutation.trim() || name.trim()) && <div className="mb-6" />}

          {guests.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent/40" />
              <span className="font-luxe text-[10px] text-gold-foil whitespace-nowrap">
                {guests.length} khách mời
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent/40" />
            </div>
          )}

          {guests.length === 0 ? (
            <div className="text-center py-12 px-6 rounded-2xl border border-dashed border-accent/40 bg-white/40">
              <p className="text-accent text-2xl mb-3">❦</p>
              <p className="font-serif-elegant text-lg text-foreground mb-1">
                Chưa có khách mời nào
              </p>
              <p className="font-serif-elegant italic text-muted-foreground">
                Hãy nhập khách đầu tiên để gửi lời mời trân trọng.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              {guests.map((g) => {
                const label = fullLabel(g);
                return (
                  <div
                    key={g.id}
                    className={`group relative inline-flex items-center gap-2
                                rounded-full bg-white border px-5 py-2.5 shadow-sm
                                hover:shadow-md hover:bg-secondary/20
                                transition-all duration-300 animate-fade-in-up
                                ${
                                  editingId === g.id
                                    ? 'border-primary ring-2 ring-primary/30'
                                    : 'border-accent/40 hover:border-primary/50'
                                }`}
                  >
                    <button
                      onClick={() => openInvite(g)}
                      aria-label={`Xem thiệp mời của ${label}`}
                      className="font-serif-elegant text-foreground text-base
                                 hover:text-primary transition-colors"
                    >
                      {g.salutation && (
                        <span className="text-muted-foreground mr-1">{g.salutation}</span>
                      )}
                      <span className="font-semibold">{g.name}</span>
                    </button>
                    <button
                      onClick={() => handleEdit(g)}
                      title="Sửa"
                      aria-label={`Sửa ${label}`}
                      className="opacity-60 md:opacity-0 md:group-hover:opacity-100
                                 text-muted-foreground hover:text-primary transition-all"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(g)}
                      title="Xóa khỏi danh sách"
                      aria-label={`Xóa ${label}`}
                      className="opacity-60 md:opacity-0 md:group-hover:opacity-100
                                 text-muted-foreground hover:text-destructive transition-all"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {toast && (
        <div
          role="status"
          className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50
                     bg-primary text-white rounded-full px-5 py-2
                     font-luxe text-[11px] shadow-xl animate-fade-in-up"
        >
          {toast}
        </div>
      )}
    </section>
  );
}
