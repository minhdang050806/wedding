'use client';

import { MapPin, Navigation } from 'lucide-react';

const VENUE = {
  name: 'QC ART Village',
  addressLine: 'Số 30 ngõ 22, Đường Quảng Phúc 9 Yên Bài - Hà Nội',
  district: 'Yên Bài, Hà Nội, Việt Nam',
  mapsLink: 'https://maps.app.goo.gl/3973we9cFsajuSMVA',
  embedSrc:
    'https://www.google.com/maps?q=2FQ2%2B7W%2C+Y%C3%AAn+B%C3%A0i%2C+H%C3%A0+N%E1%BB%99i&output=embed',
};

export function MapSection() {
  return (
    <section className="w-full py-4 md:py-6 px-4 bg-background">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-6 md:mb-8">
          <div className="font-luxe text-gold-foil text-[13px] md:text-sm mb-2">
            Địa điểm sự kiện
          </div>
          <h2 className="font-script text-shimmer text-5xl md:text-6xl mb-2">
            {VENUE.name}
          </h2>
          <p className="font-display text-base md:text-lg text-muted-foreground">
            Nơi chúng ta sẽ tạo nên những kỷ niệm đẹp
          </p>
        </div>

        {/* Map container */}
        <div className="rounded-2xl shadow-lg overflow-hidden mb-5 md:mb-6 h-64 md:h-72 lg:h-80 bg-secondary/10">
          <iframe
            src={VENUE.embedSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`Bản đồ đến ${VENUE.name}`}
          />
        </div>

        {/* Location info */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Venue details */}
          <div className="bg-white rounded-xl p-5 card-glow">
            <h3 className="font-display text-xl md:text-2xl text-foreground mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Thông tin địa điểm
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="font-luxe text-gold-foil text-[13px] mb-1">Tên địa điểm</p>
                <p className="text-foreground font-semibold">{VENUE.name}</p>
              </div>

              <div>
                <p className="font-luxe text-gold-foil text-[13px] mb-1">Địa chỉ</p>
                <p className="text-foreground">{VENUE.addressLine}</p>
                <p className="text-muted-foreground">{VENUE.district}</p>
              </div>

              <div>
                <p className="font-luxe text-gold-foil text-[13px] mb-1">Plus Code</p>
                <p className="text-muted-foreground font-mono text-xs">2FQ2+7W Yên Bài</p>
              </div>
            </div>
          </div>

          {/* Directions */}
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-5 border border-secondary/20">
            <h3 className="font-display text-xl md:text-2xl text-foreground mb-3 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-primary" />
              Hướng dẫn đến venue
            </h3>

            <div className="space-y-2 text-sm text-muted-foreground leading-snug mb-4">
              <p>
                <span className="font-semibold text-foreground">Từ trung tâm Hà Nội:</span>{' '}
                Khoảng 1 giờ 15 phút (~60 km) theo Đại lộ Thăng Long
              </p>
              <p>
                <span className="font-semibold text-foreground">Từ sân bay Nội Bài:</span>{' '}
                Khoảng 1 giờ 30 phút (~70 km)
              </p>
            </div>

            <div className="wing-hover">
              <a
                href={VENUE.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full px-4 py-3 bg-gradient-to-r from-primary via-[#6B3D2E] to-primary bg-[length:200%_auto] hover:bg-right text-primary-foreground text-center font-luxe text-xs rounded-full transition-all duration-500 shadow-lg hover:shadow-xl"
              >
                Mở Google Maps
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
