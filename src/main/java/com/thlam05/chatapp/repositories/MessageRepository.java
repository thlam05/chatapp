package com.thlam05.chatapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.Message;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
    List<Message> findByConversationId(String id);
}
