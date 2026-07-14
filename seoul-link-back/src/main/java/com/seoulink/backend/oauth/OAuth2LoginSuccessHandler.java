package com.seoulink.backend.oauth;

import com.seoulink.backend.dto.LoginResponseDto;
import com.seoulink.backend.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Map;

@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final MemberService memberService;

    public OAuth2LoginSuccessHandler(MemberService memberService) {
        this.memberService = memberService;
    }

    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;

        String registrationId = oauthToken.getAuthorizedClientRegistrationId();
        OAuth2User oAuth2User = oauthToken.getPrincipal();

        String email = null;
        String name = null;

        if ("google".equals(registrationId)) {
            email = oAuth2User.getAttribute("email");
            name = oAuth2User.getAttribute("name");
        }

        if ("kakao".equals(registrationId)) {
            Map<String, Object> kakaoAccount =
                    (Map<String, Object>) oAuth2User.getAttributes().get("kakao_account");

            Map<String, Object> properties =
                    (Map<String, Object>) oAuth2User.getAttributes().get("properties");

            if (kakaoAccount != null) {
                email = (String) kakaoAccount.get("email");
            }

            if (properties != null) {
                name = (String) properties.get("nickname");
            }

            if (name == null || name.isBlank()) {
                name = "카카오회원";
            }
        }

        if ("naver".equals(registrationId)) {
            Map<String, Object> responseMap =
                    (Map<String, Object>) oAuth2User.getAttributes().get("response");

            if (responseMap != null) {
                email = (String) responseMap.get("email");
                name = (String) responseMap.get("name");

                if (name == null || name.isBlank()) {
                    name = (String) responseMap.get("nickname");
                }
            }

            if (name == null || name.isBlank()) {
                name = "네이버회원";
            }
        }

        LoginResponseDto loginResponse =
                memberService.socialLogin(registrationId, email, name);

        String redirectUrl = "http://localhost:5173/oauth-success"
                + "?memberId=" + loginResponse.getMemberId()
                + "&email=" + encode(loginResponse.getEmail())
                + "&name=" + encode(loginResponse.getName())
                + "&loginType=" + encode(loginResponse.getLoginType());

        response.sendRedirect(redirectUrl);
    }

    private String encode(String value) {
        return URLEncoder.encode(value != null ? value : "", StandardCharsets.UTF_8);
    }
}