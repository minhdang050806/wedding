'use client';

import { useEffect, useState } from 'react';
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
import { Heart, CheckCircle2, Pencil } from 'lucide-react';
import { ApiRsvp, PICKUP_LOCATION_LABELS, PICKUP_LOCATION_OPTIONS, TRANSPORT_LABELS, rsvpsApi } from '@/lib/api';

interface RsvpFormProps {
  guestKey?: string;
  guestSalutation?: string;
  guestName?: string;
}

const TRANSPORT_OPTIONS = [
  { value: 'self', label: TRANSPORT_LABELS.self },
  { value: 'family', label: TRANSPORT_LABELS.family },
  { value: 'other', label: TRANSPORT_LABELS.other },
];

export function RsvpForm({ guestKey, guestSalutation, guestName }: RsvpFormProps = {}) {
  const effectiveKey =
    guestKey || (guestName ? `${guestSalutation ?? ''}-${guestName}` : 'anonymous');

  const [formData, setFormData] = useState({
    fullName:
      guestSalutation && guestName ? `${guestSalutation} ${guestName}`.trim() : '',
    phone: '',
    numberOfGuests: '1',
    guestType: 'friend',
    transport: 'self',
    transportOther: '',
    pickupLocation: '',
    message: '',
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [existing, setExisting] = useState<ApiRsvp | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    rsvpsApi
      .getByKey(effectiveKey)
      .then((r) => {
        if (!cancelled && r) setExisting(r);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [effectiveKey]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'transport' && value !== 'family' ? { pickupLocation: '' } : {}),
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
      const rsvp = await rsvpsApi.upsert({
        guestKey: effectiveKey,
        guestSalutation,
        guestName,
        ...formData,
      });
      setExisting(rsvp);
      setShowConfirmation(false);
      setIsEditing(false);
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Gửi không thành công');
    } finally {
      setSubmitting(false);
    }
  };

  const transportLabel =
    formData.transport === 'other'
      ? formData.transportOther.trim()
        ? `Khác · ${formData.transportOther.trim()}`
        : 'Khác'
      : formData.transport === 'family' && formData.pickupLocation
      ? `${TRANSPORT_LABELS.family} · ${PICKUP_LOCATION_LABELS[formData.pickupLocation] ?? formData.pickupLocation}`
      : TRANSPORT_LABELS[formData.transport] ?? '';

  if (existing && !isEditing) {
    return (
      <section id="rsvp" className="w-full py-4 md:py-6 px-4 bg-background">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="font-luxe text-gold-foil text-[13px] md:text-sm mb-4">
              Đã xác nhận tham dự
            </div>
            <h2
              className="font-script text-shimmer mb-4"
              style={{ fontSize: 'clamp(2rem, 7vw, 4.5rem)' }}
            >
              Cảm ơn {existing.guestSalutation || ''}{' '}
              {existing.guestName || existing.fullName}!
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-6 bg-accent/40" />
              <span className="text-accent text-xl">❦</span>
              <span className="h-px w-6 bg-accent/40" />
            </div>
            <p className="font-display text-lg text-muted-foreground max-w-xl mx-auto">
              Sự xác nhận của {existing.guestSalutation || 'bạn'} là niềm vinh hạnh lớn
              lao của Gia đình chúng tôi. Hẹn gặp trong ngày trọng đại!
            </p>
          </div>

          <div className="relative bg-white rounded-3xl card-glow border border-secondary/40 p-8 md:p-10 overflow-hidden">
            <span className="absolute top-4 left-4 w-6 h-6 border-t border-l border-primary/20 pointer-events-none z-10" />
            <span className="absolute top-4 right-4 w-6 h-6 border-t border-r border-primary/20 pointer-events-none z-10" />
            <span className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-primary/20 pointer-events-none z-10" />
            <span className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-primary/20 pointer-events-none z-10" />
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />

            <div className="flex items-center justify-center gap-3 mb-6">
              <CheckCircle2 className="w-8 h-8 text-primary" />
              <Heart className="w-6 h-6 text-accent fill-accent/40" />
            </div>

            <div className="space-y-3 text-foreground font-body-elegant text-base max-w-md mx-auto">
              <Row label="Họ và tên" value={existing.fullName} />
              <Row label="Số điện thoại" value={existing.phone} />
              <Row label="Số người" value={`${existing.numberOfGuests} người`} />
              <Row
                label="Di chuyển"
                value={
                  existing.transport === 'other'
                    ? `Khác · ${existing.transportOther || ''}`
                    : existing.transport === 'family' && existing.pickupLocation
                    ? `${TRANSPORT_LABELS.family} · ${PICKUP_LOCATION_LABELS[existing.pickupLocation] ?? existing.pickupLocation}`
                    : TRANSPORT_LABELS[existing.transport] ?? existing.transport
                }
              />
              {existing.message && (
                <Row label="Lời nhắn" value={existing.message} multiline />
              )}
            </div>

            <div className="flex justify-center mt-8">
              <div className="wing-hover">
                <button
                  onClick={() => {
                    setFormData({
                      fullName: existing.fullName,
                      phone: existing.phone,
                      numberOfGuests: existing.numberOfGuests,
                      guestType: existing.guestType,
                      transport: existing.transport,
                      transportOther: existing.transportOther || '',
                      pickupLocation: existing.pickupLocation || '',
                      message: existing.message || '',
                    });
                    setIsEditing(true);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                             font-luxe text-[13px] text-muted-foreground border border-border
                             hover:text-primary hover:border-primary/50 transition-all"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Chỉnh sửa thông tin
                </button>
              </div>
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
            Vui lòng điền form dưới đây để Gia đình chúng tôi chuẩn bị tốt nhất cho ngày vui
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
                Để Gia đình chúng tôi tiện liên hệ khi có thay đổi lịch trình
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
                Khách đến địa điểm như thế nào? <span className="text-primary">*</span>
              </label>
              <div className="space-y-2">
                {TRANSPORT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all
                                ${
                                  formData.transport === opt.value
                                    ? 'border-primary bg-primary/5 ring-2 ring-primary/15'
                                    : 'border-border hover:border-primary/40 hover:bg-muted'
                                }`}
                  >
                    <input
                      type="radio"
                      name="transport"
                      value={opt.value}
                      checked={formData.transport === opt.value}
                      onChange={handleChange}
                      className="w-4 h-4 accent-primary"
                    />
                    <span className="text-foreground font-serif-elegant">{opt.label}</span>
                  </label>
                ))}
              </div>
              {formData.transport === 'other' && (
                <div className="mt-3 animate-fade-in">
                  <Input
                    type="text"
                    name="transportOther"
                    value={formData.transportOther}
                    onChange={handleChange}
                    placeholder="Vui lòng mô tả phương tiện hoặc cách di chuyển…"
                    required
                    className="rounded-lg border-border focus:border-primary focus:ring-primary/20"
                  />
                </div>
              )}
              {formData.transport === 'family' && (
                <div className="mt-4 animate-fade-in">
                  <p className="font-luxe text-[11px] text-gold-foil mb-2">
                    Điểm đón <span className="text-primary">*</span>
                  </p>
                  <div className="space-y-2">
                    {PICKUP_LOCATION_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all
                                    ${
                                      formData.pickupLocation === opt.value
                                        ? 'border-primary bg-primary/5 ring-2 ring-primary/15'
                                        : 'border-border hover:border-primary/40 hover:bg-muted'
                                    }`}
                      >
                        <input
                          type="radio"
                          name="pickupLocation"
                          value={opt.value}
                          checked={formData.pickupLocation === opt.value}
                          onChange={handleChange}
                          className="w-4 h-4 accent-primary"
                          required={formData.transport === 'family'}
                        />
                        <span className="text-foreground font-serif-elegant">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
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

            <div className="flex gap-3">
              {isEditing && (
                <div className="wing-hover">
                  <Button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-muted text-foreground hover:bg-muted/80"
                  >
                    Hủy
                  </Button>
                </div>
              )}
              <div className="wing-hover flex-1">
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-luxe text-xs py-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isEditing ? 'Cập nhật xác nhận' : 'Xác nhận tham dự'}
                </Button>
              </div>
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
              <p>
                <span className="font-semibold">Di chuyển:</span> {transportLabel}
              </p>
              {formData.transport === 'family' && formData.pickupLocation && (
                <p>
                  <span className="font-semibold">Điểm đón:</span>{' '}
                  {PICKUP_LOCATION_LABELS[formData.pickupLocation] ?? formData.pickupLocation}
                </p>
              )}
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

function Row({
  label,
  value,
  multiline,
}: {
  label: string;
  value: string;
  multiline?: boolean;
}) {
  return (
    <div
      className={`flex ${
        multiline ? 'flex-col gap-1' : 'justify-between gap-4'
      } pb-3 border-b border-secondary/20 last:border-0`}
    >
      <span className="font-luxe text-[13px] text-gold-foil whitespace-nowrap">
        {label}
      </span>
      <span
        className={`text-foreground ${multiline ? '' : 'text-right'} font-medium`}
      >
        {value}
      </span>
    </div>
  );
}
