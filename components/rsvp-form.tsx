'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Heart } from 'lucide-react';
import { rsvpsApi } from '@/lib/api';

interface RsvpFormProps {
  guestKey?: string;
  guestSalutation?: string;
  guestName?: string;
}

function getOrCreateSessionKey(baseKey: string): string {
  // Generic forms (not tied to a specific guest) must always get a fresh key per
  // page load, otherwise two people registering from the same device would share
  // the same key and the second submission would silently overwrite the first.
  if (baseKey === 'general' || baseKey === 'anonymous') {
    return `${baseKey}-${crypto.randomUUID()}`;
  }
  // Personalized invite links: cache in localStorage so the same guest can
  // reload and update their RSVP without creating a duplicate entry.
  const storageKey = `rsvp_session_${baseKey}`;
  try {
    const existing = localStorage.getItem(storageKey);
    if (existing) return existing;
    const id = `${baseKey}-${crypto.randomUUID()}`;
    localStorage.setItem(storageKey, id);
    return id;
  } catch {
    return `${baseKey}-${Date.now()}`;
  }
}

export function RsvpForm({ guestKey, guestSalutation, guestName }: RsvpFormProps = {}) {
  const baseKey = guestKey || (guestName ? `${guestSalutation ?? ''}-${guestName}` : 'anonymous');

  const effectiveKey = useMemo(() => {
    if (typeof window === 'undefined') return baseKey;
    return getOrCreateSessionKey(baseKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [formData, setFormData] = useState({
    fullName:
      guestSalutation && guestName ? `${guestSalutation} ${guestName}`.trim() : '',
    phone: '',
    numberOfGuests: '1',
    guestType: 'friend',
    transport: 'self',
    message: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = async () => {
    setSubmitting(true);
    setErrorMsg(null);
    try {
      await rsvpsApi.upsert({
        guestKey: effectiveKey,
        guestSalutation,
        guestName,
        ...formData,
      });
      setSubmitted(true);
      setShowConfirmation(false);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Gửi không thành công');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section id="rsvp" className="w-full py-8 md:py-10 px-4 bg-background">
        <div className="max-w-sm mx-auto">
          <div className="relative bg-white rounded-3xl card-glow border border-secondary/40 px-8 py-10 text-center overflow-hidden">
            {/* Corner ornaments */}
            <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-accent/50 pointer-events-none" />
            <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent/50 pointer-events-none" />
            <span className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-accent/50 pointer-events-none" />
            <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-accent/50 pointer-events-none" />
            {/* Soft glow */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full bg-secondary/30 blur-3xl pointer-events-none" />

            <div className="relative">
              <Heart className="w-8 h-8 text-accent fill-accent/50 mx-auto mb-5" />
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-8 bg-accent/30" />
                <span className="text-accent/60 text-sm">❦</span>
                <span className="h-px w-8 bg-accent/30" />
              </div>
              <p className="font-script text-shimmer text-3xl mb-3">Cảm ơn quý khách</p>
              <p className="font-serif-elegant italic text-foreground/65 text-sm leading-relaxed">
                Sự xác nhận của quý khách là niềm hạnh phúc<br />của Phúc Tường và Ngọc Anh.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="rsvp" className="w-full py-8 md:py-10 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-luxe text-gold-foil text-[13px] md:text-sm mb-4">
            Phần đăng ký khách mời
          </div>
          <h2
            className="font-script text-shimmer mb-4"
            style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)', whiteSpace: 'nowrap' }}
          >
            Xác nhận tham dự
          </h2>
          <p className="font-display text-lg text-muted-foreground">
            Vui lòng điền form dưới đây để Phúc Tường và Ngọc Anh chuẩn bị tốt nhất cho ngày vui
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-2xl shadow-lg p-8 md:p-10"
        >
          <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-primary/20 pointer-events-none" />
          <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-primary/20 pointer-events-none" />
          <span className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-primary/20 pointer-events-none" />
          <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-primary/20 pointer-events-none" />
          <div className="space-y-6">
            <div>
              <label className="block font-luxe text-[11px] text-gold-foil mb-2">
                Họ và tên <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
                required
                className="rounded-lg border-border focus:border-primary focus:ring-primary/20 text-base py-5"
              />
            </div>

            <div>
              <label className="block font-luxe text-[11px] text-gold-foil mb-2">
                Số điện thoại <span className="text-primary">*</span>
              </label>
              <Input
                type="tel"
                inputMode="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Ví dụ: 0987 654 321"
                required
                className="rounded-lg border-border focus:border-primary focus:ring-primary/20
                           text-lg md:text-xl font-display font-medium tracking-wider py-5"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Để Phúc Tường và Ngọc Anh tiện liên hệ khi có thay đổi lịch trình
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-luxe text-[11px] text-gold-foil mb-2">
                  Số lượng người tham dự <span className="text-primary">*</span>
                </label>
                <select
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground font-serif-elegant"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} người
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-luxe text-[11px] text-gold-foil mb-2">
                  Khách của <span className="text-primary">*</span>
                </label>
                <select
                  name="guestType"
                  value={formData.guestType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-card focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground font-serif-elegant"
                >
                  <option value="groom-family">Nhà trai</option>
                  <option value="bride-family">Nhà gái</option>
                  <option value="friend">Bạn bè</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-luxe text-[11px] text-gold-foil mb-2">
                Lời nhắn thêm (tùy chọn)
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Để lại lời chúc hoặc thông tin thêm..."
                className="rounded-lg border-border focus:border-primary focus:ring-primary/20 resize-none"
                rows={4}
              />
            </div>

            <div className="wing-hover">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-luxe text-xs py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Xác nhận tham dự
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div
                className="relative rounded-2xl bg-gradient-to-br from-secondary/40 via-muted to-secondary/30
                           border border-accent/30 px-5 py-5 md:px-6 md:py-6 text-center shadow-sm"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2
                                 bg-primary text-primary-foreground rounded-full px-4 py-1
                                 font-luxe text-[11px] tracking-[0.18em] whitespace-nowrap
                                 shadow-md border border-primary/40">
                  Người điều phối
                </span>
                <p className="font-serif-elegant text-sm text-muted-foreground mt-1 mb-2">
                  Cần hỗ trợ? Vui lòng liên hệ:
                </p>
                <p className="font-display text-foreground text-lg md:text-xl font-medium mb-1">
                  Ms. Hạnh
                </p>
                <p className="font-luxe text-[11px] text-muted-foreground mb-3">
                  Ban tổ chức
                </p>
                <a
                  href="tel:0936225918"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5
                             rounded-full bg-card border-2 border-primary
                             font-display text-primary text-xl md:text-2xl font-semibold tracking-wider
                             hover:bg-primary hover:text-primary-foreground transition-all duration-300
                             shadow-sm hover:shadow-md"
                  aria-label="Gọi điện cho Ms. Hạnh"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  0936 225 918
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="bg-card border-border">
          <AlertDialogTitle className="font-display text-2xl text-primary font-medium">
            Xác nhận thông tin
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            <p className="mb-3">Bạn sắp xác nhận tham dự:</p>
            <div className="bg-muted p-4 rounded-lg space-y-2 text-sm text-foreground">
              <p>
                <span className="font-semibold">Tên:</span> {formData.fullName}
              </p>
              <p>
                <span className="font-semibold">Số điện thoại:</span> {formData.phone}
              </p>
              <p>
                <span className="font-semibold">Số người:</span>{' '}
                {formData.numberOfGuests}
              </p>
            </div>
            <p className="mt-3">Thông tin này có chính xác không?</p>
            <div className="mt-4 border-t border-border pt-4">
              <div className="rounded-xl bg-secondary/30 border border-accent/30 px-4 py-3 text-center">
                <p className="font-luxe text-[10px] text-gold-foil mb-1">Người điều phối</p>
                <p className="font-display text-foreground text-base font-medium">Ms. Hạnh · Ban tổ chức</p>
                <a
                  href="tel:0936225918"
                  className="inline-block mt-1 font-display text-primary text-lg md:text-xl font-semibold tracking-wider hover:underline"
                >
                  0936 225 918
                </a>
              </div>
            </div>
            {errorMsg && (
              <p className="mt-2 text-destructive text-sm">{errorMsg}</p>
            )}
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => setShowConfirmation(false)}
              className="bg-muted text-foreground hover:bg-muted/80"
              disabled={submitting}
            >
              Chỉnh sửa
            </Button>
            <AlertDialogAction
              onClick={handleConfirm}
              disabled={submitting}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-luxe text-xs"
            >
              {submitting ? 'Đang gửi…' : 'Xác nhận'}
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
