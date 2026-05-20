'use client';

import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative w-full py-10 px-4 text-white overflow-hidden">
      {/* Majestic gradient backdrop */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#8B2447] via-primary to-[#6B1B36]"></div>
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 20%, rgba(201,169,106,0.25) 0px, transparent 40%), radial-gradient(circle at 80% 80%, rgba(244,194,215,0.2) 0px, transparent 40%)',
        }}
      ></div>

      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-8">
          {/* Names — script with rose-gold gradient */}
          <h2 className="font-script text-rose-gold text-6xl md:text-7xl mb-1 leading-none">
            Phúc Tường
          </h2>
          <div className="flex items-center justify-center gap-3 my-3">
            <span className="h-px w-10 bg-white/40"></span>
            <span className="font-script text-rose-gold text-3xl">&amp;</span>
            <span className="h-px w-10 bg-white/40"></span>
          </div>
          <h2 className="font-script text-rose-gold text-6xl md:text-7xl mb-6 leading-none">
            Ngọc Anh
          </h2>

          {/* Heart divider */}
          <div className="flex items-center justify-center gap-3 my-8">
            <div className="h-px w-12 bg-white/30"></div>
            <Heart className="w-5 h-5 fill-white text-white animate-pulse-heart" />
            <div className="h-px w-12 bg-white/30"></div>
          </div>

          <p className="text-white/85 leading-relaxed max-w-2xl mx-auto mb-10 font-display italic text-xl">
            Cảm ơn bạn đã là một phần trong ngày đặc biệt của chúng tôi.
            <br />
            Sự có mặt và lời chúc phúc của quý vị làm cho ngày hôm nay thêm phần ý nghĩa.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
            <div className="wing-hover">
              <div className="px-4 py-2 text-center">
                <p className="font-luxe text-[10px] mb-2 text-white/85">Điều phối</p>
                <p className="font-body-elegant text-base">0936 225 918</p>
              </div>
            </div>
            <div className="h-12 w-px bg-white/20 self-center hidden sm:block"></div>
            <div className="wing-hover">
              <div className="px-4 py-2 text-center">
                <p className="font-luxe text-[10px] mb-2 text-white/85">Email</p>
                <p className="font-body-elegant text-base">[Email]</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-8"></div>

        <div className="text-center">
          <p className="text-white/80 text-base font-display italic">
            Một ngày đặc biệt được ghi lại với tình yêu
          </p>
          <p className="text-white/50 text-xs mt-2 font-luxe">
            © 2025 Phúc Tường &amp; Ngọc Anh · With all our love
          </p>
        </div>
      </div>
    </footer>
  );
}
