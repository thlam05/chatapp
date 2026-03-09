package com.thlam05.chatapp.mappers;

import java.util.List;

import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.thlam05.chatapp.dto.request.NotificationRequest;
import com.thlam05.chatapp.dto.response.NotificationResponse;
import com.thlam05.chatapp.models.Notification;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationResponse toNotificationResponse(Notification notification);

    @BeanMapping(ignoreByDefault = true)
    Notification toNotification(NotificationRequest notificationRequest);

    List<NotificationResponse> toListNotificationResponses(List<Notification> list);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "user", ignore = true)
    void updateNotification(NotificationRequest request,
            @MappingTarget Notification notification);
}
