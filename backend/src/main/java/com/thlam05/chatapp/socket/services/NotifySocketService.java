package com.thlam05.chatapp.socket.services;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.request.NotificationRequest;
import com.thlam05.chatapp.socket.payloads.NotifyMessage;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotifySocketService {
    private SimpMessagingTemplate messagingTemplate;

    public void sendNotify(NotificationRequest notification, String receiverId) {
        String des = "/topic/notifications/" + receiverId;
        messagingTemplate.convertAndSend(des, new NotifyMessage(notification));
    }

    public void sendPublicNotify(NotificationRequest notification) {
        String des = "/topic/notifications";
        messagingTemplate.convertAndSend(des, new NotifyMessage(notification));
    }
}
