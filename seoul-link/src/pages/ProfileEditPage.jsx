import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiPut } from "../api/client";

export default function ProfileEditPage() {
    const navigate = useNavigate();

    const savedMember = localStorage.getItem("member");
    const member = savedMember ? JSON.parse(savedMember) : null;

    const [form, setForm] = useState({
        name: member?.name || "",
        nickname: member?.nickname || "",
        phone: member?.phone || "",
        newPassword: "",
        newPasswordConfirm: "",
    });

    useEffect(() => {
        const verified = sessionStorage.getItem("profileVerified");

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

        if (verified !== "true") {
            alert("비밀번호 확인이 필요합니다.");
            navigate("/profile-verify");
        }
    }, [member, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!form.name.trim()) {
            alert("이름을 입력해주세요.");
            return;
        }

        if (form.newPassword && form.newPassword !== form.newPasswordConfirm) {
            alert("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            const updatedMember = await apiPut("/members/profile", {
                memberId: member.memberId,
                name: form.name,
                nickname: form.nickname,
                phone: form.phone,
                newPassword: form.newPassword,
            });

            localStorage.setItem(
                "member",
                JSON.stringify({
                    ...member,
                    ...updatedMember,
                    nickname: form.nickname,
                    phone: form.phone,
                })
            );

            sessionStorage.removeItem("profileVerified");

            alert("회원정보가 수정되었습니다.");
            navigate("/mypage");
        } catch (error) {
            alert(error.message || "회원정보 수정에 실패했습니다.");
        }
    };

    return (
        <main>
            <h1>회원정보 수정</h1>

            <label>
                이메일
                <input value={member?.email || ""} disabled />
            </label>

            <label>
                이름
                <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="이름"
                />
            </label>

            <label>
                닉네임
                <input
                    name="nickname"
                    value={form.nickname}
                    onChange={handleChange}
                    placeholder="닉네임"
                />
            </label>

            <label>
                전화번호
                <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="전화번호"
                />
            </label>

            <label>
                새 비밀번호
                <input
                    type="password"
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="변경하지 않으려면 비워두세요"
                />
            </label>

            <label>
                새 비밀번호 확인
                <input
                    type="password"
                    name="newPasswordConfirm"
                    value={form.newPasswordConfirm}
                    onChange={handleChange}
                    placeholder="새 비밀번호 확인"
                />
            </label>

            <button type="button" onClick={handleSubmit}>
                저장
            </button>

            <button type="button" onClick={() => navigate("/mypage")}>
                취소
            </button>
        </main>
    );
}