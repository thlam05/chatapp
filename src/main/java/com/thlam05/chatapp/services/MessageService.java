package com.thlam05.chatapp.services;

import java.util.List;

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

    public MessageResponse getMessageById(String messageId) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        return messageMapper.toMessageResponse(message);
    }

    public List<MessageResponse> getAllMessages() {
        List<Message> listMessages = messageRepository.findAll();
        return messageMapper.toListMessageResponses(listMessages);
    }

    public List<MessageResponse> getAllMessagesByConversation(String conversationId) {
        List<Message> listMessages = messageRepository.findByConversationId(conversationId);
        return messageMapper.toListMessageResponses(listMessages);
    }
}
