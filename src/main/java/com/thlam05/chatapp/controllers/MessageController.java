package com.thlam05.chatapp.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.thlam05.chatapp.services.MessageService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@AllArgsConstructor
@RequestMapping("/messages")
public class MessageController {
    MessageService messageService;

    @PostMapping()
    public String createMessage(@RequestBody String entity) {

        return entity;
    }

}
