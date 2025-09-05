package com.pooroom.domain.board.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.common.dto.PageResponse;
import com.pooroom.domain.board.dto.*;
import com.pooroom.domain.board.service.BoardService;
import com.pooroom.domain.board.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardController {

    private final BoardService boardService;
    private final CommentService commentService;

    @GetMapping("/categories")
    public ResponseEntity<ApiResponse<List<BoardCategoryResponse>>> getCategories() {
        List<BoardCategoryResponse> categories = boardService.getPublicCategories();
        return ResponseEntity.ok(ApiResponse.success(categories));
    }

    @GetMapping("/categories/{categoryId}/posts")
    public ResponseEntity<ApiResponse<PageResponse<PostResponse>>> getPostsByCategory(
            @PathVariable Long categoryId,
            @PageableDefault(size = 20) Pageable pageable) {
        PageResponse<PostResponse> posts = boardService.getPostsByCategory(categoryId, pageable);
        return ResponseEntity.ok(ApiResponse.success(posts));
    }

    @GetMapping("/categories/{categoryId}/posts/search")
    public ResponseEntity<ApiResponse<PageResponse<PostResponse>>> searchPosts(
            @PathVariable Long categoryId,
            @RequestParam String keyword,
            @PageableDefault(size = 20) Pageable pageable) {
        PageResponse<PostResponse> posts = boardService.searchPosts(categoryId, keyword, pageable);
        return ResponseEntity.ok(ApiResponse.success(posts));
    }

    @GetMapping("/posts/{postId}")
    public ResponseEntity<ApiResponse<PostResponse>> getPost(
            @PathVariable Long postId,
            Authentication authentication) {
        String currentUserEmail = authentication.getName();
        PostResponse post = boardService.getPost(postId, currentUserEmail);
        return ResponseEntity.ok(ApiResponse.success(post));
    }

    @PostMapping("/posts")
    public ResponseEntity<ApiResponse<PostResponse>> createPost(
            @Valid @RequestBody CreatePostRequest request,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        PostResponse post = boardService.createPost(request, authorEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(post));
    }

    @PutMapping("/posts/{postId}")
    public ResponseEntity<ApiResponse<PostResponse>> updatePost(
            @PathVariable Long postId,
            @Valid @RequestBody UpdatePostRequest request,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        PostResponse post = boardService.updatePost(postId, request, authorEmail);
        return ResponseEntity.ok(ApiResponse.success(post));
    }

    @DeleteMapping("/posts/{postId}")
    public ResponseEntity<ApiResponse<Void>> deletePost(
            @PathVariable Long postId,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        boardService.deletePost(postId, authorEmail);
        return ResponseEntity.ok(ApiResponse.success(null));
    }

    @GetMapping("/posts/{postId}/comments")
    public ResponseEntity<ApiResponse<List<CommentResponse>>> getComments(@PathVariable Long postId) {
        List<CommentResponse> comments = commentService.getCommentsByPost(postId);
        return ResponseEntity.ok(ApiResponse.success(comments));
    }

    @PostMapping("/posts/{postId}/comments")
    public ResponseEntity<ApiResponse<CommentResponse>> createComment(
            @PathVariable Long postId,
            @Valid @RequestBody CreateCommentRequest request,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        CommentResponse comment = commentService.createComment(postId, request, authorEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.success(comment));
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<ApiResponse<Void>> deleteComment(
            @PathVariable Long commentId,
            Authentication authentication) {
        String authorEmail = authentication.getName();
        commentService.deleteComment(commentId, authorEmail);
        return ResponseEntity.ok(ApiResponse.success(null));
    }
}