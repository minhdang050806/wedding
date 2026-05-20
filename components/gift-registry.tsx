'use client';

import { Copy, Check, Gift } from 'lucide-react';
import { useState } from 'react';

export function GiftRegistry() {
  const [copied, setCopied] = useState(false);
  const [opened, setOpened] = useState(false);

  const bankInfo = {
    bank: 'Techcombank',
    accountNumber: '19036591005011',
    accountHolder: 'Le Phuc Tuong',
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText(bankInfo.accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full py-12 md:py-14 lg:py-16 px-4 bg-gradient-to-b from-background to-secondary/10 lg:min-h-screen lg:flex lg:flex-col lg:justify-center">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-6 md:mb-8">
          <div className="font-luxe text-gold-foil text-[13px] md:text-sm mb-2">
            Tặng quà mừng
          </div>
          <h2 className="font-script text-shimmer text-5xl md:text-6xl mb-2">
            Gửi quà cưới
          </h2>
          <p className="font-display italic text-base md:text-lg text-muted-foreground">
            Cảm ơn các bạn đã chúc phúc cho ngày vui của chúng tôi
          </p>
        </div>

        {/* Gift box reveal */}
        {!opened ? (
          <div className="flex flex-col items-center text-center mb-8 animate-fade-in-up">
            <button
              onClick={() => setOpened(true)}
              aria-label="Mở hộp quà để xem thông tin chuyển khoản"
              className="group relative outline-none"
            >
              {/* Glow */}
              <div className="absolute inset-0 -m-6 bg-accent/30 rounded-full blur-3xl group-hover:bg-accent/50 transition-all duration-500 animate-pulse" />

              {/* Box */}
              <div className="relative w-56 h-56 md:w-64 md:h-64 transition-all duration-500
                              group-hover:scale-105 group-hover:-translate-y-1
                              animate-float">
                {/* Bottom of box — wood brown */}
                <div className="absolute bottom-0 inset-x-0 h-3/4 rounded-2xl
                                bg-gradient-to-br from-[#8B5E3C] via-[#4A2F1A] to-[#8B5E3C]
                                shadow-[0_20px_50px_-10px_rgba(74,47,26,0.55)]
                                border border-[#6B3D2E]/50">
                  {/* Vertical champagne ribbon */}
                  <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-8
                                  bg-gradient-to-b from-[#E8D5B0] via-[#FFF6D6] to-[#C9A96E]
                                  shadow-lg" />
                </div>

                {/* Lid — dark chocolate */}
                <div className="absolute top-0 inset-x-0 h-1/4 rounded-xl
                                bg-gradient-to-br from-[#4A2F1A] via-[#6B3D2E] to-[#4A2F1A]
                                shadow-[0_6px_18px_rgba(74,47,26,0.45)]
                                border border-[#6B3D2E]/50
                                transition-all duration-500
                                group-hover:-translate-y-1 group-hover:rotate-[-1deg]" />

                {/* Horizontal champagne ribbon on lid */}
                <div className="absolute top-0 left-0 right-0 h-1/4 flex items-center pointer-events-none">
                  <div className="w-full h-3 bg-gradient-to-r from-[#C9A96E] via-[#FFF6D6] to-[#C9A96E] shadow" />
                </div>

                {/* Bow — gold */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2
                                w-16 h-12 flex items-center justify-center
                                transition-transform duration-500 group-hover:rotate-6">
                  <div className="absolute left-0 w-7 h-9 rounded-full
                                  bg-gradient-to-br from-[#E8D5B0] via-[#D4B896] to-[#A8854B]
                                  shadow-md rotate-[-20deg]" />
                  <div className="absolute right-0 w-7 h-9 rounded-full
                                  bg-gradient-to-bl from-[#E8D5B0] via-[#D4B896] to-[#A8854B]
                                  shadow-md rotate-[20deg]" />
                  <div className="relative z-10 w-4 h-4 rounded-full
                                  bg-gradient-to-br from-[#FFF6D6] to-[#C9A96E] shadow-inner" />
                </div>

                {/* Sparkles */}
                <span className="absolute -top-4 -left-2 text-accent text-xl animate-sparkle"
                      style={{ animationDelay: '0.2s' }}>✦</span>
                <span className="absolute -top-2 -right-4 text-primary text-lg animate-sparkle"
                      style={{ animationDelay: '0.9s' }}>✧</span>
                <span className="absolute -bottom-3 -right-2 text-accent text-sm animate-sparkle"
                      style={{ animationDelay: '1.5s' }}>✦</span>

                {/* Icon hint */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Gift className="w-10 h-10 text-[#FFF8EE]/85 drop-shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </button>

            <p className="mt-8 font-display text-2xl md:text-3xl text-shimmer italic">
              Nhấp vào hộp quà
            </p>
            <p className="mt-2 font-serif-elegant italic text-muted-foreground max-w-md">
              Bấm để mở thông tin chuyển khoản & mã QR — món quà nhỏ gửi cô dâu chú rể ✦
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 mb-8 animate-fade-in-up">
            {/* Bank transfer */}
            <div className="bg-white rounded-2xl card-glow p-8">
              <h3 className="font-display text-foreground text-2xl mb-6">
                Chuyển khoản qua ngân hàng
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="font-luxe text-gold-foil text-[13px] mb-2">Ngân hàng</p>
                  <p className="text-foreground font-semibold">{bankInfo.bank}</p>
                </div>

                <div>
                  <p className="font-luxe text-gold-foil text-[13px] mb-2">Số tài khoản</p>
                  <div className="flex items-center gap-3">
                    <p className="text-foreground font-mono font-semibold text-lg">
                      {bankInfo.accountNumber}
                    </p>
                    <button
                      onClick={handleCopyAccount}
                      className="p-2 rounded-lg hover:bg-secondary/20 transition-colors duration-200 text-primary"
                      title="Sao chép số tài khoản"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <p className="font-luxe text-gold-foil text-[13px] mb-2">Chủ tài khoản</p>
                  <p className="text-foreground font-semibold">{bankInfo.accountHolder}</p>
                </div>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-xs text-muted-foreground">
                  💡 Gợi ý: Ghi rõ tên của bạn trong nội dung chuyển khoản để chúng tôi có thể
                  cảm ơn bạn
                </p>
              </div>
            </div>

            {/* QR Code */}
            <div className="bg-white rounded-2xl card-glow p-8 flex flex-col items-center justify-center h-full">
              <h3 className="font-display text-foreground text-2xl mb-6">Mã QR chuyển khoản</h3>

              <div className="w-48 h-48 bg-secondary/20 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-secondary/30">
                <div className="text-center">
                  <p className="text-muted-foreground text-sm mb-2">
                    [Thêm ảnh QR chuyển khoản tại đây]
                  </p>
                  <p className="text-xs text-muted-foreground/60">Kích thước: 200x200px</p>
                </div>
              </div>

              <p className="font-body-elegant text-sm text-muted-foreground text-center italic">
                Quét mã QR để chuyển khoản nhanh chóng
              </p>
            </div>
          </div>
        )}

        {opened && (
          <div className="text-center mb-8">
            <div className="wing-hover inline-block">
              <button
                onClick={() => setOpened(false)}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full
                           font-luxe text-[13px] text-muted-foreground border border-border
                           hover:text-primary hover:border-primary/50 transition-all"
              >
                <Gift className="w-3.5 h-3.5" />
                Đóng hộp quà
              </button>
            </div>
          </div>
        )}

        {/* Additional information */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8 text-center">
          <h3 className="font-semibold text-foreground mb-3">Các cách khác để tặng quà</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Ngoài việc chuyển khoản, bạn cũng có thể mang quà trực tiếp tới đám cưới hoặc liên hệ
            với gia đình để tìm hiểu thêm.
            <br />
            Chúng tôi sẽ cảm ơn từng lời chúc và sự ủng hộ của bạn.
          </p>
        </div>
      </div>
    </section>
  );
}
