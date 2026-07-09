package com.seoulink.backend.dto;

import com.seoulink.backend.entity.Member;
import com.seoulink.backend.entity.MemberStatus;

public class SignupResponseDto {

    private Long memberId;
    private String email;
    private String name;
    private String nickname;
    private String phone;
    private MemberStatus status;

    public SignupResponseDto(Member member) {
        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.nickname = member.getNickname();
        this.phone = member.getPhone();
        this.status = member.getStatus();
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

    public String getNickname() {
        return nickname;
    }

    public String getPhone() {
        return phone;
    }

    public MemberStatus getStatus() {
        return status;
    }
}