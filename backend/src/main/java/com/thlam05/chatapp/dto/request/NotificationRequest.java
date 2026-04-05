package com.thlam05.chatapp.dto.request;

import com.thlam05.chatapp.enums.NotificationType;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationRequest {
    String title;
    String content;
    String type;
    boolean read;

    // ==========================================
    // 1. TEMPLATES CHO NGƯỜI NHẬN (RECEIVER)
    // ==========================================
    public static class ToReceiver {

        public static NotificationRequest friendRequest(String senderName) {
            return new NotificationRequest(
                    "Lời mời kết bạn",
                    senderName + " đã gửi cho bạn một lời mời kết bạn",
                    NotificationType.INFO.toString(), false);
        }

        public static NotificationRequest acceptFriend(String actorName) {
            return new NotificationRequest(
                    "Kết bạn thành công",
                    actorName + " đã chấp nhận lời mời kết bạn của bạn",
                    NotificationType.SUCCESS.toString(), false);
        }

        public static NotificationRequest unfriend(String actorName) {
            return new NotificationRequest(
                    "Hủy kết bạn",
                    actorName + " đã hủy kết bạn với bạn",
                    NotificationType.WARNING.toString(), false);
        }

        // Lưu ý: Thông báo bị chặn thường không gửi trực tiếp để tránh xung đột
    }

    // ==========================================
    // 2. TEMPLATES CHO NGƯỜI GỬI (SENDER - Phản hồi hệ thống)
    // ==========================================
    public static class ToSender {

        public static NotificationRequest friendRequestSent(String receiverName) {
            return new NotificationRequest(
                    "Đã gửi yêu cầu",
                    "Yêu cầu kết bạn đã được gửi đến " + receiverName,
                    NotificationType.SUCCESS.toString(), false);
        }

        public static NotificationRequest acceptSuccess(String receiverName) {
            return new NotificationRequest(
                    "Đã chấp nhận",
                    "Bạn và " + receiverName + " giờ đã là bạn bè",
                    NotificationType.SUCCESS.toString(), false);
        }

        public static NotificationRequest blockSuccess(String targetName) {
            return new NotificationRequest(
                    "Đã chặn",
                    "Bạn đã chặn " + targetName + ". Hai người sẽ không thấy nhau nữa.",
                    NotificationType.DANGER.toString(), false);
        }

        public static NotificationRequest unblockSuccess(String targetName) {
            return new NotificationRequest(
                    "Đã bỏ chặn",
                    "Bạn đã bỏ chặn " + targetName,
                    NotificationType.INFO.toString(), false);
        }

        public static NotificationRequest unfriendSuccess(String targetName) {
            return new NotificationRequest(
                    "Đã hủy kết bạn",
                    "Bạn đã hủy kết bạn với " + targetName,
                    NotificationType.WARNING.toString(), false);
        }
    }
}
