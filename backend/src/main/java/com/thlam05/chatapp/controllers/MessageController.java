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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@AllArgsConstructor
public class MessageController {
    MessageService messageService;

    @GetMapping("/test")
    public String getMethodName() {
        return "TEST";
    }

    @GetMapping("/users/{userId}/messages/count")
    public ApiResponse<CountResponse> countTotalMessagesOfUser(@PathVariable String userId) {
        CountResponse countResponse = messageService.countTotalMessagesByUser(userId);

        return new ApiResponse<>(countResponse);
    }

    @PostMapping("/messages")
    public String createMessage(@RequestBody CreateMessageRequest createMessageRequest) {
        MessageResponse messageResponse = messageService.createMessage(createMessageRequest, null);

        return "entity";
    }

}
