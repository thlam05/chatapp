package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.services.ConversationService;
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

}
