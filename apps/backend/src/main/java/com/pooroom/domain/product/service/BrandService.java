package com.pooroom.domain.product.service;

import com.pooroom.common.exception.BusinessException;
import com.pooroom.common.exception.ErrorCode;
import com.pooroom.domain.product.entity.Brand;
import com.pooroom.domain.product.repository.BrandRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BrandService {

    private final BrandRepository brandRepository;

    public Brand findById(Long id) {
        return brandRepository.findById(id)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public Brand findByName(String name) {
        return brandRepository.findByName(name)
                .orElseThrow(() -> new BusinessException(ErrorCode.ENTITY_NOT_FOUND));
    }

    public List<Brand> findAllActiveBrands() {
        return brandRepository.findActiveBrands(true);
    }

    public boolean existsByName(String name) {
        return brandRepository.existsByName(name);
    }

    public long countActiveProductsByBrand(Long brandId) {
        return brandRepository.countActiveProductsByBrand(brandId);
    }
}