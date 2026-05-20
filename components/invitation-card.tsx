'use client';

import { MapPin, Calendar, Clock } from 'lucide-react';

interface InvitationCardProps {
  guestName?: string;
}

export function InvitationCard({ guestName }: InvitationCardProps = {}) {
  const trimmed = guestName?.trim();
  const greetingTarget = trimmed || 'quý khách';
  return (
    <section className="relative w-full py-4 md:py-6 px-4 bg-romantic-gradient overflow-hidden">
      {/* Soft background ornaments */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-secondary/30 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-accent/20 blur-3xl"></div>

      <div className="relative max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl card-glow border border-secondary/40">
          {/* Photo banner */}
          <div className="relative h-64 md:h-80 img-hover rounded-t-3xl overflow-hidden">
            <img
              src="/images/wedding-2.jpg"
              alt="Phúc Tường & Ngọc Anh"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
              <p className="font-luxe text-gold-foil text-[10px] md:text-xs mb-2">
                Save the Date
              </p>
              <p
                className="font-script drop-shadow-lg tracking-wide whitespace-nowrap"
                style={{ fontSize: 'clamp(1.1rem, 3.8vw, 2.25rem)' }}
              >
                Lê Phúc Tường <span className="text-rose-gold">&amp;</span> Nguyễn Ngọc Anh
              </p>
            </div>
          </div>

          {/* Card header */}
          <div className="bg-gradient-to-r from-primary/5 via-transparent to-accent/10 px-8 py-5 text-center border-b border-secondary/30">
            <div className="font-luxe text-gold-foil text-[11px] md:text-xs mb-2">
              Trân trọng kính mời
            </div>
            <h2 className="font-script text-shimmer heading-script text-5xl md:text-6xl mb-1">
              Lễ Thành Hôn
            </h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="h-px w-6 bg-accent/40"></span>
              <span className="text-accent">❦</span>
              <span className="h-px w-6 bg-accent/40"></span>
            </div>
          </div>

          {/* Card content */}
          <div className="px-6 py-6">
            {/* Family section — each with wing-hover */}
            <div className="grid md:grid-cols-2 gap-3 mb-5 pb-5 border-b border-secondary/30">
              {[
                { title: 'Nhà Trai', father: 'Ông: Lê Tuấn Quyết', mother: 'Bà: Nguyễn Kim Cúc' },
                { title: 'Nhà Gái', father: 'Ông: Nguyễn Thế Long', mother: 'Bà: Lê Thị Hoài' },
              ].map((fam) => (
                <div key={fam.title} className="wing-hover">
                  <div className="text-center bg-white/60 rounded-2xl p-3 border border-secondary/20 transition-shadow duration-500 hover:shadow-lg">
                    <p className="font-luxe text-gold-foil text-[10px] md:text-xs mb-3">
                      {fam.title}
                    </p>
                    <div className="text-foreground/85 text-base space-y-1 font-body-elegant">
                      <p>{fam.father}</p>
                      <p>{fam.mother}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Event details */}
            <div className="space-y-2 mb-5">
              {[
                { Icon: Calendar, label: 'Ngày cưới', value: 'Chủ nhật, 07.06.2026' },
                {
                  Icon: Clock,
                  label: 'Thời gian sự kiện',
                  value: (
                    <div className="text-foreground/90 space-y-1 text-base font-body-elegant">
                      <p>• Đón khách: 14:00</p>
                      <p>• Lễ cưới: 15:00</p>
                      <p>• Tiệc thân mật: 16:30</p>
                    </div>
                  ),
                },
                {
                  Icon: MapPin,
                  label: 'Địa điểm',
                  value: (
                    <div className="text-foreground font-body-elegant">
                      <p className="text-lg font-semibold">QC Art Villa</p>
                      <p className="text-sm text-muted-foreground">
                        2FQ2+7W, Yên Bài, Huyện Ba Vì, Hà Nội
                      </p>
                    </div>
                  ),
                },
              ].map(({ Icon, label, value }, idx) => (
                <div key={idx} className="wing-hover">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/40 hover:bg-secondary/15 transition-colors duration-300 group">
                    <div className="p-2.5 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex-1">
                      <p className="font-luxe text-gold-foil text-[10px] md:text-xs mb-1">
                        {label}
                      </p>
                      {typeof value === 'string' ? (
                        <p className="text-foreground font-body-elegant text-lg">{value}</p>
                      ) : (
                        value
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent/40"></div>
              <span className="text-accent text-lg">❦</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent/40"></div>
            </div>

            {/* Message */}
            <p className="text-center text-foreground text-base md:text-lg leading-relaxed mb-5 font-serif-elegant italic font-medium">
              Trân trọng kính mời {greetingTarget} đến tham dự lễ cưới của chúng tôi.
              <br />
              Sự có mặt của {trimmed || 'quý vị'} sẽ làm cho ngày đặc biệt này thêm phần ý nghĩa.
            </p>

            {/* Action buttons */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="wing-hover">
                <a
                  href="https://maps.app.goo.gl/3973we9cFsajuSMVA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-white border-2 border-primary text-primary text-center font-luxe text-xs rounded-full hover:bg-primary hover:text-white transition-all duration-300 hover:shadow-lg"
                >
                  Xem bản đồ
                </a>
              </div>
              <div className="wing-hover">
                <a
                  href="#rsvp"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-primary via-[#8B2447] to-primary bg-[length:200%_auto] hover:bg-right text-white text-center font-luxe text-xs rounded-full transition-all duration-500 shadow-lg hover:shadow-2xl"
                >
                  Xác nhận tham dự
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
