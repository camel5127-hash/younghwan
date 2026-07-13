package com.seoulink.backend.dto;

import lombok.Getter;

@Getter
public class ProfileUpdateRequestDto {
    private Long memberId;
    private String name;
    private String nickname;
    private String phone;
    private String newPassword;
}