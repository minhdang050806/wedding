'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Heart } from 'lucide-react';

interface Wish {
  id: number;
  name: string;
  message: string;
  timestamp: Date;
}

export function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      message: 'Chúc hai bạn một cuộc hôn nhân hạnh phúc, bền lâu và tràn đầy yêu thương!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    },
    {
      id: 2,
      name: 'Trần Thị B',
      message: 'Hẹn gặp hai bạn trong ngày vui. Chúc mừng!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5),
    },
    {
      id: 3,
      name: 'Phạm Văn C',
      message: 'Tình yêu là sự phấn đấu vì điều cùng hướng. Chúc hai bạn thành công!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.name && formData.message) {
      const newWish: Wish = {
        id: Math.max(...wishes.map(w => w.id), 0) + 1,
        name: formData.name,
        message: formData.message,
        timestamp: new Date(),
      };

      setWishes(prev => [newWish, ...prev]);
      setFormData({ name: '', message: '' });
      setSubmitted(true);

      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (hours < 1) return 'Vừa xong';
    if (hours < 24) return `${hours}h trước`;
    if (days < 30) return `${days} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <section className="w-full py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm text-primary/60 uppercase tracking-widest mb-3 font-light">
            Sự chúc phúc
          </div>
          <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
            Lời chúc trực tuyến
          </h2>
          <p className="text-muted-foreground">
            Chia sẻ những lời chúc yêu thương của bạn
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          {submitted && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-xl text-center animate-fade-in">
              <p className="text-primary font-semibold">
                ✓ Cảm ơn lời chúc của bạn!
              </p>
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

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-2 rounded-lg transition-all duration-300"
            >
              Gửi lời chúc
            </Button>
          </form>
        </div>

        {/* Wishes display */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground text-lg mb-6">
            {wishes.length} lời chúc
          </h3>

          {wishes.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-12 h-12 text-secondary/30 mx-auto mb-4" />
              <p className="text-muted-foreground">Hãy là người đầu tiên gửi lời chúc!</p>
            </div>
          ) : (
            wishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-fade-in"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {wish.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {formatTime(wish.timestamp)}
                    </p>
                  </div>
                  <Heart className="w-5 h-5 text-primary/30" />
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {wish.message}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
