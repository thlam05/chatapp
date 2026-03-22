package com.thlam05.chatapp.services;

import java.util.List;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.request.CreateMessageRequest;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.mappers.MessageMapper;
import com.thlam05.chatapp.models.Conversation;
import com.thlam05.chatapp.models.Message;
import com.thlam05.chatapp.models.User;
import com.thlam05.chatapp.repositories.ConversationRepository;
import com.thlam05.chatapp.repositories.MessageRepository;
import com.thlam05.chatapp.repositories.UserRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageService {
    MessageRepository messageRepository;
    ConversationRepository conversationRepository;
    MessageMapper messageMapper;
    UserRepository userRepository;

    public MessageResponse createMessage(CreateMessageRequest createMessageRequest, String conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        var context = SecurityContextHolder.getContext();
        String userId = context.getAuthentication().getName();

        User user = userRepository.getReferenceById(userId);

        Message message = Message.builder()
                .content(createMessageRequest.getContent())
                .conversation(conversation)
                .seen(false)
                .user(user)
                .build();

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

    public MessageResponse updateMessage(String messageId, CreateMessageRequest messageRequest) {
        Message message = messageRepository.findById(messageId)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        message.setContent(messageRequest.getContent());

        messageRepository.save(message);

        return messageMapper.toMessageResponse(message);
    }

    public void deleteMessage(String messageId) {
        messageRepository.deleteById(messageId);
    }

    public CountResponse countTotalMessagesByUser(String userId) {
        Long count = messageRepository.countTotalMessagesByUser(userId);

        return new CountResponse(count);
    }
}
