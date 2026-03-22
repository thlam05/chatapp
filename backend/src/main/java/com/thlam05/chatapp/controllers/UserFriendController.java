package com.thlam05.chatapp.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.UserFriendRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.dto.response.CreateUserFriendResponse;
import com.thlam05.chatapp.dto.response.UserFriendResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.services.UserFriendsService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
public class UserFriendController {
    UserFriendsService userFriendsService;

    @GetMapping("/users/{userId}/friends")
    public ApiResponse<List<UserFriendResponse>> getListFriendsOfUser(@PathVariable String userId) {
        var list = userFriendsService.getListFriendsOfUser(userId);

        return new ApiResponse<>(list);
    }

    @GetMapping("/users/{userId}/not-friends")
    public ApiResponse<List<UserResponse>> getListNotFriendsOfUser(@PathVariable String userId) {
        List<UserResponse> list = userFriendsService.getListNotFriendsOfUser(userId);

        return new ApiResponse<>(list);
    }

    @GetMapping("/users/{userId}/friends/count")
    public ApiResponse<CountResponse> countTotalFriendsOfUser(@PathVariable String userId) {
        CountResponse countResponse = userFriendsService.countTotalFriendsByUser(userId);

        return new ApiResponse<>(countResponse);
    }

    @PostMapping("/users/{userId}/friends/{friendId}")
    public ApiResponse<CreateUserFriendResponse> createFriend(@PathVariable String userId,
            @PathVariable String friendId, @RequestBody UserFriendRequest userFriendRequest) {
        CreateUserFriendResponse createUserFriendResponse = userFriendsService.createUserFriend(userId, friendId,
                userFriendRequest);

        return new ApiResponse<>(createUserFriendResponse);
    }

}
