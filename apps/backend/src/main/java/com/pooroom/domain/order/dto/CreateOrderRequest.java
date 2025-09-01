package com.pooroom.domain.order.dto;

import com.pooroom.domain.order.entity.PaymentMethod;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateOrderRequest {

    @NotNull(message = "{validation.address.id.required}")
    private Long shippingAddressId;

    @NotNull(message = "{validation.payment.method.required}")
    private PaymentMethod paymentMethod;

    @Size(max = 500, message = "{validation.order.memo.maxlength}")
    private String orderMemo;

    @Valid
    private ShippingAddressDto shippingAddress;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ShippingAddressDto {
        
        @NotNull(message = "{validation.recipient.required}")
        @Size(min = 2, max = 50, message = "{validation.recipient.size}")
        private String recipient;

        @NotNull(message = "{validation.phone.required}")
        private String phone;

        @NotNull(message = "{validation.zipcode.required}")
        private String zipcode;

        @NotNull(message = "{validation.address.required}")
        @Size(max = 200, message = "{validation.address.maxlength}")
        private String address;

        @Size(max = 100, message = "{validation.detail.address.maxlength}")
        private String detailAddress;
    }
}