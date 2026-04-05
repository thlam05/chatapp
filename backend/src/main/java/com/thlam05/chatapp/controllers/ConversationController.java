package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.AccessConversationRequest;
import com.thlam05.chatapp.dto.request.AddConversationMemberRequest;
import com.thlam05.chatapp.dto.request.CreateConversationRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.ConversationMemberResponse;
import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.dto.response.ConversationSidebarResponse;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.services.ConversationService;
import com.thlam05.chatapp.socket.services.ChatSocketService;

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

    ChatSocketService chatSocketService;

    @GetMapping("/conversations")
    public ApiResponse<List<ConversationResponse>> getAll() {
        var listConversations = conversationService.getAllConversations();

        return new ApiResponse<>(listConversations);
    }

    @GetMapping("/conversations/{conversationId}")
    public ApiResponse<ConversationResponse> getMethodName(@PathVariable String conversationId) {
        var response = conversationService.getById(conversationId);
        return new ApiResponse<>(response);
    }

    @GetMapping("/users/{userId}/conversations")
    public ApiResponse<List<ConversationSidebarResponse>> getListConversationsByUser(@PathVariable String userId) {
        List<ConversationSidebarResponse> list = conversationService.getAllConversationsByUser(userId);

        return new ApiResponse<>(list);
    }

    @GetMapping("/users/{userId}/conversations/count")
    public ApiResponse<CountResponse> countTotalConversationsOfUser(@PathVariable String userId) {
        CountResponse countResponse = conversationService.countTotalConversationsByUser(userId);

        return new ApiResponse<>(countResponse);
    }

    @PostMapping("/conversations")
    public ApiResponse<ConversationSidebarResponse> createConversation(
            @RequestBody CreateConversationRequest createConversationRequest) {

        ConversationSidebarResponse conversationResponse = conversationService
                .createConversation(createConversationRequest);

        chatSocketService.addChat(conversationResponse);

        return new ApiResponse<>(conversationResponse);
    }

    @PostMapping("/conversations/access")
    public ApiResponse<ConversationSidebarResponse> getOrCreateConversation(
            @RequestBody AccessConversationRequest request) {
        ConversationSidebarResponse response = conversationService.accessConversation(request);
        return new ApiResponse<>(response);
    }

    @PostMapping("/conversations/{conversationId}/members")
    public ApiResponse<ConversationMemberResponse> addMember(@RequestBody AddConversationMemberRequest request,
            @PathVariable String conversationId) {
        ConversationMemberResponse response = conversationService.addConversationMember(request, conversationId);

        chatSocketService.addMember(response, conversationId);
        return new ApiResponse<>(response);
    }

    @DeleteMapping("/conversations/{conversationId}")
    public ApiResponse<?> deleteConversation(@PathVariable String conversationId) {
        chatSocketService.deleteChat(conversationId);
        conversationService.deleteConversation(conversationId);

        return new ApiResponse<>(ResponseCode.SUCCESS);
    }

}
