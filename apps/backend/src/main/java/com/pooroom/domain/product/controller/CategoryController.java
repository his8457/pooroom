package com.pooroom.domain.product.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.domain.product.dto.CategoryResponse;
import com.pooroom.domain.product.entity.Category;
import com.pooroom.domain.product.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories() {
        List<Category> categories = categoryService.findAllActiveCategories();
        List<CategoryResponse> response = categories.stream()
                .map(CategoryResponse::from)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/root")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getRootCategories() {
        List<Category> categories = categoryService.findRootCategories();
        List<CategoryResponse> response = categories.stream()
                .map(CategoryResponse::from)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<CategoryResponse>> getCategory(@PathVariable Long id) {
        Category category = categoryService.findById(id);
        CategoryResponse response = CategoryResponse.from(category);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}/children")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getChildCategories(@PathVariable Long id) {
        List<Category> categories = categoryService.findChildCategories(id);
        List<CategoryResponse> response = categories.stream()
                .map(CategoryResponse::from)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/level/{level}")
    public ResponseEntity<ApiResponse<List<CategoryResponse>>> getCategoriesByLevel(@PathVariable Integer level) {
        List<Category> categories = categoryService.findByLevel(level);
        List<CategoryResponse> response = categories.stream()
                .map(CategoryResponse::from)
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}