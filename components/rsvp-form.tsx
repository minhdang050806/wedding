'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog';

export function RsvpForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    numberOfGuests: '1',
    guestType: 'friend',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setSubmitted(true);
    setShowConfirmation(false);
    setFormData({
      fullName: '',
      phone: '',
      numberOfGuests: '1',
      guestType: 'friend',
      message: '',
    });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="rsvp" className="w-full py-20 px-4 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm text-primary/60 uppercase tracking-widest mb-3 font-light">
            Phần đăng ký khách mời
          </div>
          <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
            Xác nhận tham dự
          </h2>
          <p className="text-muted-foreground">
            Vui lòng điền form dưới đây để chúng tôi chuẩn bị tốt nhất cho ngày vui
          </p>
        </div>

        {/* Confirmation message */}
        {submitted && (
          <div className="mb-8 p-4 bg-primary/10 border border-primary/30 rounded-xl text-center animate-fade-in">
            <p className="text-primary font-semibold">
              ✓ Cảm ơn bạn đã xác nhận tham dự!
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Hẹn gặp bạn trong ngày vui của chúng tôi
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
          <div className="space-y-6">
            {/* Full name */}
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

            {/* Phone */}
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

            {/* Number of guests */}
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
                  {[1, 2, 3, 4, 5].map(num => (
                    <option key={num} value={num}>
                      {num} người
                    </option>
                  ))}
                </select>
              </div>

              {/* Guest type */}
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

            {/* Message */}
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

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Xác nhận tham dự
            </Button>
          </div>
        </form>
      </div>

      {/* Confirmation dialog */}
      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent className="bg-white border-secondary/20">
          <AlertDialogTitle className="font-playfair text-2xl text-primary">
            Xác nhận thông tin
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            <p className="mb-3">Bạn sắp xác nhận tham dự:</p>
            <div className="bg-secondary/10 p-4 rounded-lg space-y-2 text-sm text-foreground">
              <p><span className="font-semibold">Tên:</span> {formData.fullName}</p>
              <p><span className="font-semibold">Số điện thoại:</span> {formData.phone}</p>
              <p><span className="font-semibold">Số người:</span> {formData.numberOfGuests}</p>
            </div>
            <p className="mt-3">Thông tin này có chính xác không?</p>
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <Button
              onClick={() => setShowConfirmation(false)}
              className="bg-muted text-foreground hover:bg-muted/80"
            >
              Chỉnh sửa
            </Button>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Xác nhận
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
