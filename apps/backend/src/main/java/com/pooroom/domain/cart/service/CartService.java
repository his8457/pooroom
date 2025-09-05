package com.pooroom.domain.cart.service;

import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.common.service.CacheService;
import com.pooroom.domain.cart.dto.AddToCartRequest;
import com.pooroom.domain.cart.dto.CartResponse;
import com.pooroom.domain.cart.dto.UpdateCartItemRequest;
import com.pooroom.domain.cart.entity.Cart;
import com.pooroom.domain.cart.entity.CartItem;
import com.pooroom.domain.cart.repository.CartItemRepository;
import com.pooroom.domain.cart.repository.CartRepository;
import com.pooroom.domain.product.entity.Product;
import com.pooroom.domain.product.entity.ProductStatus;
import com.pooroom.domain.product.service.ProductService;
import com.pooroom.domain.user.entity.User;
import com.pooroom.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductService productService;
    private final UserService userService;
    private final CacheService cacheService;

    private static final Duration CART_CACHE_DURATION = Duration.ofMinutes(15);

    public CartResponse getCartByUserId(Long userId) {
        String cacheKey = "cart:user:" + userId;
        
        Object cachedCart = cacheService.get(cacheKey);
        if (cachedCart instanceof CartResponse) {
            log.debug("장바구니 캐시에서 조회: userId={}", userId);
            return (CartResponse) cachedCart;
        }

        Cart cart = cartRepository.findByUserIdWithItems(userId)
                .orElse(null);

        CartResponse response;
        if (cart == null) {
            response = CartResponse.builder()
                    .userId(userId)
                    .items(java.util.Collections.emptyList())
                    .totalItemCount(0)
                    .totalPrice(java.math.BigDecimal.ZERO)
                    .build();
        } else {
            response = CartResponse.from(cart);
        }

        cacheService.put(cacheKey, response, CART_CACHE_DURATION);
        log.debug("장바구니 DB에서 조회 후 캐시 저장: userId={}", userId);

        return response;
    }

    @Transactional
    public CartResponse addToCart(Long userId, AddToCartRequest request) {
        User user = userService.findById(userId);
        Product product = productService.findById(request.getProductId());

        validateProduct(product);
        validateStock(product, request.getQuantity());

        Cart cart = getOrCreateCart(user);
        
        Optional<CartItem> existingItem = cartItemRepository
                .findByCartIdAndProductId(cart.getId(), product.getId());

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            int newQuantity = item.getQuantity() + request.getQuantity();
            validateStock(product, newQuantity);
            item.updateQuantity(newQuantity);
            cartItemRepository.save(item);
        } else {
            CartItem newItem = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(request.getQuantity())
                    .unitPrice(product.getEffectivePrice())
                    .build();
            cartItemRepository.save(newItem);
            cart.addItem(newItem);
        }

        cartRepository.save(cart);
        invalidateCartCache(userId);

        log.info("장바구니에 상품 추가: userId={}, productId={}, quantity={}", 
                userId, request.getProductId(), request.getQuantity());

        return getCartByUserId(userId);
    }

    @Transactional
    public CartResponse updateCartItem(Long userId, Long cartItemId, UpdateCartItemRequest request) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED);
        }

        validateStock(cartItem.getProduct(), request.getQuantity());
        cartItem.updateQuantity(request.getQuantity());
        cartItemRepository.save(cartItem);

        invalidateCartCache(userId);

        log.info("장바구니 상품 수량 변경: userId={}, cartItemId={}, quantity={}", 
                userId, cartItemId, request.getQuantity());

        return getCartByUserId(userId);
    }

    @Transactional
    public CartResponse removeFromCart(Long userId, Long cartItemId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        CartItem cartItem = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));

        if (!cartItem.getCart().getId().equals(cart.getId())) {
            throw new BusinessException(ErrorCode.ACCESS_DENIED);
        }

        cart.removeItem(cartItem);
        cartItemRepository.delete(cartItem);

        invalidateCartCache(userId);

        log.info("장바구니에서 상품 제거: userId={}, cartItemId={}", userId, cartItemId);

        return getCartByUserId(userId);
    }

    @Transactional
    public void clearCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElse(null);

        if (cart != null) {
            cartItemRepository.deleteAllByCartId(cart.getId());
            cart.clearAllItems();
            cartRepository.save(cart);
            invalidateCartCache(userId);

            log.info("장바구니 전체 삭제: userId={}", userId);
        }
    }

    public int getCartItemCount(Long userId) {
        String cacheKey = "cart:count:" + userId;
        
        Object cachedCount = cacheService.get(cacheKey);
        if (cachedCount instanceof Integer) {
            return (Integer) cachedCount;
        }

        int count = cartRepository.countItemsByUserId(userId);
        cacheService.put(cacheKey, count, Duration.ofMinutes(10));
        
        return count;
    }

    private Cart getOrCreateCart(User user) {
        return cartRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Cart newCart = Cart.builder()
                            .user(user)
                            .build();
                    return cartRepository.save(newCart);
                });
    }

    private void validateProduct(Product product) {
        if (product.getStatus() != ProductStatus.ACTIVE) {
            throw new BusinessException(ErrorCode.PRODUCT_NOT_AVAILABLE);
        }
    }

    private void validateStock(Product product, Integer requestedQuantity) {
        if (!product.isInStock()) {
            throw new BusinessException(ErrorCode.PRODUCT_OUT_OF_STOCK);
        }
        if (product.getStockQuantity() < requestedQuantity) {
            throw new BusinessException(ErrorCode.INSUFFICIENT_STOCK);
        }
    }

    public Cart getCartEntityByUserId(Long userId) {
        return cartRepository.findByUserIdWithItems(userId)
                .orElse(null);
    }

    private void invalidateCartCache(Long userId) {
        cacheService.delete("cart:user:" + userId);
        cacheService.delete("cart:count:" + userId);
    }
}