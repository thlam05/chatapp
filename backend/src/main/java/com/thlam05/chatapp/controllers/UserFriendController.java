package com.thlam05.chatapp.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.NotificationRequest;
import com.thlam05.chatapp.dto.request.UserFriendRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.dto.response.CreateUserFriendResponse;
import com.thlam05.chatapp.dto.response.UserFriendResponse;
import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.enums.FriendStatus;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.services.UserFriendsService;
import com.thlam05.chatapp.socket.services.NotifySocketService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
public class UserFriendController {
    UserFriendsService userFriendsService;

    NotifySocketService notifySocketService;

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

        notifySocketService.sendNotify(
                NotificationRequest.ToReceiver.friendRequest(createUserFriendResponse.getUser().getUsername()),
                friendId);

        notifySocketService.sendNotify(
                NotificationRequest.ToSender.friendRequestSent(createUserFriendResponse.getFriend().getUsername()),
                userId);

        return new ApiResponse<>(createUserFriendResponse);
    }

    @PatchMapping("/users/{userId}/friends/{friendId}")
    public ApiResponse<CreateUserFriendResponse> updateFriend(@PathVariable String userId,
            @PathVariable String friendId, @RequestBody UserFriendRequest userFriendRequest) {
        CreateUserFriendResponse response = userFriendsService.updateUserFriends(userId, friendId, userFriendRequest);

        String senderName;
        String receiverName;
        if (response.getUser().getId().equals(userId)) {
            senderName = response.getUser().getUsername();
            receiverName = response.getFriend().getUsername();
        } else {
            senderName = response.getFriend().getUsername();
            receiverName = response.getUser().getUsername();
        }
        if (response.getStatus().equals(FriendStatus.ACCEPTED.toString())) {
            if (userFriendRequest.getStatus().equals(FriendStatus.PENDING.toString())) {
                notifySocketService.sendNotify(NotificationRequest.ToReceiver.acceptFriend(receiverName), friendId);
                notifySocketService.sendNotify(NotificationRequest.ToSender.acceptSuccess(senderName), userId);
            } else if (userFriendRequest.getStatus().equals(FriendStatus.BLOCKED.toString())) {
                notifySocketService.sendNotify(NotificationRequest.ToSender.unblockSuccess(receiverName), userId);
            }
        } else if (response.getStatus().equals(FriendStatus.BLOCKED.toString())) {
            notifySocketService.sendNotify(NotificationRequest.ToSender.blockSuccess(receiverName), userId);
        }

        return new ApiResponse<>(response);
    }

    @DeleteMapping("/users/{userId}/friends/{friendId}")
    public ApiResponse<?> deleteFriend(@PathVariable String userId,
            @PathVariable String friendId) {
        userFriendsService.deleteUserFriends(userId, friendId);

        return new ApiResponse<>(ResponseCode.SUCCESS);
    }
}
