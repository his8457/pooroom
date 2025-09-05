package com.pooroom.domain.product.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.common.dto.PageResponse;
import com.pooroom.domain.product.dto.ProductResponse;
import com.pooroom.domain.product.dto.ProductSearchRequest;
import com.pooroom.domain.product.entity.Product;
import com.pooroom.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Product> productPage = productService.findAllActiveProducts(pageable);
        PageResponse<ProductResponse> response = PageResponse.of(
                productPage.map(ProductResponse::from)
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable Long id) {
        ProductResponse response = productService.findByIdAsDto(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getFeaturedProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Product> productPage = productService.findFeaturedProducts(pageable);
        PageResponse<ProductResponse> response = PageResponse.of(
                productPage.map(ProductResponse::from)
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/new")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getNewProducts() {
        List<Product> products = productService.findNewProducts();
        List<ProductResponse> response = products.stream()
                .map(ProductResponse::from)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/recommended")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getRecommendedProducts() {
        List<Product> products = productService.findRecommendedProducts();
        List<ProductResponse> response = products.stream()
                .map(ProductResponse::from)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/search")
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> searchProducts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Product> productPage = productService.searchProducts(keyword, pageable);
        PageResponse<ProductResponse> response = PageResponse.of(
                productPage.map(ProductResponse::from)
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProductsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Product> productPage = productService.findProductsByCategory(categoryId, pageable);
        PageResponse<ProductResponse> response = PageResponse.of(
                productPage.map(ProductResponse::from)
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/brand/{brandId}")
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> getProductsByBrand(
            @PathVariable Long brandId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Product> productPage = productService.findProductsByBrand(brandId, pageable);
        PageResponse<ProductResponse> response = PageResponse.of(
                productPage.map(ProductResponse::from)
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/filter")
    public ResponseEntity<ApiResponse<PageResponse<ProductResponse>>> filterProducts(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection) {
        
        Sort sort = Sort.by(Sort.Direction.fromString(sortDirection), sortBy);
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Product> productPage;
        
        if (categoryId != null && minPrice != null && maxPrice != null) {
            productPage = productService.findByCategoryAndPriceRange(categoryId, minPrice, maxPrice, pageable);
        } else if (minPrice != null && maxPrice != null) {
            productPage = productService.findProductsByPriceRange(minPrice, maxPrice, pageable);
        } else if (categoryId != null) {
            productPage = productService.findProductsByCategory(categoryId, pageable);
        } else {
            productPage = productService.findAllActiveProducts(pageable);
        }
        
        PageResponse<ProductResponse> response = PageResponse.of(
                productPage.map(ProductResponse::from)
        );
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}