package com.pooroom.domain.board.service;

import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.domain.board.dto.CommentResponse;
import com.pooroom.domain.board.dto.CreateCommentRequest;
import com.pooroom.domain.board.entity.*;
import com.pooroom.domain.board.repository.*;
import com.pooroom.domain.user.entity.User;
import com.pooroom.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserService userService;

    public List<CommentResponse> getCommentsByPost(Long postId) {
        Post post = postRepository.findByIdAndStatus(postId, PostStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        List<Comment> comments = commentRepository.findByPostAndStatusAndParentIsNullOrderByCreatedAtAsc(
                post, CommentStatus.ACTIVE);

        return comments.stream()
                .map(comment -> {
                    CommentResponse response = CommentResponse.from(comment);
                    // 대댓글 로드
                    List<Comment> replies = commentRepository.findByParentAndStatusOrderByCreatedAtAsc(
                            comment, CommentStatus.ACTIVE);
                    response.setReplies(replies.stream()
                            .map(CommentResponse::from)
                            .collect(Collectors.toList()));
                    return response;
                })
                .collect(Collectors.toList());
    }

    @Transactional
    public CommentResponse createComment(Long postId, CreateCommentRequest request, String authorEmail) {
        Post post = postRepository.findByIdAndStatus(postId, PostStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        User author = userService.findByEmail(authorEmail);

        Comment.CommentBuilder commentBuilder = Comment.builder()
                .post(post)
                .author(author)
                .content(request.getContent());

        // 대댓글인 경우 부모 댓글 설정
        if (request.getParentId() != null) {
            Comment parent = commentRepository.findById(request.getParentId())
                    .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
            commentBuilder.parent(parent);
        }

        Comment savedComment = commentRepository.save(commentBuilder.build());
        
        // 게시글의 댓글 수 증가
        post.increaseCommentCount();
        postRepository.save(post);

        return CommentResponse.from(savedComment);
    }

    @Transactional
    public void deleteComment(Long commentId, String authorEmail) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        User currentUser = userService.findByEmail(authorEmail);
        
        // 작성자 본인 또는 관리자만 삭제 가능
        if (!comment.getAuthor().getId().equals(currentUser.getId()) && 
            !currentUser.getRole().toString().equals("ADMIN")) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED);
        }

        comment.delete();
        commentRepository.save(comment);
        
        // 게시글의 댓글 수 감소
        Post post = comment.getPost();
        post.decreaseCommentCount();
        postRepository.save(post);
    }
}