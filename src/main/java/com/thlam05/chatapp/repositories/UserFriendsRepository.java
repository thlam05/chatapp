package com.thlam05.chatapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.UserFriends;
import com.thlam05.chatapp.types.IdUserFriends;

@Repository
public interface UserFriendsRepository extends JpaRepository<UserFriends, IdUserFriends> {

}
