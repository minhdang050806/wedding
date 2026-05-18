'use client';

import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export function GiftRegistry() {
  const [copied, setCopied] = useState(false);

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
    <section className="w-full py-20 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm text-primary/60 uppercase tracking-widest mb-3 font-light">
            Tặng quà mừng
          </div>
          <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
            Gửi quà cưới
          </h2>
          <p className="text-muted-foreground">
            Cảm ơn các bạn đã chúc phúc cho ngày vui của chúng tôi
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Bank transfer */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
            <h3 className="font-semibold text-foreground text-lg mb-6">
              Chuyển khoản qua ngân hàng
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <p className="text-xs text-primary/60 uppercase tracking-widest font-semibold mb-2">
                  Ngân hàng
                </p>
                <p className="text-foreground font-semibold">
                  {bankInfo.bank}
                </p>
              </div>

              <div>
                <p className="text-xs text-primary/60 uppercase tracking-widest font-semibold mb-2">
                  Số tài khoản
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-foreground font-mono font-semibold text-lg">
                    {bankInfo.accountNumber}
                  </p>
                  <button
                    onClick={handleCopyAccount}
                    className="p-2 rounded-lg hover:bg-secondary/20 transition-colors duration-200 text-primary"
                    title="Sao chép số tài khoản"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <p className="text-xs text-primary/60 uppercase tracking-widest font-semibold mb-2">
                  Chủ tài khoản
                </p>
                <p className="text-foreground font-semibold">
                  {bankInfo.accountHolder}
                </p>
              </div>
            </div>

            <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
              <p className="text-xs text-muted-foreground">
                💡 Gợi ý: Ghi rõ tên của bạn trong nội dung chuyển khoản để chúng tôi có thể cảm ơn bạn
              </p>
            </div>
          </div>

          {/* QR Code */}
          <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col items-center justify-center">
            <h3 className="font-semibold text-foreground text-lg mb-6">
              Mã QR chuyển khoản
            </h3>

            <div className="w-48 h-48 bg-secondary/20 rounded-lg flex items-center justify-center mb-6 border-2 border-dashed border-secondary/30">
              <div className="text-center">
                <p className="text-muted-foreground text-sm mb-2">
                  [Thêm ảnh QR chuyển khoản tại đây]
                </p>
                <p className="text-xs text-muted-foreground/60">
                  Kích thước: 200x200px
                </p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              Quét mã QR để chuyển khoản nhanh chóng
            </p>
          </div>
        </div>

        {/* Additional information */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8 text-center">
          <h3 className="font-semibold text-foreground mb-3">
            Các cách khác để tặng quà
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Ngoài việc chuyển khoản, bạn cũng có thể mang quà trực tiếp tới đám cưới hoặc liên hệ với gia đình để tìm hiểu thêm. 
            <br />
            Chúng tôi sẽ cảm ơn từng lời chúc và sự ủng hộ của bạn.
          </p>
        </div>
      </div>
    </section>
  );
}
