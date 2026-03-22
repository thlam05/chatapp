package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.CreateConversationRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.services.ConversationService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
public class ConversationController {
    ConversationService conversationService;

    @GetMapping("/conversations")
    public ApiResponse<List<ConversationResponse>> getAll() {
        var listConversations = conversationService.getAllConversations();

        return new ApiResponse<>(listConversations);
    }

    @GetMapping("/users/{userId}/conversations")
    public ApiResponse<List<ConversationResponse>> getListConversationsByUser(@PathVariable String userId) {
        List<ConversationResponse> list = conversationService.getAllConversationsByUser(userId);

        return new ApiResponse<>(list);
    }

    @GetMapping("/users/{userId}/conversations/count")
    public ApiResponse<CountResponse> countTotalConversationsOfUser(@PathVariable String userId) {
        CountResponse countResponse = conversationService.countTotalConversationsByUser(userId);

        return new ApiResponse<>(countResponse);
    }

    @PostMapping("/conversations")
    public ApiResponse<ConversationResponse> createConversation(
            @RequestBody CreateConversationRequest createConversationRequest) {

        ConversationResponse conversationResponse = conversationService.createConversation(createConversationRequest);

        return new ApiResponse<>(conversationResponse);
    }

    @DeleteMapping("/conversations/{conversationId}")
    public ApiResponse<?> deleteConversation(@PathVariable String conversationId) {
        conversationService.deleteConversation(conversationId);

        return new ApiResponse<>(ResponseCode.SUCCESS);
    }

}
