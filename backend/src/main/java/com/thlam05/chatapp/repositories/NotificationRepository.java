package com.thlam05.chatapp.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.thlam05.chatapp.models.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, String> {
    @Query("""
            SELECT n
            FROM notifications n
            JOIN n.user u ON u.id = :userId
            """)
    List<Notification> getNotificationsByUser(String userId);
}
