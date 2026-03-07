package com.thlam05.chatapp.services;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.repositories.MessageRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class MessageService {
    MessageRepository messageRepository;

}
