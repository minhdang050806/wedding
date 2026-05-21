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
          <div className="bg-gradient-to-r from-primary/5 via-transparent to-accent/10 px-4 sm:px-8 py-4 sm:py-5 text-center border-b border-secondary/30">
            <div className="font-luxe text-gold-foil text-[13px] md:text-sm mb-2">
              Trân trọng kính mời tham dự
            </div>
            <h2 className="font-script text-shimmer heading-script text-[2rem] sm:text-5xl md:text-6xl mb-1 whitespace-nowrap">
              Lễ Thành Hôn
            </h2>
            <div className="flex items-center justify-center gap-3 mt-2">
              <span className="h-px w-6 bg-accent/40"></span>
              <span className="text-accent">❦</span>
              <span className="h-px w-6 bg-accent/40"></span>
            </div>
          </div>

          {/* Card content — thiệp nhỏ bao trọn nội dung */}
          <div className="px-5 py-6">
            <div className="relative p-px rounded-2xl bg-gradient-to-b from-accent/55 via-accent/18 to-accent/55 shadow-[0_8px_32px_rgba(139,94,60,0.11)]">
              <div className="relative rounded-[calc(1rem-1px)] bg-gradient-to-b from-[#FFFEF9] via-[#FFF8EE] to-[#FFFEF9] overflow-hidden">
                {/* Inner fine border */}
                <div className="absolute inset-[5px] rounded-[calc(0.75rem-1px)] border border-accent/22 pointer-events-none z-10" />
                {/* Corner ornaments */}
                <span className="absolute top-4 left-4 w-7 h-7 border-t border-l border-accent/55 pointer-events-none z-20" />
                <span className="absolute top-4 right-4 w-7 h-7 border-t border-r border-accent/55 pointer-events-none z-20" />
                <span className="absolute bottom-4 left-4 w-7 h-7 border-b border-l border-accent/55 pointer-events-none z-20" />
                <span className="absolute bottom-4 right-4 w-7 h-7 border-b border-r border-accent/55 pointer-events-none z-20" />

                <div className="px-3 sm:px-8 py-5 sm:py-8 text-center">

                  {/* Gia đình */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 mb-4">
                    {[
                      { title: 'Nhà Trai', father: 'Ông Lê Tuấn Quyết', mother: 'Bà Nguyễn Kim Cúc' },
                      { title: 'Nhà Gái', father: 'Ông Nguyễn Thế Long', mother: 'Bà Lê Thị Hoài' },
                    ].map((fam) => (
                      <div key={fam.title}>
                        <p className="font-luxe text-[11px] tracking-[0.26em] text-primary mb-1">{fam.title}</p>
                        <div className="font-body-elegant text-foreground/80 text-[11px] sm:text-[15px] leading-snug space-y-0">
                          <p className="whitespace-nowrap">{fam.father}</p>
                          <p className="whitespace-nowrap">{fam.mother}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Divider />

                  {/* Ngày cưới */}
                  <div className="mb-3">
                    <p className="font-luxe text-[11px] tracking-[0.26em] text-primary mb-1">Ngày cưới</p>
                    <p className="font-body-elegant text-foreground text-[16px] sm:text-[19px] leading-snug whitespace-nowrap">
                      Chủ nhật, 07 · 06 · 2026
                    </p>
                  </div>

                  <Divider />

                  {/* Thời gian */}
                  <div className="mb-3">
                    <p className="font-luxe text-[11px] tracking-[0.26em] text-primary mb-1.5">Thời gian sự kiện</p>
                    <div className="space-y-1 font-body-elegant text-foreground/85 text-[14px] sm:text-[17px] leading-relaxed">
                      <p className="whitespace-nowrap">16:30 &nbsp;·&nbsp; Đón khách</p>
                      <p className="whitespace-nowrap">17:30 &nbsp;·&nbsp; Bắt đầu buổi lễ</p>
                      <p className="whitespace-nowrap">18:30 &nbsp;·&nbsp; Tiệc thân mật</p>
                    </div>
                  </div>

                  <Divider />

                  {/* Địa điểm */}
                  <div className="mb-4">
                    <p className="font-luxe text-[11px] tracking-[0.26em] text-primary mb-1">Địa điểm</p>
                    <div className="flex items-center justify-center gap-2 mb-0.5">
                      <MapPin className="w-4 h-4 text-primary/55 flex-shrink-0" />
                      <p className="font-body-elegant text-foreground text-[16px] sm:text-[19px] whitespace-nowrap">QC Art Villa</p>
                    </div>
                    <p className="font-body-elegant text-muted-foreground text-[13px] sm:text-[15px] leading-relaxed">
                      Yên Bài, Hà Nội
                    </p>
                  </div>

                  {/* Message */}
                  <p className="font-serif-elegant text-foreground/80 text-base md:text-[17px] leading-relaxed mb-5 italic">
                    Trân trọng kính mời {greetingTarget} đến tham dự lễ cưới của Phúc Tường và Ngọc Anh.
                    Sự có mặt của {trimmed || 'quý vị'} sẽ làm cho ngày đặc biệt này thêm phần ý nghĩa.
                  </p>

                  {/* Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="wing-hover">
                      <a
                        href="https://maps.app.goo.gl/3973we9cFsajuSMVA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full px-4 py-3 bg-transparent border border-primary/60 text-primary text-center font-luxe text-[11px] rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                      >
                        Xem bản đồ
                      </a>
                    </div>
                    <div className="wing-hover">
                      <a
                        href="#rsvp"
                        className="block w-full px-4 py-3 bg-gradient-to-r from-primary via-[#6B3D2E] to-primary bg-[length:200%_auto] hover:bg-right text-primary-foreground text-center font-luxe text-[11px] rounded-full transition-all duration-500 shadow-md hover:shadow-xl"
                      >
                        Xác nhận tham dự
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-accent/35 to-accent/35" />
      <span className="text-accent/45 text-[10px]">✦</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-accent/35 to-accent/35" />
    </div>
  );
}
