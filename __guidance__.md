# 📋 Mô Tả Chi Tiết Trang Thiệp Cưới Online
## Minh Hiếu & Hương Trà — nhacohy.vn

> **URL:** https://www.nhacohy.vn/minh-hieu-huong-tra  
> **Nền tảng:** Ladipage (landing page builder)  
> **Dịch vụ thiệp:** Nhà Có Hỷ (nhacohyonline)  
> **Loại thiệp:** Thiệp cưới điện tử / Online wedding invitation  

---

## 1. TỔNG QUAN THIẾT KẾ

### 1.1 Phong cách chủ đạo
Trang thiệp theo phong cách **Elegant Romantic** — lãng mạn, thanh lịch, nhẹ nhàng. Không có yếu tố nặng nề hay rườm rà. Toàn bộ thiết kế hướng đến cảm giác ấm áp, tình cảm, và sang trọng vừa phải — phù hợp với thẩm mỹ hiện đại của cặp đôi trẻ Hà Nội.

### 1.2 Tone màu
Dựa trên tên file logo (`beige-and-brown-elegant-initials-wedding-logo`), bảng màu chủ đạo là:

| Màu | Vai trò |
|-----|---------|
| **Beige / Kem sữa** (`#F5EFE6`, `#EFE3D0`) | Màu nền chủ đạo, tạo cảm giác ấm |
| **Nâu đất / Nâu cà phê** (`#7B5E4A`, `#5C3D2E`) | Màu chữ tiêu đề, icon, đường kẻ |
| **Trắng ngà** (`#FFFDF8`) | Nền card, popup, phần xen kẽ |
| **Vàng gold nhạt** | Điểm nhấn trang trí, viền, chữ monogram |
| **Nâu tối** | Chữ body text |

Toàn bộ palette tạo ra cảm giác **ấm áp, vintage nhẹ, không quá sặc sỡ** — rất phổ biến trong thiệp cưới cao cấp phong cách Việt hiện đại.

### 1.3 Bố cục tổng thể
Trang thiết kế theo dạng **single-page scroll dọc** (cuộn từ trên xuống), responsive cho cả mobile và desktop. Trên mobile, toàn bộ nội dung xếp chồng theo chiều dọc, chiều rộng ~100vw. Các section phân chia bằng khoảng trống lớn hoặc đường viền trang trí.

---

## 2. CÁC PHẦN / SECTION CHI TIẾT

---

### 🎵 PHẦN 0 — Nút Nhạc Nền (Floating, cố định góc màn hình)

**Vị trí:** Góc dưới bên phải màn hình, fixed position (luôn hiển thị khi scroll)

**Nội dung:**
- Một nút tròn nhỏ có icon **Play / Pause** đổi qua lại
- Nhạc nền: **"Một Đời"** — 14 Casper & Bon Nghiêm (file MP3 host trên jsDelivr CDN)
- Icon thiết kế bởi Freepik (Flaticon)

**Thiết kế nút:**
- Hình tròn, nền màu nâu kem hoặc trắng ngà
- Icon play/pause tối màu, đơn giản
- Có thể có hiệu ứng pulse/ripple nhẹ khi đang phát nhạc

**Chức năng:** Click để bật/tắt nhạc nền. Nhạc có thể tự phát khi tải trang (autoplay, tùy trình duyệt).

---

### 🌸 PHẦN 1 — Hero Section (Màn hình đầu tiên)

**Bố cục:** Toàn màn hình (100vh), căn giữa hoàn toàn theo chiều ngang và dọc

**Hình ảnh nền:**
- Ảnh chụp đôi uyên ương (OG image: `211-tra-hieu16440-20260308043328--d1--.jpg`)
- Có thể là ảnh couple chụp studio hoặc ngoại cảnh, tông màu ấm
- Có lớp overlay nhẹ (màu beige hoặc trắng mờ ~30–40% opacity) phủ lên ảnh để chữ dễ đọc hơn

**Nội dung văn bản (từ trên xuống):**

1. **Monogram / Logo** — Chữ lồng ghép `M & H` hoặc `M H` kiểu chữ thư pháp (calligraphy), màu gold/nâu, đặt ở trên cùng
2. **Ký hiệu `&`** — Chữ ampersand lớn, font script/calligraphy, màu nâu vàng
3. **Tagline cảm xúc:**
   > *"Ngày đầu tiên cùng nhau sống suốt đời"*
   - Font chữ: Italic serif hoặc script mảnh, cỡ vừa
4. **Tên cô dâu chú rể:**
   - **`Minh Hiếu`** — chữ rất lớn, font serif thanh lịch hoặc calligraphy, màu nâu đậm
   - **`Hương Trà`** — tương tự, đặt dưới hoặc đối xứng
5. **Dòng phụ:**
   > *"Thư mời tham dự lễ cưới"*
   - Font nhỏ hơn, uppercase hoặc spacing rộng (letter-spacing), màu nâu nhạt

**Hiệu ứng:** Có thể có animation fade-in hoặc slide-up khi trang load

---

### 💌 PHẦN 2 — Giới Thiệu Cô Dâu & Chú Rể

**Bố cục:** 2 cột (trái: Chú rể / phải: Cô dâu) hoặc xếp dọc trên mobile

**Nội dung:**
- **Nhãn vai trò:** `Chú rể` / `Cô dâu` — chữ nhỏ, uppercase, letter-spacing rộng
- **Tên:** `minh Hiếu` / `Hương Trà` — font lớn, script hoặc serif
- Có thể có ảnh chân dung nhỏ hoặc khung trang trí hoa lá xung quanh tên

**Lời tâm sự của cặp đôi** (đặt giữa hoặc dưới phần tên):

> *"Chúng mình là những con người không hoàn hảo, nhưng đã dành cho nhau tình yêu trọn vẹn nhất. Và rồi chúng mình chọn nhau, vừa vặn để 5 năm trở thành một đời."*

- Font: Serif italic hoặc script, cỡ vừa
- Màu: Nâu trung tính
- Có thể có dấu ngoặc kép trang trí (`❝ ❞`) cỡ lớn màu beige đậm phía sau (background decorative)

---

### 👨‍👩‍👧‍👦 PHẦN 3 — Thông Tin Gia Đình Hai Bên

**Bố cục:** 2 cột song song

**Nhà Trai:**
- Bố: Nguyễn Địch Dũng
- Mẹ: Nguyễn Thúy Nga

**Nhà Gái:**
- Bố: Lê Mạnh Cường
- Mẹ: Lê Hoàng Hoa

**Thiết kế:**
- Tiêu đề `Nhà Trai` / `Nhà Gái` — font serif đậm, uppercase hoặc small caps
- Tên phụ huynh — font nhỏ hơn, bình thường
- Đường kẻ trang trí hoặc icon hoa nhỏ phân tách hai bên
- Nền section: màu trắng ngà hoặc beige nhạt hơn phần trên

---

### 📍 PHẦN 4 — Thông Tin Tiệc Cưới (Event Details)

**Đây là section quan trọng nhất về mặt thông tin, thiết kế thường nổi bật nhất**

**Bố cục:** Căn giữa, dạng card hoặc banner

**Các thông tin hiển thị:**

| Thông tin | Nội dung |
|-----------|----------|
| Địa điểm | **Khách Sạn Hacinco** |
| Địa chỉ | 110 Phố Thái Thịnh, Phường Trung Liệt, Hà Nội |
| Thời gian | **11:30** |
| Ngày | **Chủ Nhật, 29.03.2026** |
| Nút | `📍 Chỉ đường` (link Google Maps) |

**Thiết kế phần này:**
- Giờ `11:30` — chữ rất lớn (có thể là 60–80px), font serif đậm hoặc display, màu nâu đậm
- Ngày `29.03.2026` — tương tự, nổi bật
- `Chủ Nhật` — font nhỏ hơn, italic hoặc script
- Tên địa điểm — uppercase, letter-spacing rộng, màu nâu gold
- Địa chỉ — font nhỏ, màu nâu nhạt
- Nút `Chỉ đường` — styled button, có icon pin/map, màu nâu hoặc beige đậm, góc bo tròn

**Trang trí xung quanh:** Có thể có hoa lá, đường kẻ mảnh, hoặc khung viền trang trí

---

### 📅 PHẦN 5 — Lịch Tháng (Calendar)

**Bố cục:** Dạng calendar grid tháng 3/2026, căn giữa

**Chi tiết:**
- Tiêu đề: `Tháng 03 - 2026`
- Header hàng ngày: `T2 | T3 | T4 | T5 | T6 | T7 | CN`
- Grid 7 cột x ~5 hàng, hiển thị các ngày 1–31
- **Ngày 29 được highlight** — có thể khoanh tròn, đổi màu nền (nâu/gold), chữ trắng
- Font: Monospace hoặc sans-serif gọn
- Màu nền calendar: Trắng hoặc beige nhạt, có shadow card nhẹ

---

### ⏱️ PHẦN 6 — Đồng Hồ Đếm Ngược (Countdown Timer)

**Bố cục:** 4 ô số to xếp hàng ngang

```
[ 00 ]   [ 00 ]   [ 00 ]   [ 00 ]
 Ngày     Giờ     Phút    Giây
```

**Thiết kế:**
- Mỗi ô: nền tối (nâu đậm) hoặc beige đậm, chữ số màu sáng (trắng/vàng)
- Nhãn phía dưới: `Ngày / Giờ / Phút / Giây` — font nhỏ, uppercase
- Dấu phân cách `:` giữa các ô hoặc khoảng trống đều
- Số đếm ngược thời gian thực (JavaScript)
- Tiêu đề section: `Countdown` — font script hoặc serif italic

*Lưu ý: Vì đám cưới đã diễn ra ngày 29/03/2026 (đã qua), countdown hiện tại hiển thị 00:00:00:00*

---

### 🗓️ PHẦN 7 — Timeline Sự Kiện

**Bố cục:** Dạng timeline dọc hoặc ngang với các mốc thời gian

**Các mốc:**

| Giờ | Sự kiện |
|-----|---------|
| 10:00 | 🚪 Đón khách |
| 10:45 | 💍 Lễ Thành Hôn |
| 11:00 | 📸 Chụp ảnh cùng dâu rể |
| 11:30 | 🥂 Khai tiệc |
| 12:00 | 🎵 Ca nhạc |

**Thiết kế:**
- Đường dọc chạy giữa (timeline line) màu nâu nhạt hoặc gold mảnh
- Các chấm tròn nhỏ tại mỗi mốc thời gian (màu nâu hoặc gold)
- Giờ: font bold, màu nâu đậm
- Tên sự kiện: font bình thường hoặc italic
- Xen kẽ trái–phải (zigzag) trên desktop, xếp dọc một bên trên mobile

---

### 👗 PHẦN 8 — Dress Code

**Bố cục:** Section nhỏ, thường có ô màu sắc minh họa

**Nội dung:**
> *"Mặc đúng màu sắc để lên hình được đẹp hơn nha"*

**Thiết kế:**
- Tiêu đề `Dress code` — font lớn, serif hoặc script
- Các ô màu sắc (color swatches) hiển thị tone màu yêu cầu
- Theo chủ đề beige/nâu của trang → dress code có thể là tông trung tính, kem, beige, nude, hoặc màu chủ đề khác mà cặp đôi chọn
- Chú thích nhỏ bên dưới mỗi ô màu

---

### 💌 PHẦN 9 — Hộp Gửi Lời Chúc

**Bố cục:** Form đơn giản, căn giữa

**Nội dung:**
- Tiêu đề: `Gửi lời chúc` — font lớn, có icon 💌
- Input text box để nhập lời chúc
- Nút `💌 Gửi` — styled button màu nâu
- Phần hiển thị lời chúc đã gửi: `Đang tải lời chúc... 💬`
- Các lời chúc từ khách mời sẽ hiển thị theo thời gian thực (hoặc sau khi load)

**Thiết kế box:**
- Input: viền màu nâu nhạt, nền trắng ngà, font serif
- Button: nền nâu đậm, chữ trắng, góc bo tròn, hover effect nhẹ

---

### 📖 PHẦN 10 — Lời Tâm Tình "Beautiful Chapter"

**Bố cục:** Section full-width, nền có thể là màu beige đậm hơn hoặc có texture giấy

**Tiêu đề trang trí:**
```
Beautiful
  chapter
```
- Hai dòng chữ lớn, font script/calligraphy, màu nâu vàng
- Chữ `chapter` có thể nhỏ hơn và offset sang trái/phải tạo hiệu ứng visual

**Nội dung:**
> *"Mong rằng 10 năm, 20 năm hay thậm chí là 50 năm nữa, mỗi ngày bọn mình đều sẽ nhìn thấy nhau, luôn tìm thấy bình yên ở cạnh nhau, cùng nắm chặt tay đi qua mọi thăng trầm của cuộc đời. Tình yêu này sẽ được gìn giữ bằng sự thấu hiểu, bao dùng và chân thành, để mỗi ngày trôi qua tình yêu ấy sẽ càng sâu đậm."*

- Font: Serif italic, cỡ vừa
- Màu: Nâu trung tính
- Có thể có ảnh đôi uyên ương phía sau (background mờ) hoặc ảnh nhỏ đặt bên cạnh

---

### ✅ PHẦN 11 — Form Xác Nhận Tham Dự (RSVP)

**Đây là section tương tác quan trọng**

**Tiêu đề:**
> *"Mỗi lời hồi đáp của bạn chính là một niềm vui lớn đối với chúng tôi. Hãy nhấn xác nhận để cùng chung vui nhé!"*

**Nút CTA chính:**
- `GỬI LỜI NHẮN VÀ XÁC NHẬN` — nút lớn, nổi bật, nền nâu đậm hoặc gold, chữ trắng

**Form gồm 3 bước / câu hỏi:**

**1. Bạn sẽ đến chứ?**
- Radio button / Toggle button:
  - `Có, tôi sẽ đến!` ✅
  - `Xin lỗi, tôi bận mất rồi!` ❌

**2. Bạn đi bao nhiêu người?**
- Dropdown / số từ 1 → 10

**3. Bạn là khách mời của ai?**
- Lựa chọn: `Chú Rể` hoặc `Cô Dâu` (radio / toggle button)

**Thiết kế form:**
- Các câu hỏi xếp dọc, font rõ ràng
- Button chọn: kiểu pill button, outline khi chưa chọn, filled khi đã chọn
- Màu selected: nâu đậm hoặc gold
- Submit button: to, đầy màu, chữ trắng

---

### 🎁 PHẦN 12 — Hộp Mừng Cưới (Gift/Money Envelope)

**Tiêu đề:**
> *"Chúng tôi xin chân thành cảm ơn gia đình, bạn bè thân yêu vì đã đồng hành và gửi những lời chúc tốt đẹp..."*

> *"Vợ chồng mình xin cảm ơn tất cả tình cảm của mọi người ạ ♥"*

**Bố cục:** 2 cột — Nhà Trai | Nhà Gái

#### Nhà Trai:
- Ảnh QR code thanh toán (link tải về)
- Nút `Copy STK`
- Tên tài khoản: **Nguyen Minh Hieu**
- Ngân hàng: **Techcombank**
- Số tài khoản: **19033848579013**

#### Nhà Gái:
- Ảnh QR code thanh toán (link tải về)
- Nút `Copy STK`
- (Thông tin tài khoản không được công khai trong text, chỉ qua QR)

**Thiết kế:**
- Mỗi bên có card trắng ngà chứa QR code
- QR code: ảnh vuông, viền bo nhẹ
- Nút Copy STK: outline button màu nâu, hover fill
- Label `NHÀ TRAI` / `NHÀ GÁI`: uppercase, letter-spacing rộng

---

### 🙏 PHẦN 13 — Footer & Lời Cảm Ơn

**Nội dung:**
> *"Thank you!"*
> *"Cảm ơn bạn đã xác nhận tham dự! Chúng tôi rất vui và háo hức được gặp bạn trong ngày trọng đại này. Hãy cùng nhau lưu giữ những khoảnh khắc thật đẹp nhé!"*

**Thương hiệu Nhà Có Hỷ:**
- Text: `Thiệp cưới online - Nhà Có Hỷ`
- 3 icon mạng xã hội dạng tròn:
  - 🎵 TikTok: `@nhacohyonline`
  - 📘 Facebook: `thiepcuoionlinenhacohy`
  - 💬 Zalo: `0397336324`

**Thiết kế footer:**
- Nền nâu đậm hoặc tối hơn phần còn lại
- Chữ trắng hoặc kem nhạt
- Icon social media màu trắng, hover effect

---

## 3. FONT CHỮ

Trang sử dụng combination font phổ biến trong thiệp cưới Ladipage:

| Font type | Vai trò | Ví dụ |
|-----------|---------|-------|
| **Script / Calligraphy** (ví dụ: *Great Vibes*, *Dancing Script*, *Playfair Display Italic*) | Tên cô dâu chú rể, tiêu đề lãng mạn, tagline | "Minh Hiếu", "Beautiful chapter", "&" |
| **Serif thanh lịch** (ví dụ: *Cormorant Garamond*, *EB Garamond*, *Playfair Display*) | Body text, lời tâm sự, mô tả | Đoạn văn tâm tình |
| **Sans-serif gọn** (ví dụ: *Montserrat*, *Raleway*) | Thông tin logistics, label, uppercase | Địa chỉ, giờ giấc, "NHÀ TRAI" |
| **Display/Decorative** | Số giờ tiệc, ngày, countdown | "11:30", "29" |

> Ladipage thường dùng Google Fonts, các font hay xuất hiện trong template cưới: `Cormorant Garamond`, `Great Vibes`, `Montserrat`, `Playfair Display`.

---

## 4. HÌNH ẢNH VÀ ĐỒ HỌA

### Ảnh thực tế:
- **Ảnh couple chính** (OG image): Ảnh chụp của Minh Hiếu & Hương Trà, có vẻ là ảnh chụp pre-wedding hoặc studio, filename gợi ý ngày chụp 08/03/2026
- **Ảnh QR code Nhà Trai** (z7595375410745_ce35773f71e...)
- **Ảnh QR code Nhà Gái** (z7595375406997_f48d96e62d...)

### Đồ họa trang trí (điển hình với template này):
- **Hoa lá (florals):** Nhánh hoa khô, lá eucalyptus, hoa peony nhỏ — màu beige/nâu/cream, thường đặt ở góc hero section hoặc viền section
- **Đường kẻ mảnh:** Divider ngang bằng line mảnh màu gold nhạt giữa các section
- **Monogram:** Logo chữ lồng `M & H` kiểu vintage, dùng trên logo và đầu trang
- **Icon play/pause:** Từ Freepik, phong cách tối giản
- **Dấu ngoặc kép trang trí:** Cỡ rất lớn, màu beige mờ, làm background element cho quote

---

## 5. TƯƠNG TÁC & CHỨC NĂNG

| Chức năng | Mô tả |
|-----------|-------|
| **Nhạc nền** | Autoplay (nếu browser cho phép) + nút toggle play/pause |
| **Chỉ đường** | Link Google Maps đến KS Hacinco |
| **Đồng hồ đếm ngược** | JavaScript countdown đến 29/03/2026 11:30 |
| **Gửi lời chúc** | Textarea + submit, hiển thị lời chúc realtime |
| **RSVP Form** | Xác nhận tham dự, số người, khách của ai |
| **Copy STK** | Nút copy số tài khoản vào clipboard |
| **Tải QR** | Download ảnh QR mừng cưới |
| **Social links** | TikTok, Facebook, Zalo của Nhà Có Hỷ |

---

## 6. KỸ THUẬT & NỀN TẢNG

- **Nền tảng:** [Ladipage](https://ladipage.vn) — trình tạo landing page Việt Nam
- **CDN ảnh:** `w.ladicdn.com` và `static.ladipage.net`
- **CDN nhạc:** jsDelivr (GitHub-based)
- **Backend form:** Ladipage xử lý submit (RSVP + lời chúc)
- **Responsive:** Mobile-first, viewport meta tag chuẩn
- **SEO meta:** Đầy đủ OG tags cho chia sẻ Zalo/Facebook đẹp (preview ảnh + title)

---

## 7. TÓM TẮT TRẢI NGHIỆM NGƯỜI DÙNG

Khi một vị khách nhận được link thiệp qua Zalo/Facebook:

1. **Mở link** → trang load với ảnh couple, nhạc "Một Đời" tự phát (nếu được phép)
2. **Cuộn xuống** → xem tên, lời tâm sự, thông tin gia đình
3. **Xem chi tiết tiệc** → địa điểm, giờ, ngày, chỉ đường
4. **Xem đồng hồ đếm ngược** → cảm giác hồi hộp chờ ngày cưới
5. **Xem timeline** → biết lịch trình buổi tiệc
6. **Gửi lời chúc** → tương tác cá nhân với cặp đôi
7. **RSVP** → xác nhận tham dự tiện lợi
8. **Mừng cưới online** → quét QR hoặc copy STK

→ **Trải nghiệm hoàn chỉnh, không cần in thiệp vật lý**, phù hợp với thế hệ trẻ Hà Nội hiện nay.