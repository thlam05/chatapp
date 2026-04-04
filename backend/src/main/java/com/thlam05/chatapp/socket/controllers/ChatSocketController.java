package com.thlam05.chatapp.socket.controllers;

import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import com.thlam05.chatapp.dto.request.CreateMessageRequest;
import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.services.MessageService;
import com.thlam05.chatapp.socket.payloads.ChatMessage;

import lombok.AllArgsConstructor;

@Controller
@AllArgsConstructor
public class ChatSocketController {
    // MessageService messageService;

    @MessageMapping("/chat/{chatId}")
    @SendTo("/topic/chat/{chatId}")
    public MessageResponse handleChatMessage(@Payload MessageResponse message, @DestinationVariable String chatId) {
        // var messageResponse = messageService.createMessage(new
        // CreateMessageRequest(message.getContent()), chatId);
        return message;
    }
}
