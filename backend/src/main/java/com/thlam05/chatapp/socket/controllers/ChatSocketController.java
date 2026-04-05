package com.thlam05.chatapp.socket.controllers;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.enums.MessageType;
import com.thlam05.chatapp.socket.payloads.ChatMessage;
import com.thlam05.chatapp.socket.payloads.ChatSidebar;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class ChatSocketController {
    // MessageService messageService;

    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public ChatMessage handleChatMessage(@Payload MessageResponse message,
            @DestinationVariable String chatId) {
        return new ChatMessage(MessageType.CHAT, message);
    }

    @MessageMapping("/chatSidebar/{userId}")
    @SendTo("/topic/chatSidebar/{userId}")
    public ChatSidebar handleChatSidebar(@Payload ChatSidebar message,
            @DestinationVariable String userId) {
        return message;
    }
}
