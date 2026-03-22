package com.thlam05.chatapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.ConversationMembers;
import com.thlam05.chatapp.types.IdConversationMembers;

@Repository
public interface ConversationMembersRepository extends JpaRepository<ConversationMembers, IdConversationMembers> {
    @Query("""
            SELECT COUNT(cm)
            FROM conversation_members cm
            WHERE cm.user.id = :userId
                """)
    Long countTotalConversationsByUser(String userId);

}
