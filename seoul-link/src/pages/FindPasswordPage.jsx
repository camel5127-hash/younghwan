import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import PageBackground from "../component/PageBackground";
import { apiPost } from "../api/client";
import "../styles/FindPasswordPage.css";

export default function FindPasswordPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        name: "",
        phone: "",
        newPassword: "",
        newPasswordCheck: "",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleResetPassword = async () => {
        setMessage("");
        setError("");

        if (!form.email || !form.name || !form.phone || !form.newPassword) {
            setError("모든 항목을 입력해주세요.");
            return;
        }

        if (form.newPassword !== form.newPasswordCheck) {
            setError("새 비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            await apiPost("/members/password/reset", {
                email: form.email.trim(),
                name: form.name.trim(),
                phone: form.phone.trim(),
                newPassword: form.newPassword,
            });

            setMessage("비밀번호가 변경되었습니다.");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            setError("일치하는 회원 정보를 찾을 수 없습니다.");
        }
    };

    return (
        <PageBackground>
            <Header />

            <main className="find-password-container">
                <section className="find-password-card">
                    <p className="find-password-small">비밀번호 찾기</p>

                    <h1 className="find-password-title">
                        회원 정보를 확인하고
                        <br />
                        새 비밀번호를 설정하세요
                    </h1>

                    <div className="form-group">
                        <label htmlFor="email">이메일</label>
                        <input
                            id="email"
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="가입한 이메일을 입력해주세요"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">이름</label>
                        <input
                            id="name"
                            type="text"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="이름을 입력해주세요"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">전화번호</label>
                        <input
                            id="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="010-0000-0000"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPassword">새 비밀번호</label>
                        <input
                            id="newPassword"
                            type="password"
                            value={form.newPassword}
                            onChange={handleChange}
                            placeholder="새 비밀번호를 입력해주세요"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="newPasswordCheck">새 비밀번호 확인</label>
                        <input
                            id="newPasswordCheck"
                            type="password"
                            value={form.newPasswordCheck}
                            onChange={handleChange}
                            placeholder="새 비밀번호를 다시 입력해주세요"
                        />
                    </div>

                    {message && <p className="find-password-message success">{message}</p>}
                    {error && <p className="find-password-message error">{error}</p>}

                    <button
                        className="find-password-btn"
                        type="button"
                        onClick={handleResetPassword}
                    >
                        비밀번호 변경
                    </button>

                    <p className="login-link">
                        비밀번호가 기억나셨나요?
                        <span onClick={() => navigate("/login")}>로그인</span>
                    </p>
                </section>
            </main>
        </PageBackground>
    );
}