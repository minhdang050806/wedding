'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function WishesSection() {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.message) {
      setFormData({ name: '', message: '' });
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="w-full py-8 md:py-10 px-4 bg-background">
      <div className="max-w-3xl mx-auto w-full">
        <div className="text-center mb-6 md:mb-8">
          <div className="font-luxe text-gold-foil text-[11px] md:text-xs mb-2">
            Sự chúc phúc
          </div>
          <h2 className="font-script text-shimmer text-5xl md:text-6xl mb-2">
            Lời chúc trực tuyến
          </h2>
          <p className="font-display italic text-base md:text-lg text-muted-foreground">
            Chia sẻ những lời chúc yêu thương của bạn
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {submitted && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl text-center animate-fade-in">
              <p className="text-primary font-semibold">✓ Cảm ơn lời chúc của bạn!</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Tên của bạn
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên của bạn"
                required
                className="rounded-lg border-secondary/30 focus:border-primary focus:ring-primary/20"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">
                Lời chúc của bạn
              </label>
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Viết lời chúc cho cô dâu chú rể..."
                required
                className="rounded-lg border-secondary/30 focus:border-primary focus:ring-primary/20 resize-none"
                rows={3}
              />
            </div>

            <div className="wing-hover">
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition-all duration-300"
              >
                Gửi lời chúc
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
