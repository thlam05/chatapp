package com.thlam05.chatapp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.response.NotificationResponse;
import com.thlam05.chatapp.mappers.NotificationMapper;
import com.thlam05.chatapp.models.Notification;
import com.thlam05.chatapp.repositories.NotificationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationService {
    NotificationRepository notificationRepository;

    NotificationMapper notificationMapper;

    public List<NotificationResponse> getAllNotifications() {
        List<Notification> list = notificationRepository.findAll();

        return notificationMapper.toListNotificationResponses(list);
    }
}
