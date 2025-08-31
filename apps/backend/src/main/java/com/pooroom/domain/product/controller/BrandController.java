package com.pooroom.domain.product.controller;

import com.pooroom.common.dto.ApiResponse;
import com.pooroom.domain.product.dto.BrandResponse;
import com.pooroom.domain.product.entity.Brand;
import com.pooroom.domain.product.service.BrandService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandService brandService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<BrandResponse>>> getAllBrands() {
        List<Brand> brands = brandService.findAllActiveBrands();
        List<BrandResponse> response = brands.stream()
                .map(brand -> {
                    long productCount = brandService.countActiveProductsByBrand(brand.getId());
                    return BrandResponse.from(brand, productCount);
                })
                .collect(Collectors.toList());
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<BrandResponse>> getBrand(@PathVariable Long id) {
        Brand brand = brandService.findById(id);
        long productCount = brandService.countActiveProductsByBrand(id);
        BrandResponse response = BrandResponse.from(brand, productCount);
        
        return ResponseEntity.ok(ApiResponse.success(response));
    }
}