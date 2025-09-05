package com.pooroom.domain.board.dto;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class CreateCommentRequest {

    @NotBlank(message = "{validation.content.required}")
    @Size(max = 1000, message = "{validation.comment.content.size}")
    private String content;

    private Long parentId;
}