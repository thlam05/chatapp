package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.dto.response.UserFriendResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.services.ConversationService;
import com.thlam05.chatapp.services.UserFriendsService;
import com.thlam05.chatapp.services.UserService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserController {
    UserService userService;
    UserFriendsService userFriendsService;
    ConversationService conversationService;

    @GetMapping("")
    public ApiResponse<List<UserResponse>> getAllUser() {
        List<UserResponse> list = userService.getAllUsers();
        return new ApiResponse<>(list);
    }

    @GetMapping("/{userId}/conversations")
    public ApiResponse<List<ConversationResponse>> getListConversationsByUser(@PathVariable String userId) {
        List<ConversationResponse> list = conversationService.getAllConversationsByUser(userId);

        return new ApiResponse<>(list);
    }

    @GetMapping("/{userId}/friends")
    public ApiResponse<List<UserFriendResponse>> getListFriendsOfUser(@PathVariable String userId) {
        var list = userFriendsService.getListFriendsOfUser(userId);

        return new ApiResponse<>(list);
    }

    @GetMapping("/{userId}/messages/count")
    public ApiResponse<CountResponse> countTotalMessagesOfUser(@PathVariable String userId) {
        CountResponse countResponse = userService.countTotalMessagesByUser(userId);

        return new ApiResponse<>(countResponse);
    }

    @GetMapping("/{userId}/conversations/count")
    public ApiResponse<CountResponse> countTotalConversationsOfUser(@PathVariable String userId) {
        CountResponse countResponse = userService.countTotalConversationsByUser(userId);

        return new ApiResponse<>(countResponse);
    }

    @GetMapping("/{userId}/friends/count")
    public ApiResponse<CountResponse> countTotalFriendsOfUser(@PathVariable String userId) {
        CountResponse countResponse = userService.countTotalConversationsByUser(userId);

        return new ApiResponse<>(countResponse);
    }

}
