package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.LoginRequest;
import com.thlam05.chatapp.dto.request.RegisterRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.LoginResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.services.AuthService;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@AllArgsConstructor
public class AuthController {
    AuthService authService;

    @PostMapping("/auth/login")
    public ApiResponse<LoginResponse> handleLogin(@Valid @RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = authService.handleLogin(loginRequest.getUsername(), loginRequest.getPassword());

        ApiResponse<LoginResponse> apiResponse = new ApiResponse<>(loginResponse);

        return apiResponse;
    }

    @PostMapping("/auth/register")
    public ApiResponse<UserResponse> handleRegister(@RequestBody RegisterRequest registerRequest) {
        UserResponse userResponse = authService.handleRegister(registerRequest.getUsername(),
                registerRequest.getPassword());
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>(userResponse);
        return apiResponse;
    }

    @GetMapping("/auth/user")
    public ApiResponse<UserResponse> getAuthenticatedUser() {
        UserResponse userResponse = authService.getAuthenticatedUser();
        ApiResponse<UserResponse> apiResponse = new ApiResponse<>(userResponse);
        return apiResponse;
    }

}
