package com.thlam05.chatapp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.mappers.UserMapper;
import com.thlam05.chatapp.models.User;
import com.thlam05.chatapp.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    UserRepository userRepository;

    UserMapper userMapper;

    public List<UserResponse> getAllUsers() {
        List<User> listUsers = userRepository.findAll();

        List<UserResponse> listResponses = userMapper.toListUserResponse(listUsers);

        return listResponses;
    }
}
