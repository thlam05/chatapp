package com.thlam05.chatapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.Conversation;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, String> {
    @Query("""
                SELECT c
                FROM conversations c
                JOIN c.members cm
                LEFT JOIN messages m
                WHERE cm.user.id=:userId
                GROUP BY c
                ORDER BY MAX(m.createdAt) DESC
            """)

    List<Conversation> getListConversationsByUser(String userId);
}
