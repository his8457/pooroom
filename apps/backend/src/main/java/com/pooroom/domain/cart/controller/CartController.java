package com.pooroom.domain.cart.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.common.util.MessageUtil;
import com.pooroom.domain.cart.dto.AddToCartRequest;
import com.pooroom.domain.cart.dto.CartResponse;
import com.pooroom.domain.cart.dto.UpdateCartItemRequest;
import com.pooroom.domain.cart.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private final MessageUtil messageUtil;

    @GetMapping
    public ResponseEntity<ApiResponse<CartResponse>> getCart(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }
        CartResponse cart = cartService.getCartByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(cart));
    }

    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Integer>> getCartItemCount(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }
        int count = cartService.getCartItemCount(userId);
        return ResponseEntity.ok(ApiResponse.success(count));
    }

    @PostMapping("/items")
    public ResponseEntity<ApiResponse<CartResponse>> addToCart(
            @Valid @RequestBody AddToCartRequest request,
            HttpServletRequest httpRequest) {
        
        Long userId = (Long) httpRequest.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }
        
        CartResponse cart = cartService.addToCart(userId, request);
        
        String message = messageUtil.getMessage("cart.add.success");
        return ResponseEntity.ok(ApiResponse.success(cart, message));
    }

    @PutMapping("/items/{cartItemId}")
    public ResponseEntity<ApiResponse<CartResponse>> updateCartItem(
            @PathVariable Long cartItemId,
            @Valid @RequestBody UpdateCartItemRequest request,
            HttpServletRequest httpRequest) {
        
        Long userId = (Long) httpRequest.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }
        CartResponse cart = cartService.updateCartItem(userId, cartItemId, request);
        
        String message = messageUtil.getMessage("cart.update.success");
        return ResponseEntity.ok(ApiResponse.success(cart, message));
    }

    @DeleteMapping("/items/{cartItemId}")
    public ResponseEntity<ApiResponse<CartResponse>> removeFromCart(
            @PathVariable Long cartItemId,
            HttpServletRequest httpRequest) {
        
        Long userId = (Long) httpRequest.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }
        CartResponse cart = cartService.removeFromCart(userId, cartItemId);
        
        String message = messageUtil.getMessage("cart.remove.success");
        return ResponseEntity.ok(ApiResponse.success(cart, message));
    }

    @DeleteMapping
    public ResponseEntity<ApiResponse<Void>> clearCart(HttpServletRequest request) {
        Long userId = (Long) request.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }
        cartService.clearCart(userId);
        
        String message = messageUtil.getMessage("cart.clear.success");
        return ResponseEntity.ok(ApiResponse.success(null, message));
    }
}