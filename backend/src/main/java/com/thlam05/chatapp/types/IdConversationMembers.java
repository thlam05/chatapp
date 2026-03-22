package com.thlam05.chatapp.types;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class IdConversationMembers implements Serializable {
    String userId;
    String conversationId;

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof IdConversationMembers))
            return false;
        IdConversationMembers that = (IdConversationMembers) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(conversationId, that.conversationId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, conversationId);
    }
}
