package com.thlam05.chatapp.services;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.response.LoginResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.mappers.UserMapper;
import com.thlam05.chatapp.models.User;
import com.thlam05.chatapp.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthService {
    UserRepository userRepository;
    JwtService jwtService;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;

    public LoginResponse handleLogin(String username, String password) {
        User user = userRepository.findByUsername(username).orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        boolean authenticated = passwordEncoder.matches(password, user.getPassword());

        if (!authenticated)
            throw new AppException(ResponseCode.BAD_LOGIN_REQUEST);

        String token = jwtService.generateToken(user);

        return LoginResponse.builder()
                .authenticated(authenticated)
                .token(token)
                .build();
    }

    public UserResponse handleRegister(String username, String password) {
        userRepository.findByUsername(username)
                .ifPresent(user -> {
                    throw new AppException(ResponseCode.USER_ALREADY_EXISTS);
                });

        String passwordEncoded = passwordEncoder.encode(password);

        User user = User.builder()
                .username(username)
                .password(passwordEncoded)
                .build();

        user = userRepository.save(user);

        return userMapper.toUserResponse(user);
    }

    public UserResponse getAuthenticatedUser() {
        var context = SecurityContextHolder.getContext();
        String id = context.getAuthentication().getName();

        User user = userRepository.findById(id).orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        return userMapper.toUserResponse(user);
    }
}
