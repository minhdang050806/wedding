'use client';

import { MapPin, Navigation } from 'lucide-react';

export function MapSection() {
  return (
    <section className="w-full py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-sm text-primary/60 uppercase tracking-widest mb-3 font-light">
            Địa điểm sự kiện
          </div>
          <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
            QC Art Villa
          </h2>
          <p className="text-muted-foreground">
            Nơi chúng ta sẽ tạo nên những kỷ niệm đẹp
          </p>
        </div>

        {/* Map container */}
        <div className="rounded-2xl shadow-lg overflow-hidden mb-8 h-96 bg-secondary/10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7919220885636!2d106.80217!3d10.8272303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317520892b8a0001%3A0xd5b61e0f5e8e0001!2sQC%20Art%20Villa!5e0!3m2!1svi!2sus!4v1620000000000"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Location info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Venue details */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Thông tin địa điểm
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-primary/60 text-xs uppercase tracking-widest font-semibold mb-1">
                  Tên địa điểm
                </p>
                <p className="text-foreground font-semibold">QC Art Villa</p>
              </div>

              <div>
                <p className="text-primary/60 text-xs uppercase tracking-widest font-semibold mb-1">
                  Địa chỉ
                </p>
                <p className="text-muted-foreground">
                  [Điền địa chỉ chi tiết của QC Art Villa]
                </p>
              </div>

              <div>
                <p className="text-primary/60 text-xs uppercase tracking-widest font-semibold mb-1">
                  Quận / Huyện
                </p>
                <p className="text-muted-foreground">
                  Thủ Đức, TP. Hồ Chí Minh
                </p>
              </div>

              <div>
                <p className="text-primary/60 text-xs uppercase tracking-widest font-semibold mb-1">
                  Điện thoại
                </p>
                <p className="text-muted-foreground">
                  [Số điện thoại địa điểm]
                </p>
              </div>
            </div>
          </div>

          {/* Directions */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-secondary/20">
            <h3 className="font-semibold text-foreground text-lg mb-4 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              Hướng dẫn đến venue
            </h3>

            <div className="space-y-3 text-sm text-muted-foreground leading-relaxed mb-6">
              <p>
                <span className="font-semibold text-foreground">Từ sân bay Tân Sơn Nhất:</span> Khoảng 45 phút
              </p>
              <p>
                <span className="font-semibold text-foreground">Từ trung tâm thành phố:</span> Khoảng 20 phút
              </p>
              <p>
                <span className="font-semibold text-foreground">Bãi đỗ xe:</span> Miễn phí, dung lượng lớn
              </p>
            </div>

            <a
              href="https://maps.app.goo.gl/sL7qL8waiWgfDo5s5?g_st=ic"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-3 bg-primary text-white text-center font-semibold rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Mở Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
