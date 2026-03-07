package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.services.MessageService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@AllArgsConstructor
@RequestMapping("/messages")
public class MessageController {
    MessageService messageService;

    @GetMapping("")
    public ApiResponse<List<MessageResponse>> getAllMessages() {
        List<MessageResponse> listMessageResponses = messageService.getAllMessages();

        ApiResponse<List<MessageResponse>> apiResponse = new ApiResponse<>(listMessageResponses);
        return apiResponse;
    }

    @GetMapping("/{messageId}")
    public ApiResponse<MessageResponse> getMessageById(@PathVariable String messageId) {
        MessageResponse messageResponse = messageService.getMessageById(messageId);

        ApiResponse<MessageResponse> apiResponse = new ApiResponse<>(messageResponse);
        return apiResponse;
    }

}
