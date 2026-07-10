package com.seoulink.backend.dto;

import com.seoulink.backend.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SignupResponseDto {

    private Long memberId;
    private String email;
    private String password;
    private String name;
    private String nickname;
    private String phone;
    public SignupResponseDto(Member member) {

        this.memberId = member.getMemberId();
        this.email = member.getEmail();
        this.name = member.getName();
        this.nickname = member.getNickname();
        this.phone = member.getPhone();
    }
}
