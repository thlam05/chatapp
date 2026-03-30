package com.thlam05.chatapp.services;

import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.request.UpdateProfileRequest;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.mappers.UserMapper;
import com.thlam05.chatapp.models.User;
import com.thlam05.chatapp.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    UserRepository userRepository;
    PasswordEncoder passwordEncoder;

    UserMapper userMapper;

    public List<UserResponse> getAllUsers() {
        List<User> listUsers = userRepository.findAll();

        List<UserResponse> listResponses = userMapper.toListUserResponse(listUsers);

        return listResponses;
    }

    public UserResponse updateProfile(String userId, UpdateProfileRequest request) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        if (request.getNewPassword() != null &&
                passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            String passwordEncoded = passwordEncoder.encode(request.getNewPassword());
            user.setPassword(passwordEncoded);
        }
        user.setUsername(request.getUsername());

        user = userRepository.save(user);

        return userMapper.toUserResponse(user);
    }
}
