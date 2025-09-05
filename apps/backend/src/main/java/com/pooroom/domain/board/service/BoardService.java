package com.pooroom.domain.board.service;

import com.pooroom.common.dto.PageResponse;
import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.domain.board.dto.*;
import com.pooroom.domain.board.entity.*;
import com.pooroom.domain.board.repository.*;
import com.pooroom.domain.user.entity.User;
import com.pooroom.domain.user.service.UserService;
import com.pooroom.domain.product.entity.Product;
import com.pooroom.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {

    private final BoardCategoryRepository boardCategoryRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final UserService userService;
    private final ProductService productService;

    public List<BoardCategoryResponse> getAllCategories() {
        return boardCategoryRepository.findAllActiveOrderBySortOrder()
                .stream()
                .map(BoardCategoryResponse::from)
                .collect(Collectors.toList());
    }

    public List<BoardCategoryResponse> getPublicCategories() {
        return boardCategoryRepository.findAllPublicOrderBySortOrder()
                .stream()
                .map(BoardCategoryResponse::from)
                .collect(Collectors.toList());
    }

    public PageResponse<PostResponse> getPostsByCategory(Long categoryId, Pageable pageable) {
        BoardCategory category = boardCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        Page<Post> posts = postRepository.findByCategoryAndStatusOrderByPinnedAndCreatedAt(
                category, PostStatus.ACTIVE, pageable);

        return PageResponse.from(posts.map(PostResponse::fromSummary));
    }

    public PageResponse<PostResponse> searchPosts(Long categoryId, String keyword, Pageable pageable) {
        BoardCategory category = boardCategoryRepository.findById(categoryId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        Page<Post> posts = postRepository.findByCategoryAndStatusAndTitleOrContentContainingIgnoreCase(
                category, PostStatus.ACTIVE, keyword, pageable);

        return PageResponse.from(posts.map(PostResponse::fromSummary));
    }

    @Transactional
    public PostResponse getPost(Long postId, String currentUserEmail) {
        Post post = postRepository.findByIdAndStatus(postId, PostStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        // 조회수 증가
        post.increaseViewCount();
        postRepository.save(post);

        // 비밀글 접근 권한 체크
        if (post.getIsSecret()) {
            User currentUser = userService.findByEmail(currentUserEmail);
            if (!post.getAuthor().getId().equals(currentUser.getId()) && 
                !currentUser.getRole().toString().equals("ADMIN")) {
                throw new BusinessException(ErrorCode.ACCESS_DENIED);
            }
        }

        return PostResponse.from(post);
    }

    @Transactional
    public PostResponse createPost(CreatePostRequest request, String authorEmail) {
        User author = userService.findByEmail(authorEmail);
        BoardCategory category = boardCategoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        Post.PostBuilder postBuilder = Post.builder()
                .category(category)
                .author(author)
                .title(request.getTitle())
                .content(request.getContent())
                .isSecret(request.getIsSecret() != null ? request.getIsSecret() : false);

        // 상품문의/리뷰인 경우 상품 정보 추가
        if (request.getProductId() != null) {
            Product product = productService.findById(request.getProductId());
            postBuilder.product(product);
        }

        // 리뷰인 경우 별점 추가
        if (request.getRating() != null) {
            postBuilder.rating(request.getRating());
        }

        Post savedPost = postRepository.save(postBuilder.build());
        return PostResponse.from(savedPost);
    }

    @Transactional
    public PostResponse updatePost(Long postId, UpdatePostRequest request, String authorEmail) {
        Post post = postRepository.findByIdAndStatus(postId, PostStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        User currentUser = userService.findByEmail(authorEmail);
        
        // 작성자 본인 또는 관리자만 수정 가능
        if (!post.getAuthor().getId().equals(currentUser.getId()) && 
            !currentUser.getRole().toString().equals("ADMIN")) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED);
        }

        post.updateContent(request.getTitle(), request.getContent());
        Post updatedPost = postRepository.save(post);
        
        return PostResponse.from(updatedPost);
    }

    @Transactional
    public void deletePost(Long postId, String authorEmail) {
        Post post = postRepository.findByIdAndStatus(postId, PostStatus.ACTIVE)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        User currentUser = userService.findByEmail(authorEmail);
        
        // 작성자 본인 또는 관리자만 삭제 가능
        if (!post.getAuthor().getId().equals(currentUser.getId()) && 
            !currentUser.getRole().toString().equals("ADMIN")) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED);
        }

        post.delete();
        postRepository.save(post);
    }
}