package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.CreateConversationRequest;
import com.thlam05.chatapp.dto.request.MessageRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.services.ConversationService;
import com.thlam05.chatapp.services.MessageService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@AllArgsConstructor
@RequestMapping("/conversations")
public class ConversationController {

    ConversationService conversationService;
    MessageService messageService;

    @GetMapping()
    public ApiResponse<List<ConversationResponse>> getAllConversations() {
        List<ConversationResponse> list = conversationService.getAllConversations();

        ApiResponse<List<ConversationResponse>> apiResponse = new ApiResponse<>(list);
        return apiResponse;
    }

    @GetMapping("/{conversationId}/message")
    public ApiResponse<List<MessageResponse>> getAllMessage(@PathVariable String conversationId) {
        List<MessageResponse> listMessageResponses = messageService.getAllMessagesByConversation(conversationId);

        ApiResponse<List<MessageResponse>> apiResponse = new ApiResponse<>(listMessageResponses);
        return apiResponse;
    }

    @PostMapping()
    public ApiResponse<ConversationResponse> createConversation(
            @RequestBody CreateConversationRequest createConversationRequest) {
        ConversationResponse conversationResponse = conversationService.createConversation(createConversationRequest);

        ApiResponse<ConversationResponse> apiResponse = new ApiResponse<>(conversationResponse);
        return apiResponse;
    }

    @PostMapping("/{conversationId}/messages")
    public ApiResponse<MessageResponse> createMessage(@RequestBody MessageRequest messageRequest,
            @PathVariable String conversationId) {
        MessageResponse messageResponse = messageService.createMessage(messageRequest, conversationId);

        ApiResponse<MessageResponse> apiResponse = new ApiResponse<>(messageResponse);

        return apiResponse;
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteConversation(@PathVariable String id) {
        conversationService.deleteConversation(id);

        ApiResponse<?> apiResponse = new ApiResponse<>(ResponseCode.SUCCESS);

        return apiResponse;
    }

}
