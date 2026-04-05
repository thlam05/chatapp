package com.thlam05.chatapp.socket.services;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.thlam05.chatapp.dto.response.ConversationMemberResponse;
import com.thlam05.chatapp.dto.response.ConversationSidebarResponse;
import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.enums.MessageType;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.models.Conversation;
import com.thlam05.chatapp.repositories.ConversationRepository;
import com.thlam05.chatapp.socket.payloads.ChatMessage;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ChatSocketService {
    private SimpMessagingTemplate messagingTemplate;
    private ConversationRepository conversationRepository;

    public void sendMessage(MessageResponse message, String conversationId) {
        String destination = "/topic/chat/" + conversationId;
        messagingTemplate.convertAndSend(destination, new ChatMessage(MessageType.CHAT, message, conversationId, null));

        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        for (var member : conversation.getMembers()) {
            String receiverDes = "/topic/chatSidebar/" + member.getUser().getId();
            System.out.println(receiverDes);
            messagingTemplate.convertAndSend(receiverDes,
                    new ChatMessage(MessageType.CHAT, message, conversationId, null));
        }
    }

    public void deleteChat(String conversationId) {
        String destination = "/topic/chat/" + conversationId;
        messagingTemplate.convertAndSend(destination, new ChatMessage(MessageType.DELETE, null, conversationId, null));

        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        for (var member : conversation.getMembers()) {
            String receiverDes = "/topic/chatSidebar/" + member.getUser().getId();
            messagingTemplate.convertAndSend(receiverDes,
                    new ChatMessage(MessageType.DELETE, null, conversationId, null));
        }
    }

    public void addChat(ConversationSidebarResponse conversation) {
        for (var member : conversation.getMembers()) {
            String receiverDes = "/topic/chatSidebar/" + member.getUser().getId();
            System.out.println(receiverDes);
            messagingTemplate.convertAndSend(receiverDes,
                    new ChatMessage(MessageType.ADD, null, "", conversation));
        }
    }

    public void addMember(ConversationMemberResponse member, String conversationId) {
        String receiverDes = "/topic/chatSidebar/" + member.getUser().getId();
        System.out.println(receiverDes);
        messagingTemplate.convertAndSend(receiverDes,
                new ChatMessage(MessageType.ADD, null, conversationId, null));
    }
}
