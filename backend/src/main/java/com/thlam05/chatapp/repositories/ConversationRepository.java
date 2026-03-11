package com.thlam05.chatapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.Conversation;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, String> {

}
