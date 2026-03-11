package com.thlam05.chatapp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.request.UserFriendRequest;
import com.thlam05.chatapp.dto.response.UserFriendResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.mappers.UserFriendMapper;
import com.thlam05.chatapp.models.User;
import com.thlam05.chatapp.models.UserFriends;
import com.thlam05.chatapp.repositories.UserFriendsRepository;
import com.thlam05.chatapp.repositories.UserRepository;
import com.thlam05.chatapp.types.IdUserFriends;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserFriendsService {
    UserFriendsRepository userFriendsRepository;
    UserRepository userRepository;
    UserFriendMapper userFriendMapper;

    public List<UserFriendResponse> getAllUserFriends() {
        List<UserFriends> list = userFriendsRepository.findAll();

        return userFriendMapper.toListUserFriendResponses(list);
    }

    public List<UserFriendResponse> getAllFriendsOfUser(String userId) {
        List<UserFriends> list = userFriendsRepository.findFriends(userId);

        return userFriendMapper.toListUserFriendResponses(list);
    }

    public UserFriendResponse createUserFriend(String userId, String friendId,
            UserFriendRequest createFriendRequest) {
        User user = userRepository.findById(userId).orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        User friend = userRepository.findById(friendId)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        UserFriends userFriends = UserFriends.builder()
                .id(new IdUserFriends(userId, friendId))
                .friend(friend)
                .user(user)
                .status(createFriendRequest.getStatus())
                .build();

        userFriends = userFriendsRepository.save(userFriends);

        return userFriendMapper.toUserFriendResponse(userFriends);
    }

    public UserFriendResponse updateUserFriends(String userId, String friendId, UserFriendRequest userFriendRequest) {
        UserFriends userFriends = userFriendsRepository
                .findById(new IdUserFriends(userId, friendId))
                .orElseGet(() -> userFriendsRepository
                        .findById(new IdUserFriends(friendId, userId))
                        .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND)));

        userFriends.setStatus(userFriendRequest.getStatus());

        userFriends = userFriendsRepository.save(userFriends);

        return userFriendMapper.toUserFriendResponse(userFriends);
    }

    public void deleteUserFriends(String userId, String friendId) {
        UserFriends userFriends = userFriendsRepository
                .findById(new IdUserFriends(userId, friendId))
                .orElseGet(() -> userFriendsRepository
                        .findById(new IdUserFriends(friendId, userId))
                        .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND)));

        userFriendsRepository.delete(userFriends);
    }
}
