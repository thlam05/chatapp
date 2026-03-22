package com.thlam05.chatapp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.request.UserFriendRequest;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.dto.response.CreateUserFriendResponse;
import com.thlam05.chatapp.dto.response.UserFriendResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.mappers.UserFriendMapper;
import com.thlam05.chatapp.mappers.UserMapper;
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
    UserMapper userMapper;

    public List<UserFriendResponse> getAllUserFriends() {
        List<UserFriends> list = userFriendsRepository.findAll();

        return userFriendMapper.toListUserFriendResponses(list);
    }

    public List<UserFriendResponse> getListFriendsOfUser(String userId) {
        List<UserFriends> list = userFriendsRepository.findFriends(userId);

        List<UserFriendResponse> listResponses = list.stream().map(uf -> {
            User friend = uf.getUser().getId().equals(userId)
                    ? uf.getFriend()
                    : uf.getFriend();

            return UserFriendResponse.builder()
                    .user(userMapper.toUserResponse(friend))
                    .status(uf.getStatus())
                    .createdAt(uf.getCreatedAt())
                    .updatedAt(uf.getUpdatedAt())
                    .build();
        }).toList();

        return listResponses;
    }

    public CreateUserFriendResponse createUserFriend(String userId, String friendId,
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

    public CreateUserFriendResponse updateUserFriends(String userId, String friendId,
            UserFriendRequest userFriendRequest) {
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

    public CountResponse countTotalFriendsByUser(String userId) {
        Long count = userFriendsRepository.countTotalFriendsByUser(userId);

        return new CountResponse(count);
    }
}
