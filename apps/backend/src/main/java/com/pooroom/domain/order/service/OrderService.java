package com.pooroom.domain.order.service;

import com.pooroom.common.dto.PageResponse;
import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.common.service.CacheService;
import com.pooroom.domain.cart.entity.Cart;
import com.pooroom.domain.cart.entity.CartItem;
import com.pooroom.domain.cart.service.CartService;
import com.pooroom.domain.order.dto.CreateOrderRequest;
import com.pooroom.domain.order.dto.OrderResponse;
import com.pooroom.domain.order.entity.*;
import com.pooroom.domain.order.repository.OrderItemRepository;
import com.pooroom.domain.order.repository.OrderRepository;
import com.pooroom.domain.product.entity.Product;
import com.pooroom.domain.product.entity.ProductStatus;
import com.pooroom.domain.product.service.ProductService;
import com.pooroom.domain.user.entity.User;
import com.pooroom.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.Duration;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class OrderService {

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserService userService;
    private final CartService cartService;
    private final ProductService productService;
    private final CacheService cacheService;

    private static final Duration ORDER_CACHE_DURATION = Duration.ofMinutes(10);
    private static final BigDecimal FREE_SHIPPING_THRESHOLD = new BigDecimal("30000");
    private static final BigDecimal SHIPPING_FEE = new BigDecimal("3000");

    @Transactional
    public OrderResponse createOrder(Long userId, CreateOrderRequest request) {
        User user = userService.findById(userId);
        
        Cart cart = cartService.getCartEntityByUserId(userId);
        if (cart == null || cart.getCartItems().isEmpty()) {
            throw new BusinessException(ErrorCode.CART_EMPTY);
        }

        validateCartItems(cart.getCartItems());

        Order order = buildOrderFromCart(user, cart, request);
        
        orderRepository.save(order);

        reduceProductStock(order.getOrderItems());
        
        cartService.clearCart(userId);

        invalidateOrderCache(userId);

        log.info("주문 생성 완료: userId={}, orderNumber={}, totalAmount={}", 
                userId, order.getOrderNumber(), order.getTotalAmount());

        return OrderResponse.from(order);
    }

    public OrderResponse getOrderById(Long userId, Long orderId) {
        Order order = orderRepository.findByIdWithItems(orderId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ORDER_NOT_FOUND));

        if (!order.getUser().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED);
        }

        return OrderResponse.from(order);
    }

    public OrderResponse getOrderByOrderNumber(Long userId, String orderNumber) {
        Order order = orderRepository.findByOrderNumber(orderNumber)
                .orElseThrow(() -> new BusinessException(ErrorCode.ORDER_NOT_FOUND));

        if (!order.getUser().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED);
        }

        return OrderResponse.from(order);
    }

    public PageResponse<OrderResponse> getOrdersByUserId(Long userId, Pageable pageable) {
        String cacheKey = "orders:user:" + userId + ":page:" + pageable.getPageNumber();
        
        Object cachedOrders = cacheService.get(cacheKey);
        if (cachedOrders instanceof PageResponse) {
            log.debug("주문 목록 캐시에서 조회: userId={}", userId);
            return (PageResponse<OrderResponse>) cachedOrders;
        }

        Page<Order> orderPage = orderRepository.findByUserId(userId, pageable);
        PageResponse<OrderResponse> response = PageResponse.of(
                orderPage.map(OrderResponse::fromWithoutItems)
        );

        cacheService.put(cacheKey, response, ORDER_CACHE_DURATION);
        log.debug("주문 목록 DB에서 조회 후 캐시 저장: userId={}", userId);

        return response;
    }

    @Transactional
    public OrderResponse cancelOrder(Long userId, Long orderId, String cancelReason) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ORDER_NOT_FOUND));

        if (!order.getUser().getId().equals(userId)) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED);
        }

        if (!order.canCancel()) {
            throw new BusinessException(ErrorCode.ORDER_CANNOT_CANCEL);
        }

        order.updateOrderStatus(OrderStatus.CANCELLED);

        restoreProductStock(order.getOrderItems());

        if (order.getPayment() != null && order.getPayment().canCancel()) {
            order.getPayment().updateStatus(PaymentStatus.CANCELLED);
            order.getPayment().setCancelReason(cancelReason);
        }

        orderRepository.save(order);
        invalidateOrderCache(userId);

        log.info("주문 취소 완료: userId={}, orderId={}, reason={}", userId, orderId, cancelReason);

        return OrderResponse.from(order);
    }

    public Long countOrdersByUserId(Long userId) {
        return orderRepository.countByUserId(userId);
    }

    private void validateCartItems(List<CartItem> cartItems) {
        for (CartItem cartItem : cartItems) {
            Product product = cartItem.getProduct();
            
            if (product.getStatus() != ProductStatus.ACTIVE) {
                throw new BusinessException(ErrorCode.PRODUCT_NOT_AVAILABLE);
            }
            
            if (!product.isInStock() || product.getStockQuantity() < cartItem.getQuantity()) {
                throw new BusinessException(ErrorCode.INSUFFICIENT_STOCK);
            }
        }
    }

    private Order buildOrderFromCart(User user, Cart cart, CreateOrderRequest request) {
        BigDecimal subtotalAmount = calculateSubtotalAmount(cart.getCartItems());
        BigDecimal shippingFee = calculateShippingFee(subtotalAmount);
        BigDecimal totalAmount = subtotalAmount.add(shippingFee);

        CreateOrderRequest.ShippingAddressDto shippingDto = request.getShippingAddress();
        
        Order order = Order.builder()
                .user(user)
                .paymentMethod(request.getPaymentMethod())
                .orderMemo(request.getOrderMemo())
                .shippingRecipient(shippingDto.getRecipient())
                .shippingPhone(shippingDto.getPhone())
                .shippingZipcode(shippingDto.getZipcode())
                .shippingAddress(shippingDto.getAddress())
                .shippingDetailAddress(shippingDto.getDetailAddress())
                .subtotalAmount(subtotalAmount)
                .shippingFee(shippingFee)
                .totalAmount(totalAmount)
                .build();

        for (CartItem cartItem : cart.getCartItems()) {
            OrderItem orderItem = OrderItem.createFromProduct(cartItem.getProduct(), cartItem.getQuantity());
            order.addOrderItem(orderItem);
        }

        return order;
    }

    private BigDecimal calculateSubtotalAmount(List<CartItem> cartItems) {
        return cartItems.stream()
                .map(item -> item.getProduct().getEffectivePrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateShippingFee(BigDecimal subtotalAmount) {
        return subtotalAmount.compareTo(FREE_SHIPPING_THRESHOLD) >= 0 ? BigDecimal.ZERO : SHIPPING_FEE;
    }

    public PageResponse<OrderResponse> getOrdersByUserIdAndStatus(Long userId, OrderStatus status, Pageable pageable) {
        Page<Order> orderPage = orderRepository.findByUserIdAndOrderStatus(userId, status, pageable);
        return PageResponse.of(orderPage.map(OrderResponse::fromWithoutItems));
    }

    private void setShippingInfoFromDto(Order order, CreateOrderRequest.ShippingAddressDto dto) {
        // 임시로 빌더 패턴으로 새 주문 생성 시 설정
        // Order 엔티티에 setter 메서드 추가 필요
    }

    private void setShippingInfoFromUserAddress(Order order, User user, Long addressId) {
        // UserAddress 엔티티 조회 후 Order에 설정 (향후 구현)
        // 현재는 CreateOrderRequest.ShippingAddressDto 사용
    }

    @Transactional
    public void reduceProductStock(List<OrderItem> orderItems) {
        for (OrderItem orderItem : orderItems) {
            productService.reduceStock(orderItem.getProduct().getId(), orderItem.getQuantity());
        }
    }

    @Transactional
    public void restoreProductStock(List<OrderItem> orderItems) {
        for (OrderItem orderItem : orderItems) {
            productService.increaseStock(orderItem.getProduct().getId(), orderItem.getQuantity());
        }
    }

    private void invalidateOrderCache(Long userId) {
        String cachePattern = "orders:user:" + userId + ":*";
        cacheService.deletePattern(cachePattern);
    }
}