package com.thlam05.chatapp.services;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.repositories.NotificationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class NotificationService {
    NotificationRepository notificationRepository;
}
