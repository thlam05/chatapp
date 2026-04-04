package com.thlam05.chatapp.services;

import com.thlam05.chatapp.repositories.UserRepository;
import com.thlam05.chatapp.types.IdConversationMembers;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.thlam05.chatapp.dto.request.AccessConversationRequest;
import com.thlam05.chatapp.dto.request.AddConversationMemberRequest;
import com.thlam05.chatapp.dto.request.CreateConversationRequest;
import com.thlam05.chatapp.dto.response.ConversationMemberResponse;
import com.thlam05.chatapp.dto.response.ConversationResponse;
import com.thlam05.chatapp.dto.response.ConversationSidebarResponse;
import com.thlam05.chatapp.dto.response.CountResponse;
import com.thlam05.chatapp.enums.MemberRole;
import com.thlam05.chatapp.enums.ResponseCode;
import com.thlam05.chatapp.exceptions.AppException;
import com.thlam05.chatapp.mappers.ConversationMapper;
import com.thlam05.chatapp.mappers.ConversationMemberMapper;
import com.thlam05.chatapp.mappers.MessageMapper;
import com.thlam05.chatapp.models.Conversation;
import com.thlam05.chatapp.models.ConversationMembers;
import com.thlam05.chatapp.models.User;
import com.thlam05.chatapp.repositories.ConversationMembersRepository;
import com.thlam05.chatapp.repositories.ConversationRepository;
import com.thlam05.chatapp.repositories.MessageRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ConversationService {
    UserRepository userRepository;

    ConversationMembersRepository conversationMembersRepository;

    ConversationRepository conversationRepository;

    MessageRepository messageRepository;

    MessageMapper messageMapper;

    ConversationMapper conversationMapper;

    ConversationMemberMapper conversationMemberMapper;

    public List<ConversationResponse> getAllConversations() {
        List<Conversation> listConversations = conversationRepository.findAll();
        List<ConversationResponse> listResponses = conversationMapper.toListConversationResponses(listConversations);
        return listResponses;
    }

    public List<ConversationSidebarResponse> getAllConversationsByUser(String userId) {
        List<Conversation> list = conversationRepository.getListConversationsByUser(userId);

        List<ConversationSidebarResponse> listResponses = new ArrayList<>();

        for (var conversation : list) {
            listResponses.add(ConversationSidebarResponse.builder()
                    .id(conversation.getId())
                    .name(conversation.getName())
                    .group(conversation.isGroup())
                    .latestMessage(messageMapper.toMessageResponse(conversation.getLatestMessage()))
                    .members(conversationMemberMapper.toSetConversationMemberResponses(conversation.getMembers()))
                    .createdAt(conversation.getCreatedAt())
                    .build());
        }
        return listResponses;
    }

    public ConversationResponse getById(String conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new AppException(ResponseCode.NOT_FOUND));

        return conversationMapper.toConversationResponse(conversation);
    }

    @Transactional // Rất quan trọng để đảm bảo tính toàn vẹn
    public ConversationResponse accessConversation(AccessConversationRequest request) {
        var context = SecurityContextHolder.getContext();
        String userId = context.getAuthentication().getName();

        Conversation existingConv = conversationRepository
                .accessConversation(userId, request.getPartnerId());

        if (existingConv != null) {
            return conversationMapper.toConversationResponse(existingConv);
        }

        User user = userRepository.getReferenceById(userId);
        User partner = userRepository.getReferenceById(request.getPartnerId());

        Conversation conversation = Conversation.builder()
                .name("")
                .group(false)
                .build();

        final Conversation savedConversation = conversationRepository.save(conversation);

        ConversationMembers member1 = ConversationMembers.builder()
                .id(new IdConversationMembers(userId, savedConversation.getId()))
                .user(user)
                .conversation(savedConversation)
                .role(MemberRole.MEMBER.name())
                .build();

        ConversationMembers member2 = ConversationMembers.builder()
                .id(new IdConversationMembers(request.getPartnerId(), savedConversation.getId()))
                .user(partner)
                .conversation(savedConversation)
                .role(MemberRole.MEMBER.name())
                .build();

        conversationMembersRepository.saveAll(List.of(member1, member2));

        savedConversation.setMembers(Set.of(member1, member2));

        return conversationMapper.toConversationResponse(savedConversation);
    }

    public ConversationResponse createConversation(CreateConversationRequest createConversationRequest) {
        Conversation conversation = Conversation.builder()
                .name(createConversationRequest.getName())
                .group(createConversationRequest.isGroup())
                .build();

        conversation = conversationRepository.save(conversation);

        var context = SecurityContextHolder.getContext();
        String userId = context.getAuthentication().getName();
        User user = userRepository.getReferenceById(userId);

        ConversationMembers conversationMembers = ConversationMembers.builder()
                .user(user)
                .conversation(conversation)
                .role(MemberRole.ADMIN.name())
                .id(new IdConversationMembers(user.getId(), conversation.getId()))
                .build();

        conversationMembersRepository.save(conversationMembers);

        return conversationMapper.toConversationResponse(conversation);
    }

    @Transactional
    public void deleteConversation(String id) {
        // 1. Dùng existsById thay vì findById để KHÔNG lưu đối tượng vào Cache
        if (!conversationRepository.existsById(id)) {
            throw new AppException(ResponseCode.NOT_FOUND);
        }

        // 2. Xóa liên kết khóa ngoại (đã có clearAutomatically nên không lo lỗi cache)
        conversationRepository.clearLatestMessageById(id);

        // Bỏ dòng conversationRepository.flush(); vì không còn cần thiết nữa

        // 3. Xóa dữ liệu liên quan ở các bảng phụ
        conversationMembersRepository.deleteByConversationId(id);
        messageRepository.deleteByConversationId(id);

        // 4. Xóa cuộc hội thoại
        conversationRepository.deleteById(id);
    }

    public CountResponse countTotalConversationsByUser(String userId) {
        Long count = conversationMembersRepository.countTotalConversationsByUser(userId);

        return new CountResponse(count);
    }

    public ConversationMemberResponse addConversationMember(AddConversationMemberRequest request,
            String conversationId) {
        Conversation conversation = conversationRepository.getReferenceById(conversationId);
        User user = userRepository.getReferenceById(request.getUserId());

        ConversationMembers conversationMembers = ConversationMembers.builder()
                .conversation(conversation)
                .user(user)
                .id(new IdConversationMembers(user.getId(), conversationId))
                .role(request.getRole())
                .build();

        conversationMembers = conversationMembersRepository.save(conversationMembers);

        return conversationMemberMapper.toConversationMemberResponse(conversationMembers);
    }
}
