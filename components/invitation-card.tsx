'use client';

import { MapPin } from 'lucide-react';

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
        <div className="relative bg-white rounded-3xl card-glow border border-secondary/40">
          {/* Corner ornaments */}
          <span className="absolute top-4 left-4 w-7 h-7 border-t-2 border-l-2 border-primary/20 rounded-tl-sm pointer-events-none z-10" />
          <span className="absolute top-4 right-4 w-7 h-7 border-t-2 border-r-2 border-primary/20 rounded-tr-sm pointer-events-none z-10" />
          <span className="absolute bottom-4 left-4 w-7 h-7 border-b-2 border-l-2 border-primary/20 rounded-bl-sm pointer-events-none z-10" />
          <span className="absolute bottom-4 right-4 w-7 h-7 border-b-2 border-r-2 border-primary/20 rounded-br-sm pointer-events-none z-10" />
          {/* Photo banner */}
          <div className="relative h-64 md:h-80 img-hover rounded-t-3xl overflow-hidden">
            <img
              src="/images/wedding-2.jpg"
              alt="Phúc Tường & Ngọc Anh"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 p-6 text-center text-white">
              <p className="font-luxe text-gold-foil text-[13px] md:text-sm mb-2">
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
            <div className="font-luxe text-gold-foil text-[13px] md:text-sm mb-2">
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
                  <div className="relative text-center bg-white/60 rounded-2xl p-3 border border-secondary/20 transition-shadow duration-500 hover:shadow-lg">
                    <span className="absolute top-2 left-2 w-4 h-4 border-t border-l border-accent/30 pointer-events-none" />
                    <span className="absolute top-2 right-2 w-4 h-4 border-t border-r border-accent/30 pointer-events-none" />
                    <span className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-accent/30 pointer-events-none" />
                    <span className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-accent/30 pointer-events-none" />
                    <p className="font-luxe text-gold-foil text-[13px] md:text-sm mb-3">
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

            {/* Event details — thiệp nhỏ elegant */}
            <div className="mb-5">
              {/* Gradient border wrapper */}
              <div className="relative p-px rounded-2xl bg-gradient-to-b from-accent/50 via-accent/20 to-accent/50 shadow-[0_6px_28px_rgba(139,94,60,0.10)]">
                <div className="relative rounded-[calc(1rem-1px)] bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EE] to-[#FFFDF9] overflow-hidden">
                  {/* Inner fine border */}
                  <div className="absolute inset-[5px] rounded-[calc(0.75rem-1px)] border border-accent/20 pointer-events-none z-10" />
                  {/* Corner ornaments */}
                  <span className="absolute top-[14px] left-[14px] w-6 h-6 border-t border-l border-accent/55 pointer-events-none z-20" />
                  <span className="absolute top-[14px] right-[14px] w-6 h-6 border-t border-r border-accent/55 pointer-events-none z-20" />
                  <span className="absolute bottom-[14px] left-[14px] w-6 h-6 border-b border-l border-accent/55 pointer-events-none z-20" />
                  <span className="absolute bottom-[14px] right-[14px] w-6 h-6 border-b border-r border-accent/55 pointer-events-none z-20" />

                  <div className="px-10 py-7 text-center">
                    {/* Ngày cưới */}
                    <div className="mb-5">
                      <p className="font-luxe text-[11px] tracking-[0.28em] text-accent/75 mb-2">Ngày cưới</p>
                      <p className="font-body-elegant text-foreground text-xl leading-snug">
                        Chủ nhật, 07 · 06 · 2026
                      </p>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-accent/40" />
                      <span className="text-accent/50 text-xs">✦</span>
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-accent/40 to-accent/40" />
                    </div>

                    {/* Thời gian */}
                    <div className="mb-5">
                      <p className="font-luxe text-[11px] tracking-[0.28em] text-accent/75 mb-3">Thời gian sự kiện</p>
                      <div className="space-y-2 font-body-elegant text-foreground/85 text-[17px] leading-relaxed">
                        <p>16:30 &nbsp;·&nbsp; Đón khách</p>
                        <p>17:30 &nbsp;·&nbsp; Bắt đầu buổi lễ</p>
                        <p>18:30 &nbsp;·&nbsp; Tiệc thân mật</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/40 to-accent/40" />
                      <span className="text-accent/50 text-xs">✦</span>
                      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-accent/40 to-accent/40" />
                    </div>

                    {/* Địa điểm */}
                    <div>
                      <p className="font-luxe text-[11px] tracking-[0.28em] text-accent/75 mb-2">Địa điểm</p>
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <MapPin className="w-4 h-4 text-primary/60 flex-shrink-0" />
                        <p className="font-body-elegant text-foreground text-xl">QC Art Villa</p>
                      </div>
                      <p className="font-body-elegant text-muted-foreground text-base leading-relaxed">
                        Yên Bài, Huyện Ba Vì, Hà Nội
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative line */}
            <div className="flex items-center justify-center gap-3 my-4">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-accent/40"></div>
              <span className="text-accent text-lg">❦</span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-accent/40"></div>
            </div>

            {/* Message */}
            <p className="text-center text-foreground text-base md:text-lg leading-relaxed mb-5 font-serif-elegant font-medium">
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
                  className="block w-full px-6 py-3 bg-card border-2 border-primary text-primary text-center font-luxe text-xs rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-lg"
                >
                  Xem bản đồ
                </a>
              </div>
              <div className="wing-hover">
                <a
                  href="#rsvp"
                  className="block w-full px-6 py-3 bg-gradient-to-r from-primary via-[#6B3D2E] to-primary bg-[length:200%_auto] hover:bg-right text-primary-foreground text-center font-luxe text-xs rounded-full transition-all duration-500 shadow-lg hover:shadow-2xl"
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
