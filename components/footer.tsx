'use client';

import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-16 px-4 bg-primary text-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          {/* Names */}
          <h2 className="font-playfair text-3xl font-bold mb-2">
            Lê Phúc Tường & Nguyễn Ngọc Anh
          </h2>

          {/* Decorative element */}
          <div className="flex items-center justify-center gap-2 my-6">
            <div className="h-px w-8 bg-white/30"></div>
            <Heart className="w-5 h-5 fill-white" />
            <div className="h-px w-8 bg-white/30"></div>
          </div>

          {/* Message */}
          <p className="text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
            Cảm ơn bạn đã là một phần trong ngày đặc biệt của chúng tôi. <br />
            Sự có mặt và lời chúc phúc của quý vị làm cho ngày hôm nay thêm phần ý nghĩa.
          </p>

          {/* Social or contact info */}
          <div className="flex justify-center gap-8 text-sm mb-8">
            <div>
              <p className="text-white/60 uppercase tracking-widest text-xs mb-2">Liên hệ</p>
              <p className="font-semibold">[Số điện thoại]</p>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <div>
              <p className="text-white/60 uppercase tracking-widest text-xs mb-2">Email</p>
              <p className="font-semibold">[Email]</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/20 my-8"></div>

        {/* Bottom credits */}
        <div className="text-center">
          <p className="text-white/60 text-sm">
            Một ngày đặc biệt được ghi lại với tình yêu
          </p>
          <p className="text-white/40 text-xs mt-2">
            © 2025 Lê Phúc Tường & Nguyễn Ngọc Anh. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
