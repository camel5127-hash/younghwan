import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPost } from "../api/client";

export default function ProfileVerifyPage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState("");

    const savedMember = localStorage.getItem("member");
    const member = savedMember ? JSON.parse(savedMember) : null;

    const handleVerify = async () => {
        if (!member) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        if (member.loginType !== "LOCAL") {
            alert("소셜 로그인 회원은 회원정보 수정이 제한됩니다.");
            navigate("/mypage");
            return;
        }

        if (!password.trim()) {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        try {
            await apiPost("/members/profile/verify", {
                memberId: member.memberId,
                password,
            });

            sessionStorage.setItem("profileVerified", "true");
            navigate("/profile-edit");
        } catch (error) {
            alert(error.message || "비밀번호 확인에 실패했습니다.");
        }
    };

    return (
        <main>
            <h1>회원정보 확인</h1>
            <p>회원정보 수정을 위해 현재 비밀번호를 입력해주세요.</p>

            <input
                type="password"
                placeholder="현재 비밀번호"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button type="button" onClick={handleVerify}>
                확인
            </button>

            <button type="button" onClick={() => navigate("/mypage")}>
                취소
            </button>
        </main>
    );
}