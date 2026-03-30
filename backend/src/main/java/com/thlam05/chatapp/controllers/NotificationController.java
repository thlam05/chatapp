package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.NotificationRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.NotificationResponse;
import com.thlam05.chatapp.services.NotificationService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
public class NotificationController {
    NotificationService notificationService;

    @GetMapping("/notifications")
    public ApiResponse<List<NotificationResponse>> getAll() {
        List<NotificationResponse> responses = notificationService.getAllNotifications();

        return new ApiResponse<>(responses);
    }

    @GetMapping("/users/{userId}/notifications")
    public ApiResponse<List<NotificationResponse>> getNotificationByUser(@PathVariable String userId) {
        var response = notificationService.getNotificationsByUser(userId);
        return new ApiResponse<>(response);
    }

    @PostMapping("/users/{userId}/notifications")
    public ApiResponse<NotificationResponse> createNotifications(@PathVariable String userId,
            @RequestBody NotificationRequest request) {
        var response = notificationService.createNotification(userId, request);
        return new ApiResponse<>(response);
    }

    @PatchMapping("/notifications/{notificationId}")
    public ApiResponse<NotificationResponse> updateNotifications(@PathVariable String notificationId,
            @RequestBody NotificationRequest request) {
        var response = notificationService.updateNotification(notificationId, request);
        return new ApiResponse<>(response);
    }
}
