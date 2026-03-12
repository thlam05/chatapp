package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.NotificationRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.dto.response.NotificationResponse;
import com.thlam05.chatapp.dto.response.UserFriendResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.services.NotificationService;
import com.thlam05.chatapp.services.UserFriendsService;
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
    UserFriendsService userFriendsService;

    NotificationService notificationService;

    @GetMapping()
    public ApiResponse<List<UserResponse>> getAllUsers() {
        List<UserResponse> listUsers = userService.getAllUsers();

        ApiResponse<List<UserResponse>> apiResponse = new ApiResponse<>(listUsers);
        return apiResponse;
    }

    @GetMapping("/{userId}/friends")
    public ApiResponse<List<UserFriendResponse>> getAllFriendsOfUser(@PathVariable String userId) {
        List<UserFriendResponse> listUserFriendResponses = userFriendsService.getAllFriendsOfUser(userId);
        return new ApiResponse<>(listUserFriendResponses);
    }

    @GetMapping("/{userId}/messages/count")
    public ApiResponse<CountResponse> countTotalMessagesByUser(@PathVariable String userId) {
        CountResponse countResponse = userService.countTotalMessagesByUser(userId);

        return new ApiResponse<>(countResponse);
    }

    @GetMapping("/{userId}/friends/count")
    public ApiResponse<CountResponse> countTotalFriendsByUser(@PathVariable String userId) {
        CountResponse countResponse = userService.countTotalFriendsByUser(userId);

        return new ApiResponse<>(countResponse);
    }

    @GetMapping("{userId}/conversations/count")
    public ApiResponse<CountResponse> countTotalConversationsByUser(@PathVariable String userId) {
        CountResponse countResponse = userService.countTotalConversationsByUser(userId);

        return new ApiResponse<>(countResponse);
    }

    @PostMapping("/{userId}/notifications")
    public ApiResponse<NotificationResponse> createNotification(@PathVariable String userId,
            @RequestBody NotificationRequest notificationRequest) {
        NotificationResponse notificationResponse = notificationService.createNotification(userId, notificationRequest);

        ApiResponse<NotificationResponse> apiResponse = new ApiResponse<>(notificationResponse);

        return apiResponse;
    }

}
