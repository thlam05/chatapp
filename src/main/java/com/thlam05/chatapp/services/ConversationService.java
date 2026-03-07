package com.thlam05.chatapp.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.request.CreateConversationRequest;
import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.mappers.ConversationMapper;
import com.thlam05.chatapp.models.Conversation;
import com.thlam05.chatapp.repositories.ConversationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConversationService {
    ConversationRepository conversationRepository;

    ConversationMapper conversationMapper;

    public List<ConversationResponse> getAllConversations() {
        List<Conversation> listConversations = conversationRepository.findAll();
        List<ConversationResponse> listResponses = conversationMapper.toListConversationResponses(listConversations);
        return listResponses;
    }

    public ConversationResponse createConversation(CreateConversationRequest createConversationRequest) {
        Conversation conversation = Conversation.builder()
                .name(createConversationRequest.getName())
                .group(createConversationRequest.isGroup())
                .build();

        conversation = conversationRepository.save(conversation);

        return conversationMapper.toConversationResponse(conversation);
    }

    public void deleteConversation(String id) {
        Conversation conversation = conversationRepository.findById(id)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        conversationRepository.delete(conversation);
    }
}
