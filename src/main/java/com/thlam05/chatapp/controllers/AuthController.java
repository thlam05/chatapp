package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.LoginRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.LoginResponse;
import com.thlam05.chatapp.services.AuthService;

import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> handleLogin(@RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = authService.handleLogin(loginRequest.getUsername(), loginRequest.getPassword());

        ApiResponse<LoginResponse> apiResponse = new ApiResponse<>(loginResponse);

        return apiResponse;
    }

}
