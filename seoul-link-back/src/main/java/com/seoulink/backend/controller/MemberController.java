package com.seoulink.backend.controller;

import com.seoulink.backend.dto.SignupResponseDto;
import com.seoulink.backend.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.seoulink.backend.dto.LoginRequestDto;
import com.seoulink.backend.dto.LoginResponseDto;
import com.seoulink.backend.dto.PasswordResetRequestDto;
import java.util.Map;
import com.seoulink.backend.dto.ProfileUpdateRequestDto;
import com.seoulink.backend.dto.ProfileVerifyRequestDto;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping("/signup")
    public ResponseEntity<SignupResponseDto> signup(@Valid @RequestBody SignupResponseDto requestDto) {
        SignupResponseDto responseDto = memberService.signup(requestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(responseDto);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDto> login(@RequestBody LoginRequestDto requestDto) {
        LoginResponseDto responseDto = memberService.login(requestDto);
        return ResponseEntity.ok(responseDto);
    }

    @PostMapping("/password/reset")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody PasswordResetRequestDto requestDto) {
        memberService.resetPassword(requestDto);
        return ResponseEntity.ok(Map.of("message", "비밀번호가 변경되었습니다."));
    }

    @PostMapping("/profile/verify")
    public ResponseEntity<?> verifyProfilePassword(@RequestBody ProfileVerifyRequestDto requestDto) {
        memberService.verifyProfilePassword(requestDto);
        return ResponseEntity.ok(Map.of("message", "비밀번호 확인 완료"));
    }

    @PutMapping("/profile")
    public ResponseEntity<LoginResponseDto> updateProfile(@RequestBody ProfileUpdateRequestDto requestDto) {
        LoginResponseDto responseDto = memberService.updateProfile(requestDto);
        return ResponseEntity.ok(responseDto);
    }
}