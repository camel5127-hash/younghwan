package com.seoulink.backend.dto;

import lombok.Getter;

@Getter
public class ProfileVerifyRequestDto {
    private Long memberId;
    private String password;
}