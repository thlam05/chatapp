package com.thlam05.chatapp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.request.NotificationRequest;
import com.thlam05.chatapp.dto.response.NotificationResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.mappers.NotificationMapper;
import com.thlam05.chatapp.models.Notification;
import com.thlam05.chatapp.models.User;
import com.thlam05.chatapp.repositories.NotificationRepository;
import com.thlam05.chatapp.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationService {
    NotificationRepository notificationRepository;
    UserRepository userRepository;

    NotificationMapper notificationMapper;

    public List<NotificationResponse> getAllNotifications() {
        List<Notification> list = notificationRepository.findAll();

        return notificationMapper.toListNotificationResponses(list);
    }

    public NotificationResponse createNotification(String userId, NotificationRequest notificationRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));
        Notification notification = new Notification();
        notification.setTitle(notificationRequest.getTitle());
        notification.setContent(notificationRequest.getContent());
        notification.setRead(false);
        notification.setUser(user);

        notification = notificationRepository.save(notification);

        return notificationMapper.toNotificationResponse(notification);
    }

    public NotificationResponse updateNotification(String notificationId, NotificationRequest notificationRequest) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        notificationMapper.updateNotification(notificationRequest, notification);

        notification = notificationRepository.save(notification);

        return notificationMapper.toNotificationResponse(notification);
    }
}
