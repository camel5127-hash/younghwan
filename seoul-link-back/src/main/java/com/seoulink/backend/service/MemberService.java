package com.seoulink.backend.service;

import com.seoulink.backend.dto.SignupRequestDto;
import com.seoulink.backend.dto.SignupResponseDto;
import com.seoulink.backend.entity.Member;
import com.seoulink.backend.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public SignupResponseDto signup(SignupRequestDto requestDto) {

        if (memberRepository.existsByEmail(requestDto.getEmail())) {
            throw new IllegalArgumentException("이미 사용 중인 이메일입니다.");
        }

        if (requestDto.getNickname() != null &&
                !requestDto.getNickname().isBlank() &&
                memberRepository.existsByNickname(requestDto.getNickname())) {
            throw new IllegalArgumentException("이미 사용 중인 닉네임입니다.");
        }

        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());

        Member member = new Member(
                requestDto.getEmail(),
                encodedPassword,
                requestDto.getName(),
                requestDto.getNickname(),
                requestDto.getPhone()
        );

        Member savedMember = memberRepository.save(member);

        return new SignupResponseDto(savedMember);
    }
}