# Refactor frontend ChatApp

Tài liệu tổng hợp các điểm cần cải thiện sau khi đọc mã nguồn (`src/`, `package.json`, cấu hình Vite/ESLint). Mỗi mục gồm **vấn đề / yêu cầu** và **hướng giải pháp**.

---

## 1. Lỗi cú pháp và import sai

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `src/main.jsx` | Sau `</RouterProvider>` có dấu phẩy `,` — React sẽ render thêm một text node rỗng / hành vi không mong muốn. | Xóa dấu phẩy thừa sau component. |
| `src/routes/Router.jsx` | Import `path` từ `framer-motion/client` không liên quan router và không được sử dụng. | Xóa import; nếu cần `path` cho router thì dùng API đúng của `react-router`. |

---

## 2. Phụ thuộc npm và cấu hình môi trường

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `SocketContext.jsx` vs `package.json` | Code `import { Client } from '@stomp/stompjs'` nhưng `@stomp/stompjs` **không** có trong `dependencies` — build/install có thể lỗi hoặc phụ thuộc ngẫu nhiên. | Thêm `@stomp/stompjs` vào `package.json` hoặc gỡ import nếu không dùng. |
| `SocketContext.jsx` | URL `ws://localhost:8080/ws` hardcode. | Đưa vào `config.js` / biến môi trường (ví dụ `VITE_WS_URL`) giống `VITE_BASE_API`. |

---

## 3. Socket context — API và đồng bộ React

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `SocketContext.jsx` | `value={{ client: clientRef.current, ... }}`: giá trị `client` trong context là snapshot lúc render; gán `clientRef.current` sau `activate()` **không** khiến provider re-render, nên consumer thường nhận `client === null`. | Không expose `client` trực tiếp từ ref trong value; dùng `useState` + `setClient` trong `onConnect`, hoặc expose hàm `subscribe(destination, callback)` nội bộ đọc `clientRef`, hoặc `useSyncExternalStore` nếu cần. |
| `SocketContext.jsx` | `console.log` trong production path. | Dùng flag dev hoặc logger có thể tắt. |

---

## 4. AuthContext — token, socket và xử lý lỗi

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `AuthContext.jsx` — `getUser` | Sau khi validate token, gọi `connect(token)` trong khi `token` state có thể chưa kịp cập nhật (stale closure); nên dùng token từ `localStorage` / biến `savedToken` vừa đọc. | Gọi `connect(savedToken)` thay vì `connect(token)`. |
| `AuthContext.jsx` — `getUser` | `if (!res.ok) throw new Error(...)` trong `useEffect` → promise rejection không bắt có thể gây unhandled rejection / crash trải nghiệm khi token hết hạn. | Bắt lỗi: xóa token, `setUser(null)`, không throw ra ngoài; hoặc trả về boolean và xử lý trong `useEffect`. |
| `AuthContext.jsx` | `createContext()` không có giá trị mặc định; `useAuth()` ngoài provider trả về `undefined`. | Trong `useAuth`: nếu không có context thì `throw new Error('useAuth must be used within AuthProvider')` hoặc export default context shape. |

---

## 5. Bug chức năng rõ ràng trong Chat

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `ChatPage.jsx` — `handleAddMember` | Gọi `setIsModalAddMemberOpen(false)` nhưng state này **không** tồn tại trong `ChatPage` (modal nằm trong `ChatHeader`). | Xóa dòng đó; đóng modal bằng callback từ `ChatHeader` / nâng state modal lên cha nếu cần điều khiển từ đây. |
| `ChatPage.jsx` | Destructure `client` từ `useSocket()` nhưng không dùng. | Xóa hoặc dùng cho subscribe realtime khi đã sửa `SocketContext`. |
| `ChatPage.jsx` | Import `ConfirmModal`, `AddMemberModal` không dùng ở cấp page. | Xóa import thừa. |

---

## 6. Immutability và làm sạch dữ liệu danh sách chat

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `ChatPage.jsx` — `fetchChats` | `list.map(chat => { chat.name = ...; return chat })` **mutate** object từ API. | `list.map(chat => ({ ...chat, name: computedName }))` hoặc hàm `normalizeConversation(chat, currentUserId)`. |

---

## 7. Trùng lặp UI: Chat 1-1 và nhóm

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `ChatWindow.jsx` vs `ChatGroupWindow.jsx` | Hai file gần như giống nhau; khác phần hiển thị tên người gửi. | Gộp thành một component (ví dụ `ChatConversationView`) với prop `variant="direct" \| "group"` hoặc `showSenderLabels`. |

---

## 8. Lớp gọi API (services)

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `*Service.jsx` | File chỉ chứa `fetch`, không có JSX nhưng đuôi `.jsx`. | Đổi tên `.js` hoặc gom vào `src/api/` để phản ánh đúng vai trò. |
| Tất cả services | Lặp lại: `BASE_URL`, headers `Authorization`, `Content-Type`, `res.json()`, `response.success`. | Một `apiFetch(path, { token, method, body })` hoặc wrapper kiểm tra `res.ok`, parse lỗi thống nhất, throw `ApiError` có `status` + message. |
| `ChatService.jsx` — `deleteChat` | Không kiểm tra `res.ok`; không trả về / throw rõ. | Đồng bộ với các hàm khác: check `ok`, parse body, throw hoặc return boolean. |
| `FriendService.jsx` — `deleteFriend` | Chỉ `console.log(response)`; caller không biết thất bại. | Return kết quả hoặc throw; bỏ `console.log` production. |
| `NotificationService.jsx`, `FriendService.jsx` | `console.log` debug. | Xóa hoặc gói logger dev-only. |

---

## 9. FriendPage — state, effect và so sánh

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `FriendPage.jsx` | Hai `useEffect`: một fetch, một derive `listFriends` từ `listRelationships` — logic map relationship → friend view lặp. | `useMemo` cho danh sách đã chuẩn hóa + một effect hoặc handler chỉ cho filter. |
| `FriendPage.jsx` | Dùng `==` so sánh id/status. | Ưu tiên `===` để tránh ép kiểu ngầm. |
| `FriendPage.jsx` — `handleAcceptFriend` / block / unblock | Trong `setListRelationships(prev => prev.map(item => { item.status = ...; return item }))` **mutate** phần tử. | `map` trả về object mới: `{ ...item, status: 'ACCEPTED' }`. |
| `FriendPage.jsx` | `useEffect` thứ hai thiếu `user` trong dependency (dùng `user.id` trong nhánh PENDING). | Thêm `user` vào deps hoặc derive từ `listRelationships` + `userId` ổn định. |
| `FriendPage.jsx` | Ô search không có `value`/`onChange` — không filter được. | Thêm state `searchQuery` và filter `listFriends` (hoặc `useMemo`). |

---

## 10. NotificationPage — guard và empty state

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `NotificationPage.jsx` — `useEffect` | Gọi `user.id` khi có thể `user` chưa có (nếu route không bảo vệ). | `if (!isAuthenticated \|\| !user?.id) return` trước khi fetch. |
| `NotificationPage.jsx` | `setNotifications(listNoti)` khi API trả `undefined`. | Mặc định `[]`; hiển thị empty state khi không có dữ liệu. |

---

## 11. SettingPage — xử lý lỗi không khớp với fetch

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `SettingPage.jsx` — `catch` | Dùng `err.response?.data?.message` (kiểu axios) trong khi code dùng `fetch`. | Parse `await res.json()` trong service và throw object có `message`, hoặc đọc `err.message` từ `Error` tùy chỉnh. |
| `SettingPage.jsx` — `notify` | Luôn báo "Mật khẩu đã được thay đổi" dù user chỉ đổi username. | Nội dung toast theo loại thay đổi thực tế. |

---

## 12. HomePage — dữ liệu thống kê

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `HomePage.jsx` | `getTotalMessages` / `Friends` / `Chats` có thể trả `undefined` khi `response.success` false; state hiển thị trống hoặc "undefined". | Fallback `?? 0`, try/catch và hiển thị lỗi nhẹ hoặc skeleton. |

---

## 13. Bảo vệ route và trải nghiệm chưa đăng nhập

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `Router.jsx` | `MainLayout` bọc `/`, `/chat`, `/friends`, … nhưng không kiểm tra auth — user chưa login vẫn vào được (chỉ một số API fail). | `loader` hoặc wrapper `<ProtectedRoute>` redirect `/auth/login` khi `!isAuthenticated`; có thể bọc nhóm children của layout. |
| `LoginPage.jsx` | Destructure `user` từ `useAuth` không dùng. | Xóa; optional: nếu đã login thì `navigate('/')`. |
| `LoginPage.jsx` | Không hiển thị lỗi khi `login` throw hoặc trả `false`. | State `error`, try/catch, hiển thị message từ API. |

---

## 14. MainLayout — biến không dùng

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| `MainLayout.jsx` | `isNavigating` được tính nhưng không dùng (có `GlobalSpinner` trong project). | Hoặc truyền vào `GlobalSpinner`/overlay khi chuyển trang, hoặc xóa code thừa. |

---

## 15. Thống nhất import router

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| Nhiều file | Xen kẽ `react-router` và `react-router-dom` cho `useNavigate`, `Link`, `Outlet`. | Với React Router v6+, thống nhất một nơi import theo doc dự án (thường `react-router-dom` re-export đủ cho app browser). |

---

## 16. i18n và copy UI

| Vị trí | Yêu cầu | Giải pháp |
|--------|---------|-----------|
| Toàn app | Chuỗi tiếng Anh ("Dashboard", "Create") và tiếng Việt ("Chọn một cuộc trò chuyện", toast) lẫn lộn. | Chọn một ngôn ngữ mặc định cho MVP hoặc thêm `react-i18next` / file `locales/` nếu cần đa ngôn ngữ. |

---

## 17. Kiểm thử và chất lượng (tùy chọn nhưng nên có)

| Yêu cầu | Giải pháp |
|---------|-----------|
| Không thấy test unit/e2e. | Thêm Vitest + Testing Library cho hooks (`useAuth` mock), và/hoặc test tích hợp nhỏ cho `api` wrapper. |
| ESLint `no-unused-vars` có thể bỏ sót destructuring chỉ để lấy một phần. | Chạy `npm run lint` trong CI; dần sửa cảnh báo. |

---

## Thứ tự ưu tiên gợi ý

1. **Sửa lỗi**: `main.jsx` (phẩy), `Router.jsx` (import), `ChatPage` `setIsModalAddMemberOpen`, dependency `@stomp/stompjs`, `getUser` + `connect(token)`.
2. **Ổn định dữ liệu**: immutability (`ChatPage`, `FriendPage`), guard `NotificationPage` / `HomePage` fallback.
3. **Kiến trúc**: `api` layer chung, sửa `SocketContext` expose client, gộp `ChatWindow`/`ChatGroupWindow`.
4. **Sản phẩm**: protected routes, login errors, search friends, dọn `console.log`.

---

*Tài liệu phản ánh trạng thái codebase tại thời điểm rà soát; sau khi refactor nên cập nhật lại mục tương ứng.*
