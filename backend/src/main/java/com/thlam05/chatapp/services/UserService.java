package com.thlam05.chatapp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.dto.response.UserFriendResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.mappers.UserMapper;
import com.thlam05.chatapp.models.User;
import com.thlam05.chatapp.repositories.ConversationMembersRepository;
import com.thlam05.chatapp.repositories.MessageRepository;
import com.thlam05.chatapp.repositories.UserFriendsRepository;
import com.thlam05.chatapp.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    UserRepository userRepository;
    UserFriendsRepository userFriendsRepository;
    MessageRepository messageRepository;
    ConversationMembersRepository conversationMembersRepository;

    UserMapper userMapper;

    public List<UserResponse> getAllUsers() {
        List<User> listUsers = userRepository.findAll();

        List<UserResponse> listResponses = userMapper.toListUserResponse(listUsers);

        return listResponses;
    }

    // public List<UserFriendResponse> getAllFriendOfUser(String userId) {
    // List<User> listUsers = userRepository.findAll();

    // return null;
    // }

    public CountResponse countTotalFriendsByUser(String userId) {
        Long count = userFriendsRepository.countTotalFriendsByUser(userId);

        return new CountResponse(count);
    }

    public CountResponse countTotalMessagesByUser(String userId) {
        Long count = messageRepository.countTotalMessagesByUser(userId);

        return new CountResponse(count);
    }

    public CountResponse countTotalConversationsByUser(String userId) {
        Long count = conversationMembersRepository.countTotalConversationsByUser(userId);

        return new CountResponse(count);
    }
}
