package com.pooroom.domain.board.dto;

import lombok.Data;

import jakarta.validation.constraints.*;

@Data
public class CreatePostRequest {

    @NotNull(message = "{validation.category.required}")
    private Long categoryId;

    @NotBlank(message = "{validation.title.required}")
    @Size(max = 200, message = "{validation.title.size}")
    private String title;

    @NotBlank(message = "{validation.content.required}")
    @Size(max = 10000, message = "{validation.content.size}")
    private String content;

    private Long productId;

    private Boolean isSecret = false;

    @Min(value = 1, message = "{validation.rating.min}")
    @Max(value = 5, message = "{validation.rating.max}")
    private Byte rating;

    private Long orderId;
}