package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.dto.request.MessageRequest;
import com.thlam05.chatapp.dto.response.ApiResponse;
import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.services.MessageService;

import lombok.AllArgsConstructor;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

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

    @PutMapping("/{messageId}")
    public ApiResponse<MessageResponse> updateMessage(@PathVariable String messageId,
            @RequestBody MessageRequest messageRequest) {
        MessageResponse messageResponse = messageService.updateMessage(messageId, messageRequest);

        ApiResponse<MessageResponse> apiResponse = new ApiResponse<>(messageResponse);
        return apiResponse;
    }

    @DeleteMapping("/{messageId}")
    public ApiResponse<?> deleteMessage(@PathVariable String messageId) {
        messageService.deleteMessage(messageId);
        return new ApiResponse<>(ResponseCode.SUCCESS);
    }

}
