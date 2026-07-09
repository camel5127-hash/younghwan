import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import PageBackground from "../component/PageBackground";
import "../styles/LoginPage.css";

const API = "http://localhost:8080/api";

export default function SignupPage() {
    const navigate = useNavigate();

    const [idChecked, setIdChecked] = useState(false);
    const [message, setMessage] = useState("");

    const [form, setForm] = useState({
        loginId: "",
        password: "",
        passwordConfirm: "",
        name: "",
        nickname: "",
        email: "",
    });

    const change = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value,
        });

        if (name === "loginId") {
            setIdChecked(false);
        }
    };

    const checkLoginId = async () => {
        try {
            setMessage("");

            if (!form.loginId) {
                alert("아이디를 입력해주세요.");
                return;
            }

            const response = await fetch(
                `${API}/members/check-login-id?loginId=${encodeURIComponent(form.loginId)}`
            );

            if (!response.ok) {
                throw new Error("아이디 중복검사에 실패했습니다.");
            }

            const available = await response.json();

            if (available) {
                alert("사용 가능한 아이디입니다.");
                setIdChecked(true);
            } else {
                alert("이미 사용 중인 아이디입니다.");
                setIdChecked(false);
            }
        } catch (error) {
            setMessage(error.message);
        }
    };

    const submitSignup = async (event) => {
        event.preventDefault();

        try {
            setMessage("");

            if (!idChecked) {
                alert("아이디 중복검사를 해주세요.");
                return;
            }

            if (form.password !== form.passwordConfirm) {
                alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
                return;
            }

            const response = await fetch(`${API}/members/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const text = await response.text();

            if (!response.ok) {
                throw new Error(text || "회원가입에 실패했습니다.");
            }

            const member = JSON.parse(text);
            localStorage.setItem("member", JSON.stringify(member));

            alert("회원가입이 완료되었습니다.");
            navigate("/");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <PageBackground>
            <Header />

            <main className="login-screen signup-screen">
                <section className="login-card signup-card" aria-label="회원가입">
                    <div className="login-card-header">
                        <h2>회원가입</h2>
                        <p>SEOULLINK 계정을 만들어보세요</p>
                    </div>

                    <form className="login-form" onSubmit={submitSignup}>
                        <label className="input-group">
                            <span>아이디</span>
                            <div className="input-box input-box-with-button">
                                <input
                                    name="loginId"
                                    value={form.loginId}
                                    onChange={change}
                                    placeholder="아이디"
                                />
                                <button type="button" onClick={checkLoginId}>
                                    중복검사
                                </button>
                            </div>
                        </label>

                        <label className="input-group">
                            <span>비밀번호</span>
                            <div className="input-box">
                                <input
                                    name="password"
                                    type="password"
                                    value={form.password}
                                    onChange={change}
                                    placeholder="영문+숫자 8자 이상"
                                />
                            </div>
                        </label>

                        <label className="input-group">
                            <span>비밀번호 확인</span>
                            <div className="input-box">
                                <input
                                    name="passwordConfirm"
                                    type="password"
                                    value={form.passwordConfirm}
                                    onChange={change}
                                    placeholder="비밀번호 다시 입력"
                                />
                            </div>
                        </label>

                        <label className="input-group">
                            <span>이름</span>
                            <div className="input-box">
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={change}
                                    placeholder="이름"
                                />
                            </div>
                        </label>

                        <label className="input-group">
                            <span>닉네임</span>
                            <div className="input-box">
                                <input
                                    name="nickname"
                                    value={form.nickname}
                                    onChange={change}
                                    placeholder="닉네임"
                                />
                            </div>
                        </label>

                        <label className="input-group">
                            <span>이메일</span>
                            <div className="input-box">
                                <input
                                    name="email"
                                    value={form.email}
                                    onChange={change}
                                    placeholder="email@example.com"
                                />
                            </div>
                        </label>

                        {message && <p className="login-error">{message}</p>}

                        <button type="submit" className="login-button">
                            회원가입
                        </button>

                        <button
                            type="button"
                            className="join-button"
                            onClick={() => navigate("/login")}
                        >
                            로그인으로 돌아가기
                        </button>
                    </form>
                </section>
            </main>
        </PageBackground>
    );
}