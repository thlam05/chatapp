package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.NotificationRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.NotificationResponse;
import com.thlam05.chatapp.services.NotificationService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@AllArgsConstructor
@RequestMapping("/notifications")
public class NotificationController {
    NotificationService notificationService;

    @GetMapping("")
    public ApiResponse<List<NotificationResponse>> getAllNotification() {
        List<NotificationResponse> list = notificationService.getAllNotifications();

        ApiResponse<List<NotificationResponse>> apiResponse = new ApiResponse<>(list);
        return apiResponse;
    }

    @PutMapping("/{notificationId}")
    public ApiResponse<NotificationResponse> updateNotidication(@PathVariable String notificationId,
            @RequestBody NotificationRequest notificationRequest) {
        NotificationResponse notificationResponse = notificationService.updateNotification(notificationId,
                notificationRequest);

        ApiResponse<NotificationResponse> apiResponse = new ApiResponse<>(notificationResponse);
        return apiResponse;
    }

}
