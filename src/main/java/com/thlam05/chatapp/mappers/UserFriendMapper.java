package com.thlam05.chatapp.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.thlam05.chatapp.dto.response.UserFriendResponse;
import com.thlam05.chatapp.models.UserFriends;

@Mapper(componentModel = "spring")
public interface UserFriendMapper {
    UserFriendResponse toUserFriendResponse(UserFriends userFriends);

    List<UserFriendResponse> toListUserFriendResponses(List<UserFriends> userFriends);
}
