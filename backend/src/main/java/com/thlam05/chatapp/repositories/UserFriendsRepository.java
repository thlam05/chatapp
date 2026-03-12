package com.thlam05.chatapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.UserFriends;
import com.thlam05.chatapp.types.IdUserFriends;

@Repository
public interface UserFriendsRepository extends JpaRepository<UserFriends, IdUserFriends> {
    @Query("""
            SELECT uf FROM user_friends uf
            WHERE uf.user.id = :userId OR uf.friend.id = :userId
            """)
    List<UserFriends> findFriends(@Param("userId") String userId);

    @Query("""
            SELECT COUNT(uf)
            FROM user_friends uf
            WHERE uf.user.id = :userId
            OR uf.friend.id = :userId
                """)
    Long countTotalFriendsByUser(String userId);
}
