package com.pooroom.domain.board.dto;

import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Data
public class UpdatePostRequest {

    @NotBlank(message = "{validation.title.required}")
    @Size(max = 200, message = "{validation.title.size}")
    private String title;

    @NotBlank(message = "{validation.content.required}")
    @Size(max = 10000, message = "{validation.content.size}")
    private String content;
}