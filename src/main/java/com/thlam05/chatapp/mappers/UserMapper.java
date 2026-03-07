package com.thlam05.chatapp.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.thlam05.chatapp.dto.response.UserResponse;
import com.thlam05.chatapp.models.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserResponse toUserResponse(User user);

    List<UserResponse> toListUserResponse(List<User> list);
}
