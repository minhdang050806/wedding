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
        ? `Khác — ${formData.transportOther.trim()}`
        : 'Khác'
      : formData.transport === 'family' && formData.pickupLocation
      ? `${TRANSPORT_LABELS.family} · ${PICKUP_LOCATION_LABELS[formData.pickupLocation] ?? formData.pickupLocation}`
      : TRANSPORT_LABELS[formData.transport] ?? '';

  if (existing && !isEditing) {
    return (
      <section id="rsvp" className="w-full py-12 md:py-14 lg:py-16 px-4 bg-background lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <div className="font-luxe text-gold-foil text-[11px] md:text-xs mb-4">
              Đã xác nhận tham dự
            </div>
            <h2 className="font-script text-shimmer text-6xl md:text-7xl mb-4">
              Cảm ơn {existing.guestSalutation || ''}{' '}
              {existing.guestName || existing.fullName}!
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-px w-12 bg-accent/40" />
              <span className="text-accent text-xl">❦</span>
              <span className="h-px w-12 bg-accent/40" />
            </div>
            <p className="font-display italic text-lg text-muted-foreground max-w-xl mx-auto">
              Sự xác nhận của {existing.guestSalutation || 'bạn'} là niềm vinh hạnh lớn
              lao của chúng tôi. Hẹn gặp trong ngày trọng đại!
            </p>
          </div>

          <div className="relative bg-white rounded-3xl card-glow border border-secondary/40 p-8 md:p-10 overflow-hidden">
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
                    ? `Khác — ${existing.transportOther || ''}`
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
                             font-luxe text-[11px] text-muted-foreground border border-border
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
    <section id="rsvp" className="w-full py-20 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="font-luxe text-gold-foil text-[11px] md:text-xs mb-4">
            Phần đăng ký khách mời
          </div>
          <h2 className="font-script text-shimmer text-6xl md:text-7xl mb-4">
            Xác nhận tham dự
          </h2>
          <p className="font-display italic text-lg text-muted-foreground">
            Vui lòng điền form dưới đây để chúng tôi chuẩn bị tốt nhất cho ngày vui
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 md:p-10"
        >
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Họ và tên <span className="text-primary">*</span>
              </label>
              <Input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Nhập họ và tên của bạn"
                required
                className="rounded-lg border-secondary/30 focus:border-primary focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Số điện thoại <span className="text-primary">*</span>
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Nhập số điện thoại của bạn"
                required
                className="rounded-lg border-secondary/30 focus:border-primary focus:ring-primary/20"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Số lượng người tham dự <span className="text-primary">*</span>
                </label>
                <select
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} người
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Khách của <span className="text-primary">*</span>
                </label>
                <select
                  name="guestType"
                  value={formData.guestType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-secondary/30 focus:border-primary focus:ring-2 focus:ring-primary/20 text-foreground"
                >
                  <option value="groom-family">Nhà trai</option>
                  <option value="bride-family">Nhà gái</option>
                  <option value="friend">Bạn bè</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Khách đến địa điểm như thế nào? <span className="text-primary">*</span>
              </label>
              <div className="space-y-2">
                {TRANSPORT_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all
                                ${
                                  formData.transport === opt.value
                                    ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                    : 'border-secondary/30 hover:border-primary/40 hover:bg-secondary/10'
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
                    className="rounded-lg border-secondary/30 focus:border-primary focus:ring-primary/20"
                  />
                </div>
              )}
              {formData.transport === 'family' && (
                <div className="mt-4 animate-fade-in">
                  <p className="text-sm font-semibold text-foreground mb-2">
                    Điểm đón <span className="text-primary">*</span>
                  </p>
                  <div className="space-y-2">
                    {PICKUP_LOCATION_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all
                                    ${
                                      formData.pickupLocation === opt.value
                                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                                        : 'border-secondary/30 hover:border-primary/40 hover:bg-secondary/10'
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
              <label className="block text-sm font-semibold text-foreground mb-2">
                Lời nhắn thêm (tùy chọn)
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Để lại lời chúc hoặc thông tin thêm..."
                className="rounded-lg border-secondary/30 focus:border-primary focus:ring-primary/20 resize-none"
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
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {isEditing ? 'Cập nhật xác nhận' : 'Xác nhận tham dự'}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="bg-white border-secondary/20">
          <AlertDialogTitle className="font-playfair text-2xl text-primary">
            Xác nhận thông tin
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            <p className="mb-3">Bạn sắp xác nhận tham dự:</p>
            <div className="bg-secondary/10 p-4 rounded-lg space-y-2 text-sm text-foreground">
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
            <div className="mt-3 text-xs text-muted-foreground border-t border-secondary/30 pt-3 space-y-0.5">
              <p>Nếu cần hỗ trợ, liên hệ ban tổ chức:</p>
              <p className="font-semibold text-foreground/80">Ms. Hạnh — BAN TỔ CHỨC</p>
              <p>
                <a href="tel:0936225918" className="font-semibold text-primary hover:underline">
                  0936 225 918
                </a>
              </p>
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
              className="bg-primary hover:bg-primary/90 text-white"
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
      <span className="font-luxe text-[10px] text-gold-foil whitespace-nowrap">
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
