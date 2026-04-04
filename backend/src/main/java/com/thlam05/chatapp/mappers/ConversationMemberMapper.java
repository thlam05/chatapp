package com.thlam05.chatapp.mappers;

import java.util.Set;

import org.mapstruct.Mapper;

import com.thlam05.chatapp.dto.response.ConversationMemberResponse;
import com.thlam05.chatapp.models.ConversationMembers;

@Mapper(componentModel = "spring")
public interface ConversationMemberMapper {
    ConversationMemberResponse toConversationMemberResponse(ConversationMembers conversationMembers);

    Set<ConversationMemberResponse> toSetConversationMemberResponses(Set<ConversationMembers> list);
}
