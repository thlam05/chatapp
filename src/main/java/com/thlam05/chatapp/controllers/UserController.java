package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.NotificationRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.NotificationResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.services.NotificationService;
import com.thlam05.chatapp.services.UserService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    UserService userService;

    NotificationService notificationService;

    @GetMapping()
    public ApiResponse<List<UserResponse>> getAllUsers() {
        List<UserResponse> listUsers = userService.getAllUsers();

        ApiResponse<List<UserResponse>> apiResponse = new ApiResponse<>(listUsers);
        return apiResponse;
    }

    @PostMapping("/{userId}/notifications")
    public ApiResponse<NotificationResponse> createNotification(@PathVariable String userId,
            @RequestBody NotificationRequest notificationRequest) {
        NotificationResponse notificationResponse = notificationService.createNotification(userId, notificationRequest);

        ApiResponse<NotificationResponse> apiResponse = new ApiResponse<>(notificationResponse);

        return apiResponse;
    }

}
