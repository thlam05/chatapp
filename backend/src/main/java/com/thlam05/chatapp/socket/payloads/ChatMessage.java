package com.thlam05.chatapp.socket.payloads;

import com.thlam05.chatapp.dto.response.ConversationSidebarResponse;
import com.thlam05.chatapp.dto.response.MessageResponse;
import com.thlam05.chatapp.enums.MessageType;

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
public class ChatMessage {
    MessageType type;
    MessageResponse message;
    String chatId;
    ConversationSidebarResponse chat;
}
