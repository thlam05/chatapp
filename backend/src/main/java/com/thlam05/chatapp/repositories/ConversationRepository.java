package com.thlam05.chatapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.Conversation;

import jakarta.transaction.Transactional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, String> {
    @Query("""
                SELECT DISTINCT c
                FROM conversations c
                JOIN  c.members cm
                LEFT JOIN FETCH c.members _cm
                LEFT JOIN FETCH c.latestMessage m
                LEFT JOIN FETCH m.user
                WHERE cm.user.id=:userId
            """)
    List<Conversation> getListConversationsByUser(String userId);

    @EntityGraph(attributePaths = { "messages", "messages.user", "members" })
    @Override
    List<Conversation> findAll();

    @Query("""
            SELECT c
            FROM conversations c
            JOIN c.members cm1
            JOIN c.members cm2
            LEFT JOIN FETCH c.members cm
            WHERE c.group = false AND cm1.user.id = :userId AND cm2.user.id = :friendId
                """)
    Conversation accessConversation(String userId, String friendId);

    @Modifying(clearAutomatically = true, flushAutomatically = true)
    @Transactional
    @Query("UPDATE conversations c SET c.latestMessage = null WHERE c.id = :conversationId")
    void clearLatestMessageById(@Param("conversationId") String conversationId);
}
