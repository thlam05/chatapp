package com.thlam05.chatapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.Conversation;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, String> {
    @Query("""
                SELECT DISTINCT c
                FROM conversations c
                JOIN c.members cm
                LEFT JOIN FETCH c.messages m
                LEFT JOIN FETCH m.user
                WHERE cm.user.id=:userId
            """)
    List<Conversation> getListConversationsByUser(String userId);

    @EntityGraph(attributePaths = { "messages", "messages.user", "members" })
    @Override
    List<Conversation> findAll();
}
