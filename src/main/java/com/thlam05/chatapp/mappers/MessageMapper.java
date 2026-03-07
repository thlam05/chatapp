package com.thlam05.chatapp.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.models.Message;

@Mapper(componentModel = "spring")
public interface MessageMapper {
    MessageResponse toMessageResponse(Message message);

    List<MessageResponse> toListMessageResponses(List<Message> list);
}
