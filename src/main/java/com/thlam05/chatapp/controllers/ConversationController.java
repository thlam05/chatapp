package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.CreateConversationRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.services.ConversationService;

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

    @GetMapping()
    public ApiResponse<List<ConversationResponse>> getAllConversations() {
        List<ConversationResponse> list = conversationService.getAllConversations();

        ApiResponse<List<ConversationResponse>> apiResponse = new ApiResponse<>(list);
        return apiResponse;
    }

    @PostMapping()
    public ApiResponse<ConversationResponse> createConversation(
            @RequestBody CreateConversationRequest createConversationRequest) {
        ConversationResponse conversationResponse = conversationService.createConversation(createConversationRequest);

        ApiResponse<ConversationResponse> apiResponse = new ApiResponse<>(conversationResponse);
        return apiResponse;
    }

    @DeleteMapping("/{id}")
    public ApiResponse<?> deleteConversation(@PathVariable String id) {
        conversationService.deleteConversation(id);

        ApiResponse<?> apiResponse = new ApiResponse<>(ResponseCode.SUCCESS);

        return apiResponse;
    }

}
