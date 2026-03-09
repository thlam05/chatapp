package com.thlam05.chatapp.mappers;

import java.util.List;

import org.mapstruct.Mapper;

import com.thlam05.chatapp.dto.response.NotificationResponse;
import com.thlam05.chatapp.models.Notification;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationResponse toNotificationResponse(Notification notification);

    List<NotificationResponse> toListNotificationResponses(List<Notification> list);
}
