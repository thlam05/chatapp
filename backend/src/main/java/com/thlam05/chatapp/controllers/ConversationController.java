package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.CreateConversationRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.services.ConversationService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
@RequestMapping("/conversations")
public class ConversationController {
    ConversationService conversationService;

    @GetMapping("")
    public ApiResponse<List<ConversationResponse>> getAll() {
        var listConversations = conversationService.getAllConversations();

        return new ApiResponse<>(listConversations);
    }

    @PostMapping("")
    public ApiResponse<ConversationResponse> createConversation(
            @RequestBody CreateConversationRequest createConversationRequest) {

        return new ApiResponse<>();
    }

}
