package com.thlam05.chatapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.ConversationMembers;
import com.thlam05.chatapp.types.IdComversationMembers;

@Repository
public interface ConversationMembersRepository extends JpaRepository<ConversationMembers, IdComversationMembers> {

}
