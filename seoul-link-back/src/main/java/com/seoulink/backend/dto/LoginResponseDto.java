package com.seoulink.backend.dto;

import com.seoulink.backend.entity.Member;

public class LoginResponseDto {

    private Long memberId;
    private String email;
    private String name;
    private String loginType;

    public LoginResponseDto(Long memberId, String email, String name, String loginType) {
        this.memberId = memberId;
        this.email = email;
        this.name = name;
        this.loginType = loginType;
    }

    public LoginResponseDto(Member member) {
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.loginType = member.getLoginType().name();
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getEmail() {
        return email;
    }

    public String getName() {
        return name;
    }

    public String getLoginType() {
        return loginType;
    }
}