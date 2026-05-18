'use client';

import { MapPin, Calendar, Clock } from 'lucide-react';

export function InvitationCard() {
  return (
    <section className="w-full py-20 px-4 bg-gradient-to-b from-background to-secondary/10">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-shadow duration-500">
          {/* Card header */}
          <div className="bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 px-8 py-12 text-center border-b border-secondary/20">
            <div className="text-lg text-primary/60 mb-2 tracking-widest uppercase font-light">
              Trân trọng kính mời
            </div>
            <h2 className="font-playfair text-4xl font-bold text-primary mb-4">
              Lễ Thành Hôn
            </h2>
            <p className="text-primary text-lg font-light">
              của Lê Phúc Tường & Nguyễn Ngọc Anh
            </p>
          </div>

          {/* Card content */}
          <div className="px-8 py-12">
            {/* Family section */}
            <div className="grid md:grid-cols-2 gap-8 mb-8 pb-8 border-b border-secondary/20">
              <div className="text-center">
                <p className="text-primary text-sm uppercase tracking-widest font-semibold mb-3">
                  Nhà Trai
                </p>
                <div className="text-muted-foreground text-sm space-y-1">
                  <p>Ông: Lê Tuấn Quyết</p>
                  <p>Bà: Nguyễn Kim Cúc</p>
                </div>
              </div>
              <div className="text-center">
                <p className="text-primary text-sm uppercase tracking-widest font-semibold mb-3">
                  Nhà Gái
                </p>
                <div className="text-muted-foreground text-sm space-y-1">
                  <p>Ông: Nguyễn Thế Long</p>
                  <p>Bà: Lê Thị Hoài</p>
                </div>
              </div>
            </div>

            {/* Event details */}
            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <Calendar className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-primary/60 uppercase tracking-widest mb-1">Ngày cưới</p>
                  <p className="text-foreground font-semibold">[Điền ngày cưới]</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-primary/60 uppercase tracking-widest mb-1">Thời gian sự kiện</p>
                  <div className="text-foreground font-semibold space-y-1 text-sm">
                    <p>• Đón khách: [Điền giờ]</p>
                    <p>• Lễ cưới: [Điền giờ]</p>
                    <p>• Tiệc thân mật: [Điền giờ]</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-xs text-primary/60 uppercase tracking-widest mb-1">Địa điểm</p>
                  <p className="text-foreground font-semibold">QC Art Villa</p>
                </div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 my-8">
              <div className="flex-1 h-px bg-secondary/30"></div>
              <span className="text-primary/40 text-lg">✤</span>
              <div className="flex-1 h-px bg-secondary/30"></div>
            </div>

            {/* Message */}
            <p className="text-center text-muted-foreground text-sm leading-relaxed mb-8">
              Trân trọng kính mời quý khách đến tham dự lễ cưới của chúng tôi. Sự có mặt của quý vị sẽ làm cho ngày đặc biệt này thêm phần ý nghĩa.
            </p>

            {/* Action buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <a
                href="https://maps.app.goo.gl/sL7qL8waiWgfDo5s5?g_st=ic"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-3 bg-white border-2 border-primary text-primary text-center font-semibold rounded-full hover:bg-primary/5 transition-all duration-300 text-sm"
              >
                Xem bản đồ
              </a>
              <a
                href="#rsvp"
                className="block px-6 py-3 bg-primary text-white text-center font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
              >
                Xác nhận tham dự
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
