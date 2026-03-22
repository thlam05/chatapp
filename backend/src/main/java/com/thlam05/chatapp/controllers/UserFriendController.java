package com.thlam05.chatapp.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.dto.response.UserFriendResponse;
import com.thlam05.chatapp.services.UserFriendsService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class UserFriendController {
    UserFriendsService userFriendsService;

    @GetMapping("/users/{userId}/friends")
    public ApiResponse<List<UserFriendResponse>> getListFriendsOfUser(@PathVariable String userId) {
        var list = userFriendsService.getListFriendsOfUser(userId);

        return new ApiResponse<>(list);
    }

    @GetMapping("/users/{userId}/friends/count")
    public ApiResponse<CountResponse> countTotalFriendsOfUser(@PathVariable String userId) {
        CountResponse countResponse = userFriendsService.countTotalFriendsByUser(userId);

        return new ApiResponse<>(countResponse);
    }
}
