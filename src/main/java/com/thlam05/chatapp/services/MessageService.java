package com.thlam05.chatapp.services;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.request.MessageRequest;
import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.mappers.MessageMapper;
import com.thlam05.chatapp.models.Conversation;
import com.thlam05.chatapp.models.Message;
import com.thlam05.chatapp.repositories.ConversationRepository;
import com.thlam05.chatapp.repositories.MessageRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageService {
    MessageRepository messageRepository;
    ConversationRepository conversationRepository;
    MessageMapper messageMapper;

    public MessageResponse createMessage(MessageRequest messageRequest, String conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        Message message = new Message();
        message.setContent(messageRequest.getContent());
        message.setConversation(conversation);
        message.setSeen(false);

        message = messageRepository.save(message);

        return messageMapper.toMessageResponse(message);
    }
}
