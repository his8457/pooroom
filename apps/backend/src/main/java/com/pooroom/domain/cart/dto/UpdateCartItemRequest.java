package com.pooroom.domain.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateCartItemRequest {
    
    @NotNull(message = "{validation.quantity.required}")
    @Min(value = 1, message = "{validation.quantity.min}")
    private Integer quantity;
}