package com.pooroom.domain.order.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.common.dto.PageResponse;
import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.common.util.MessageUtil;
import com.pooroom.domain.order.dto.CreateOrderRequest;
import com.pooroom.domain.order.dto.OrderResponse;
import com.pooroom.domain.order.entity.OrderStatus;
import com.pooroom.domain.order.service.OrderService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;
    private final MessageUtil messageUtil;

    @PostMapping
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            HttpServletRequest httpRequest) {
        
        Long userId = (Long) httpRequest.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }

        OrderResponse orderResponse = orderService.createOrder(userId, request);
        String message = messageUtil.getMessage("order.create.success");
        
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(orderResponse, message));
    }

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<OrderResponse>>> getOrders(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection,
            @RequestParam(required = false) OrderStatus status,
            HttpServletRequest httpRequest) {
        
        Long userId = (Long) httpRequest.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }

        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);

        PageResponse<OrderResponse> orders;
        if (status != null) {
            orders = orderService.getOrdersByUserIdAndStatus(userId, status, pageable);
        } else {
            orders = orderService.getOrdersByUserId(userId, pageable);
        }

        return ResponseEntity.ok(ApiResponse.success(orders));
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(
            @PathVariable Long orderId,
            HttpServletRequest httpRequest) {
        
        Long userId = (Long) httpRequest.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }

        OrderResponse orderResponse = orderService.getOrderById(userId, orderId);
        return ResponseEntity.ok(ApiResponse.success(orderResponse));
    }

    @GetMapping("/number/{orderNumber}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrderByNumber(
            @PathVariable String orderNumber,
            HttpServletRequest httpRequest) {
        
        Long userId = (Long) httpRequest.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }

        OrderResponse orderResponse = orderService.getOrderByOrderNumber(userId, orderNumber);
        return ResponseEntity.ok(ApiResponse.success(orderResponse));
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<ApiResponse<OrderResponse>> cancelOrder(
            @PathVariable Long orderId,
            @RequestParam(required = false) String cancelReason,
            HttpServletRequest httpRequest) {
        
        Long userId = (Long) httpRequest.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }

        OrderResponse orderResponse = orderService.cancelOrder(userId, orderId, cancelReason);
        String message = messageUtil.getMessage("order.cancel.success");
        
        return ResponseEntity.ok(ApiResponse.success(orderResponse, message));
    }

    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Long>> getOrderCount(HttpServletRequest httpRequest) {
        Long userId = (Long) httpRequest.getAttribute("userId");
        if (userId == null) {
            throw new BusinessException(ErrorCode.USER_NOT_AUTHORIZED);
        }

        Long count = orderService.countOrdersByUserId(userId);
        return ResponseEntity.ok(ApiResponse.success(count));
    }
}