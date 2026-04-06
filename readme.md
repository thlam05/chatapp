# ChatApp

## Tổng quan dự án

`ChatApp` là ứng dụng chat gồm 2 phần:

- `backend`: API server viết bằng Spring Boot, xử lý xác thực, người dùng, bạn bè, hội thoại, tin nhắn, thông báo và realtime socket.
- `frontend`: giao diện web viết bằng React + Vite, gọi REST API để thao tác dữ liệu và dùng STOMP qua WebSocket để nhận/cập nhật realtime.

Các nhóm chức năng thể hiện trực tiếp trong mã nguồn:

- Đăng ký/đăng nhập và lấy thông tin user hiện tại (`/auth/register`, `/auth/login`, `/auth/user`).
- Quản lý danh sách bạn bè, hội thoại, thành viên hội thoại.
- Gửi/đọc tin nhắn trong hội thoại.
- Nhận thông báo realtime.

## Tech stack sử dụng

### Backend (`backend`)

- Java 17
- Spring Boot
  - Spring Web MVC
  - Spring Data JPA
  - Spring Security + OAuth2 Resource Server (JWT Bearer)
  - Spring WebSocket (STOMP)
  - Spring Validation
- MySQL (qua `mysql-connector-j`)
- Lombok
- MapStruct
- Maven
- Docker (có `backend/dockerfile`)

### Frontend (`frontend`)

- React 19
- Vite
- React Router
- Tailwind CSS (plugin `@tailwindcss/vite`)
- STOMP client (`@stomp/stompjs`) cho realtime
- Framer Motion
- Lucide React
- ESLint
- Docker (có `frontend/dockerfile`)

## Cài đặt và chạy chương trình

## 1) Chuẩn bị

- Cài Java 17
- Cài Maven (hoặc dùng Maven Wrapper trong project backend)
- Cài Node.js (khuyến nghị bản LTS, project frontend dùng image Node 18 trong Dockerfile)
- Cài MySQL và tạo database `app_chat` (theo cấu hình hiện tại trong `.env` backend)

## 2) Cấu hình môi trường

Thực hiện theo mục **Cấu hình file `.env`** bên dưới trước khi chạy.

## 3) Chạy backend

Từ thư mục `backend`:

- Windows (PowerShell/CMD):
  - `mvnw.cmd spring-boot:run`
- Hoặc nếu đã cài Maven:
  - `mvn spring-boot:run`

Backend chạy mặc định ở cổng `8080`.

## 4) Chạy frontend

Từ thư mục `frontend`:

- Cài dependencies: `npm install`
- Chạy dev server: `npm run dev`

Frontend chạy mặc định ở cổng `5173`.

## Cấu hình file `.env`

Project hiện đang dùng trực tiếp các file:

- `backend/.env`
- `frontend/.env`

## 1) Backend `.env`

File `backend/.env` đang có các biến:

- `DB_URL`: URL kết nối MySQL (ví dụ hiện tại dùng DB `app_chat` trên localhost port 3306)
- `DB_USERNAME`: username MySQL
- `DB_PASSWORD`: password MySQL
- `SECRET_KEY`: khóa bí mật dùng ký/verify JWT

Backend đọc các biến này qua `application.yaml`:

- `spring.datasource.url` -> `${DB_URL}`
- `spring.datasource.username` -> `${DB_USERNAME}`
- `spring.datasource.password` -> `${DB_PASSWORD}`
- `jwt.secret-key` -> `${SECRET_KEY}`

Lưu ý:

- `SECRET_KEY` cần đủ mạnh để dùng cho thuật toán HS512.
- Không nên commit giá trị thật của password/secret lên remote repository.

## 2) Frontend `.env`

File `frontend/.env` đang có:

- `VITE_BASE_API=http://localhost:8080`
- `VITE_WS_API=ws://localhost:8080/ws`

Frontend đọc qua `src/configs/config.js`:

- `BASE_API` <- `VITE_BASE_API`
- `WS_API` <- `VITE_WS_API`

Lưu ý:

- Hiện tại `SocketContext` đang dùng trực tiếp URL cứng `ws://localhost:8080/ws`.
- Nếu muốn đổi môi trường realtime theo `.env`, cần cập nhật `SocketContext` để dùng `config.WS_API`.

## Kiến trúc hệ thống

## 1) Kiến trúc tổng thể

- Mô hình tách lớp `frontend` - `backend` - `database`.
- Frontend giao tiếp backend theo 2 kênh:
  - REST API (HTTP) cho CRUD/chức năng nghiệp vụ.
  - WebSocket STOMP cho realtime chat/thông báo.

## 2) Backend (Spring Boot) - kiến trúc layer

Theo cấu trúc package trong `backend/src/main/java/com/thlam05/chatapp`:

- `controllers`: REST endpoint (Auth, User, Friend, Conversation, Message, Notification).
- `services`: xử lý nghiệp vụ.
- `repositories`: truy cập dữ liệu qua Spring Data JPA.
- `models`: entity/domain model.
- `dto`: request/response object.
- `mappers`: MapStruct mapper giữa entity và DTO.
- `configs`: cấu hình bảo mật và WebSocket.
- `socket`: controller/payload/service cho STOMP messaging.
- `exceptions`, `enums`, `types`: phần hỗ trợ domain và xử lý lỗi.

Luồng xử lý chính:

- HTTP request -> Controller -> Service -> Repository -> MySQL -> map DTO -> response.
- Message realtime -> STOMP endpoint (`/ws`, prefix `/app`) -> broker (`/topic`, `/queue`, `/user`) -> client subscribe nhận dữ liệu.

## 3) Frontend (React) - tổ chức theo module

Theo cấu trúc `frontend/src`:

- `routes`: cấu hình router.
- `pages`: màn hình chính (login/register/home/chat/friends/settings/notifications).
- `components`: UI component và modal.
- `api`: hàm gọi REST API theo từng nhóm nghiệp vụ.
- `contexts`: chia sẻ state toàn cục (auth, socket, notification).
- `layouts`: layout chính của ứng dụng.
- `configs`: đọc biến môi trường.

Luồng frontend:

- Người dùng thao tác UI -> gọi API trong `api/*` -> backend.
- Với realtime, frontend kết nối STOMP và subscribe topic phù hợp để cập nhật giao diện ngay khi có sự kiện mới.

## Endpoint và realtime chính (đang có trong mã nguồn)

- Auth: `/auth/login`, `/auth/register`, `/auth/user`
- Conversation: `/conversations`, `/conversations/access`, `/conversations/{conversationId}`, ...
- Message: `/conversations/{conversationId}/messages`
- Friend: `/users/{userId}/friends`, ...
- Notification: `/notifications`, `/users/{userId}/notifications`
- WebSocket endpoint: `/ws`
- STOMP app prefix: `/app`
- Broker destinations: `/topic`, `/queue`, `/user`

## Ghi chú

- CORS backend đang cấu hình cho origin `http://localhost:5173`.
- Backend port mặc định `8080`.
- Frontend mặc định gọi API về backend ở `http://localhost:8080`.
