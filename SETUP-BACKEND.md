# Cài đặt backend (Vercel KV / Upstash Redis)

Trang web dùng **Vercel KV** (Upstash Redis dưới capô) để lưu danh sách khách mời và RSVP. Dữ liệu được chia sẻ giữa mọi thiết bị, đồng bộ qua polling 5 giây.

## 1. Thêm KV vào project Vercel (1 lần, ~2 phút)

1. Vào **https://vercel.com/dashboard** → mở project wedding-website.
2. Tab **Storage** → bấm **Create Database** → chọn **Upstash → KV (Redis)**.
3. Đặt tên (vd `wedding-kv`) → chọn region gần nhất (Singapore cho Việt Nam) → **Create**.
4. Sau khi tạo xong, Vercel sẽ hỏi *"Connect to Project"* → chọn project wedding → tick cả 3 môi trường (Production / Preview / Development) → **Connect**.
5. Xong! Vercel tự thêm env vars `KV_REST_API_URL`, `KV_REST_API_TOKEN` (và các biến khác) vào project. **Không cần làm gì thêm trên Vercel.**

## 2. Re-deploy

- Push code lên git → Vercel tự build và dùng env vars mới.
- Hoặc trên dashboard: **Deployments → ... → Redeploy**.

## 3. Chạy local (tuỳ chọn)

Nếu muốn chạy `npm run dev` và **dùng chung KV** với production:

1. Cài Vercel CLI: `npm i -g vercel`
2. Trong thư mục project: `vercel link` → chọn project.
3. `vercel env pull .env.local` → kéo env vars về máy.
4. `npm run dev`.

Nếu **không** pull env vars, app vẫn chạy được nhưng dữ liệu lưu **in-memory** (reset khi restart server).

## 4. Cách hoạt động

- Tất cả guests/RSVP lưu trong 2 key Redis: `wedding:guests`, `wedding:rsvps`.
- Mỗi 5 giây, các trang web đang mở sẽ fetch lại API → cập nhật UI:
  - Trang chủ (danh sách khách + bảng xác nhận) thấy ngay khi khách mời điền form.
  - Khi 1 thiết bị thêm khách mới, các thiết bị khác thấy sau ≤ 5s.
- Free tier Upstash đủ dùng (10k requests/ngày).

## 5. Endpoints

| Method | Path                              | Mô tả                                |
| ------ | --------------------------------- | ------------------------------------ |
| GET    | `/api/guests`                     | Danh sách khách mời                  |
| POST   | `/api/guests`                     | Thêm khách `{ salutation, name }`    |
| PUT    | `/api/guests/:id`                 | Sửa khách                            |
| DELETE | `/api/guests/:id`                 | Xóa khách                            |
| GET    | `/api/rsvps`                      | Danh sách xác nhận                   |
| POST   | `/api/rsvps`                      | Upsert xác nhận theo `guestKey`      |
| DELETE | `/api/rsvps/:id`                  | Xóa xác nhận                         |
| GET    | `/api/rsvps/by-key/:guestKey`     | Lấy xác nhận của 1 khách cụ thể      |

## 6. Bảo mật (lưu ý)

Hiện tại **API public**, ai biết URL cũng có thể đọc/ghi. Cho đám cưới quy mô nhỏ, dùng URL không công khai là đủ. Nếu muốn an toàn hơn:

- Bảo vệ API bằng password đơn giản → thêm middleware kiểm tra header.
- Hoặc dùng Vercel's password protection (Pro plan).

Nói nếu muốn mình thêm tầng bảo vệ.
