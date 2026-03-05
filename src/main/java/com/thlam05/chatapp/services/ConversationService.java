package com.thlam05.chatapp.services;

import org.springframework.stereotype.Service;

import com.thlam05.chatapp.repositories.ConversationRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConversationService {
    ConversationRepository conversationRepository;
}
