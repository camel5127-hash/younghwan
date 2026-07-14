package com.seoulink.backend.service;

import com.seoulink.backend.dto.LoginRequestDto;
import com.seoulink.backend.dto.LoginResponseDto;
import com.seoulink.backend.dto.PasswordResetRequestDto;
import com.seoulink.backend.dto.ProfileUpdateRequestDto;
import com.seoulink.backend.dto.ProfileVerifyRequestDto;
import com.seoulink.backend.dto.SignupResponseDto;
import com.seoulink.backend.entity.LoginType;
import com.seoulink.backend.entity.Member;
import com.seoulink.backend.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional
    public SignupResponseDto signup(SignupResponseDto requestDto) {
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

    @Transactional(readOnly = true)
    public LoginResponseDto login(LoginRequestDto requestDto) {
        Member member = memberRepository.findByEmail(requestDto.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다."));

        if (!passwordEncoder.matches(requestDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("이메일 또는 비밀번호가 올바르지 않습니다.");
        }

        return new LoginResponseDto(member);
    }

    @Transactional
    public void resetPassword(PasswordResetRequestDto requestDto) {
        Member member = memberRepository
                .findByEmailAndNameAndPhone(
                        requestDto.getEmail(),
                        requestDto.getName(),
                        requestDto.getPhone()
                )
                .orElseThrow(() -> new IllegalArgumentException("일치하는 회원 정보를 찾을 수 없습니다."));

        String encodedPassword = passwordEncoder.encode(requestDto.getNewPassword());

        member.changePassword(encodedPassword);
    }

    @Transactional
    public LoginResponseDto socialLogin(String provider, String email, String name) {
        LoginType loginType = resolveLoginType(provider);

        String socialEmail = email;

        if (socialEmail == null || socialEmail.isBlank()) {
            socialEmail = provider + "_" + UUID.randomUUID() + "@seoulink.social";
        }

        String finalEmail = socialEmail;
        String finalName = name != null && !name.isBlank()
                ? name
                : loginType.name() + "회원";

        Member member = memberRepository.findByEmail(finalEmail)
                .orElseGet(() -> {
                    String randomPassword = passwordEncoder.encode(UUID.randomUUID().toString());

                    Member newMember = new Member(
                            finalEmail,
                            randomPassword,
                            finalName,
                            null,
                            null,
                            loginType
                    );

                    return memberRepository.save(newMember);
                });

        return new LoginResponseDto(member);
    }

    @Transactional(readOnly = true)
    public void verifyProfilePassword(ProfileVerifyRequestDto requestDto) {
        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));

        if (member.getLoginType() != LoginType.LOCAL) {
            throw new IllegalArgumentException("소셜 로그인 회원은 회원정보 수정이 제한됩니다.");
        }

        if (!passwordEncoder.matches(requestDto.getPassword(), member.getPassword())) {
            throw new IllegalArgumentException("비밀번호가 일치하지 않습니다.");
        }
    }

    @Transactional
    public LoginResponseDto updateProfile(ProfileUpdateRequestDto requestDto) {
        Member member = memberRepository.findById(requestDto.getMemberId())
                .orElseThrow(() -> new IllegalArgumentException("회원을 찾을 수 없습니다."));

        if (member.getLoginType() != LoginType.LOCAL) {
            throw new IllegalArgumentException("소셜 로그인 회원은 회원정보 수정이 제한됩니다.");
        }

        member.updateProfile(
                requestDto.getName(),
                requestDto.getNickname(),
                requestDto.getPhone()
        );

        if (requestDto.getNewPassword() != null && !requestDto.getNewPassword().isBlank()) {
            member.changePassword(passwordEncoder.encode(requestDto.getNewPassword()));
        }

        return new LoginResponseDto(member);
    }

    private LoginType resolveLoginType(String provider) {
        if (provider == null) {
            return LoginType.LOCAL;
        }

        return switch (provider.toLowerCase()) {
            case "google" -> LoginType.GOOGLE;
            case "kakao" -> LoginType.KAKAO;
            case "naver" -> LoginType.NAVER;
            default -> LoginType.LOCAL;
        };
    }
}