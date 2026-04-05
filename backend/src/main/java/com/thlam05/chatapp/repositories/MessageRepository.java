package com.thlam05.chatapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.Message;

import jakarta.transaction.Transactional;

@Repository
public interface MessageRepository extends JpaRepository<Message, String> {
    @Query("""
            SELECT m
            FROM messages m
            WHERE m.conversation.id = :id
            ORDER BY m.createdAt
            """)
    List<Message> findByConversationId(String id);

    @Query("""
            SELECT COUNT(m)
            FROM messages m
            WHERE m.user.id = :userId
            """)
    Long countTotalMessagesByUser(String userId);

    @Modifying(clearAutomatically = true)
    @Transactional
    @Query("DELETE FROM messages m WHERE m.conversation.id = :conversationId")
    void deleteByConversationId(@Param("conversationId") String conversationId);
}
