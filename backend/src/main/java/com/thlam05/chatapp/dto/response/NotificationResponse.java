package com.thlam05.chatapp.dto.response;

import java.time.LocalDateTime;

import com.thlam05.chatapp.models.User;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class NotificationResponse {
    String id;
    String title;
    String content;
    boolean read;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    User user;
}
