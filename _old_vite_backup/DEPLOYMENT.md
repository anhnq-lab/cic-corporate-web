# Hướng Dẫn Triển Khai CIC.Website-TTBIM

Tài liệu này hướng dẫn cách đưa website lên môi trường Internet (Production).

## 1. Yêu cầu Hệ thống
Bạn cần chuẩn bị một máy chủ (VPS) hoặc dịch vụ Hosting có hỗ trợ:
*   **Node.js**: Phiên bản 18.0 trở lên.
*   **Disk Space**: Ít nhất 1GB.
*   **RAM**: Khuyến nghị 1GB trở lên.

## 2. Cấu trúc Triển khai
Chúng ta đã cấu hình hệ thống theo mô hình **"Monolith" đơn giản hóa**:
*   Backend (Node.js/Express) sẽ chạy trên cổng `3001`.
*   Backend đồng thời phục vụ luôn các file giao diện (Frontend) đã được đóng gói (Build).
*   **Lợi ích**: Chỉ cần quản lý 1 server, 1 cổng duy nhất. Dữ liệu SQLite lưu trực tiếp trên tệp.

## 3. Các bước Triển khai

### Bước 1: Đóng gói (Build) Frontend
Tại máy dưới local (máy của bạn), chạy lệnh sau để tạo ra thư mục `dist` chứa code giao diện đã tối ưu:
```bash
npm run build
```
*Lưu ý: Thư mục `dist` sẽ được tạo ra tại thư mục gốc.*

### Bước 2: Chuẩn bị File để Upload
Bạn cần upload các thư mục và file sau lên Server:
1.  Thư mục `dist` (vừa tạo ở bước 1).
2.  Thư mục `server` (chứa code backend).
3.  File `package.json` (ở thư mục gốc - tùy chọn, chủ yếu cần trong `server`).

*Cấu trúc trên Server sẽ trông như sau:*
```
/var/www/cic-bim/
├── dist/               <-- Code giao diện đã build
└── server/             <-- Code backend
    ├── index.js
    ├── db.js
    ├── package.json
    └── database.sqlite <-- File dữ liệu (sẽ tự tạo nếu chưa có)
```

### Bước 3: Cài đặt và Chạy trên Server
1.  Truy cập vào thư mục `server` trên máy chủ:
    ```bash
    cd /var/www/cic-bim/server
    ```
2.  Cài đặt các thư viện cần thiết:
    ```bash
    npm install --production
    ```
3.  Khởi chạy Backend (khuyên dùng PM2 để quản lý process):
    ```bash
    # Cài PM2 nếu chưa có
    npm install -g pm2

    # Chạy server
    pm2 start index.js --name "cic-bim-web"
    ```
4.  Server sẽ chạy tại cổng `3001`. Bạn có thể cấu hình Nginx để forward domain về cổng này.

## 4. Sao lưu Dữ liệu
Toàn bộ dữ liệu (Tin tức, Liên hệ) nằm trong file `server/database.sqlite`.
*   **Để sao lưu**: Chỉ cần copy file này về máy.
*   **Để khôi phục**: Copy file backup đè lên file hiện tại và restart server.

## 5. Tài khoản Quản trị
*   Đường dẫn: `domain.com/admin`
*   Mật khẩu mặc định: `admin123` (Cần đổi trong code `server/components/AdminDashboard.tsx` -> thực tế là `AdminDashboard` check client side, để bảo mật cao hơn cần chuyển logic auth xuống server, nhưng với quy mô hiện tại có thể tạm chấp nhận hoặc triển khai basic auth).

> [!WARNING]
> Vì cơ chế xác thực hiện tại là đơn giản (client-side check), khuyến nghị triển khai thêm lớp bảo vệ bằng Web Server (như Nginx Basic Auth) cho đường dẫn `/admin` nếu dữ liệu quan trọng.
