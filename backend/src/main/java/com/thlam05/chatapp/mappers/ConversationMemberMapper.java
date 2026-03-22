package com.thlam05.chatapp.mappers;

import org.mapstruct.Mapper;

import com.thlam05.chatapp.dto.response.AddConversationMemberResponse;
import com.thlam05.chatapp.models.ConversationMembers;

@Mapper(componentModel = "spring")
public interface ConversationMemberMapper {
    AddConversationMemberResponse toAddConversationMemberResponse(ConversationMembers conversationMembers);
}
