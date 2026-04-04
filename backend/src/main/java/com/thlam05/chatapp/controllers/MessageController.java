package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.CreateMessageRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.services.MessageService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@AllArgsConstructor
public class MessageController {
    MessageService messageService;

    private SimpMessagingTemplate messagingTemplate;

    @GetMapping("/users/{userId}/messages/count")
    public ApiResponse<CountResponse> countTotalMessagesOfUser(@PathVariable String userId) {
        CountResponse countResponse = messageService.countTotalMessagesByUser(userId);

        return new ApiResponse<>(countResponse);
    }

    @GetMapping("/conversations/{conversationId}/messages")
    public ApiResponse<List<MessageResponse>> getMessagesByConversation(@PathVariable String conversationId) {
        List<MessageResponse> responses = messageService.getAllMessagesByConversation(conversationId);
        return new ApiResponse<>(responses);
    }

    @PostMapping("/conversations/{conversationId}/messages")
    public ApiResponse<MessageResponse> createMessage(@RequestBody CreateMessageRequest createMessageRequest,
            @PathVariable String conversationId) {
        MessageResponse messageResponse = messageService.createMessage(createMessageRequest, conversationId);

        // String destination = "/topic/chat/" + conversationId;
        // messagingTemplate.convertAndSend(destination, messageResponse);

        return new ApiResponse<>(messageResponse);
    }

}
