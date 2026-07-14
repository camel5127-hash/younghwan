package com.seoulink.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "MEMBER")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "MEMBER_ID")
    private Long memberId;

    @Column(name = "EMAIL", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "PASSWORD", nullable = false, length = 255)
    private String password;

    @Column(name = "NAME", nullable = false, length = 50)
    private String name;

    @Column(name = "NICKNAME", unique = true, length = 50)
    private String nickname;

    @Column(name = "PHONE", length = 20)
    private String phone;

    @Enumerated(EnumType.STRING)
    @Column(name = "STATUS", nullable = false, length = 20)
    private MemberStatus status;

    @Enumerated(EnumType.STRING)
    @Column(name = "LOGIN_TYPE", nullable = false, length = 20)
    private LoginType loginType;

    @Column(name = "CREATED_AT", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "UPDATED_AT", nullable = false)
    private LocalDateTime updatedAt;

    protected Member() {
    }

    public Member(String email, String password, String name, String nickname, String phone) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.phone = phone;
        this.status = MemberStatus.ACTIVE;
        this.loginType = LoginType.LOCAL;
    }

    public Member(
            String email,
            String password,
            String name,
            String nickname,
            String phone,
            LoginType loginType
    ) {
        this.email = email;
        this.password = password;
        this.name = name;
        this.nickname = nickname;
        this.phone = phone;
        this.status = MemberStatus.ACTIVE;
        this.loginType = loginType;
    }

    @PrePersist
    public void prePersist() {
        LocalDateTime now = LocalDateTime.now();

        this.createdAt = now;
        this.updatedAt = now;

        if (this.status == null) {
            this.status = MemberStatus.ACTIVE;
        }

        if (this.loginType == null) {
            this.loginType = LoginType.LOCAL;
        }
    }

    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getMemberId() {
        return memberId;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
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

    public LoginType getLoginType() {
        return loginType;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void updateProfile(String name, String nickname, String phone) {
        this.name = name;
        this.nickname = nickname;
        this.phone = phone;
        this.updatedAt = LocalDateTime.now();
    }

    public void changePassword(String password) {
        this.password = password;
        this.updatedAt = LocalDateTime.now();
    }

    public void withdraw() {
        this.status = MemberStatus.WITHDRAWN;

        this.email = "withdrawn_" + this.memberId + "@seoulink.local";
        this.password = "WITHDRAWN";
        this.name = "탈퇴회원";
        this.nickname = null;
        this.phone = null;

        this.updatedAt = LocalDateTime.now();
    }
}