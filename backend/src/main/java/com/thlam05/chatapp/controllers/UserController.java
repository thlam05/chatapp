package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.UpdateProfileRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.services.UserService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
public class UserController {
    UserService userService;

    @GetMapping("/users")
    public ApiResponse<List<UserResponse>> getAllUser() {
        List<UserResponse> list = userService.getAllUsers();
        return new ApiResponse<>(list);
    }

    @PatchMapping("/users/{userId}")
    public ApiResponse<UserResponse> updateProfile(@PathVariable String userId,
            @RequestBody UpdateProfileRequest request) {
        UserResponse response = userService.updateProfile(userId, request);
        return new ApiResponse<>(response);
    }
}
