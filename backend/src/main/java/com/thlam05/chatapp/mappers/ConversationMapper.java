package com.thlam05.chatapp.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.models.Conversation;

@Mapper(componentModel = "spring")
public interface ConversationMapper {

    ConversationResponse toConversationResponse(Conversation conversation);

    List<ConversationResponse> toListConversationResponses(List<Conversation> list);
}
