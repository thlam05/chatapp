package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.services.UserService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;

@RestController
@AllArgsConstructor
public class UserController {
    UserService userService;

    @GetMapping("/users")
    public ApiResponse<List<UserResponse>> getAllUser() {
        List<UserResponse> list = userService.getAllUsers();
        return new ApiResponse<>(list);
    }
}
