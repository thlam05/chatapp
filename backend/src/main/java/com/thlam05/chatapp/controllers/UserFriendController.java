package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.UserFriendRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.UserFriendResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.services.UserFriendsService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
@AllArgsConstructor
@RequestMapping("/users")
public class UserFriendController {
    UserFriendsService userFriendsService;

    @GetMapping("/friends")
    public ApiResponse<List<UserFriendResponse>> getAllUserfriends() {
        List<UserFriendResponse> list = userFriendsService.getAllUserFriends();

        return new ApiResponse<>(list);
    }

    @PostMapping("/friends/{friendId}")
    public ApiResponse<UserFriendResponse> createUserFriends(@PathVariable String friendId,
            @RequestBody UserFriendRequest createFriendRequest) {
        var context = SecurityContextHolder.getContext();
        String userId = context.getAuthentication().getName();

        UserFriendResponse userFriendResponse = userFriendsService.createUserFriend(userId, friendId,
                createFriendRequest);

        return new ApiResponse<>(userFriendResponse);
    }

    @PutMapping("/{userId}/friends/{friendId}")
    public ApiResponse<UserFriendResponse> updateUserFriends(@PathVariable String userId, @PathVariable String friendId,
            @RequestBody UserFriendRequest userFriendRequest) {
        UserFriendResponse userFriendResponse = userFriendsService.updateUserFriends(userId, friendId,
                userFriendRequest);

        return new ApiResponse<>(userFriendResponse);
    }

    @DeleteMapping("/{userId}/friends/{friendId}")
    public ApiResponse<?> deleteUserFriends(@PathVariable String userId, @PathVariable String friendId) {
        userFriendsService.deleteUserFriends(userId, friendId);
        return new ApiResponse<>(ResponseCode.SUCCESS);
    }

}
