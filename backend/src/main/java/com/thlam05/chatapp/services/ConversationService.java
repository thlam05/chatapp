package com.thlam05.chatapp.services;

import com.thlam05.chatapp.repositories.UserRepository;
import com.thlam05.chatapp.types.IdConversationMembers;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.request.CreateConversationRequest;
import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.enums.MemberRole;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.mappers.ConversationMapper;
import com.thlam05.chatapp.models.Conversation;
import com.thlam05.chatapp.models.ConversationMembers;
import com.thlam05.chatapp.models.User;
import com.thlam05.chatapp.repositories.ConversationMembersRepository;
import com.thlam05.chatapp.repositories.ConversationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConversationService {
    UserRepository userRepository;

    ConversationMembersRepository conversationMembersRepository;

    ConversationRepository conversationRepository;

    ConversationMapper conversationMapper;

    public List<ConversationResponse> getAllConversations() {
        List<Conversation> listConversations = conversationRepository.findAll();
        List<ConversationResponse> listResponses = conversationMapper.toListConversationResponses(listConversations);
        return listResponses;
    }

    public List<ConversationResponse> getAllConversationsByUser(String userId) {
        List<Conversation> list = conversationRepository.getListConversationsByUser(userId);
        return conversationMapper.toListConversationResponses(list);
    }

    public ConversationResponse createConversation(CreateConversationRequest createConversationRequest) {
        Conversation conversation = Conversation.builder()
                .name(createConversationRequest.getName())
                .group(createConversationRequest.isGroup())
                .build();

        conversation = conversationRepository.save(conversation);

        var context = SecurityContextHolder.getContext();
        String userId = context.getAuthentication().getName();
        User user = userRepository.getReferenceById(userId);

        ConversationMembers conversationMembers = ConversationMembers.builder()
                .user(user)
                .conversation(conversation)
                .role(MemberRole.ADMIN.name())
                .id(new IdConversationMembers(user.getId(), conversation.getId()))
                .build();

        conversationMembersRepository.save(conversationMembers);

        return conversationMapper.toConversationResponse(conversation);
    }

    public void deleteConversation(String id) {
        Conversation conversation = conversationRepository.findById(id)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        conversationRepository.delete(conversation);
    }
}
