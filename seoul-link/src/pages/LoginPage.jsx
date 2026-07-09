import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, LockKeyhole, UserRound } from "lucide-react";
import Header from "../component/Header";
import PageBackground from "../component/PageBackground";
import "../styles/LoginPage.css";

const API = "http://localhost:8080/api";

export default function LoginPage() {
    const navigate = useNavigate();

    const [loginId, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("");

    const submitLogin = async (event) => {
        event.preventDefault();

        try {
            setMessage("");

            const response = await fetch(`${API}/members/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    loginId,
                    password,
                }),
            });

            const text = await response.text();

            if (!response.ok) {
                throw new Error(text || "로그인에 실패했습니다.");
            }

            const member = JSON.parse(text);
            localStorage.setItem("member", JSON.stringify(member));

            alert(`${member.name}님 환영합니다.`);
            navigate("/");
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <PageBackground>
            <Header />

            <main className="login-screen">
                <section className="login-intro">
                    <h1>
                        오늘의 서울은,
                        <br />
                        당신의 <span>취향</span>으로
                        <br />
                        이어집니다
                    </h1>

                    <p>
                        감성 가득한 서울 여행,
                        <br />
                        나만의 코스로 발견해보세요.
                    </p>
                </section>

                <section className="login-card" aria-label="로그인">
                    <div className="login-card-header">
                        <h2>로그인</h2>
                        <p>SEOULLINK 계정으로 로그인하세요</p>
                    </div>

                    <form className="login-form" onSubmit={submitLogin}>
                        <label className="input-group">
                            <span>아이디</span>

                            <div className="input-box">
                                <UserRound size={21} />
                                <input
                                    type="text"
                                    value={loginId}
                                    onChange={(event) => setLoginId(event.target.value)}
                                    placeholder="아이디를 입력하세요"
                                />
                            </div>
                        </label>

                        <label className="input-group">
                            <span>비밀번호</span>

                            <div className="input-box">
                                <LockKeyhole size={20} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    placeholder="비밀번호를 입력하세요"
                                />

                                <button
                                    type="button"
                                    className="icon-button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <Eye size={21} />
                                </button>
                            </div>
                        </label>

                        {message && <p className="login-error">{message}</p>}

                        <button type="submit" className="login-button">
                            로그인
                        </button>

                        <div className="divider">
                            <span />
                            <em>또는</em>
                            <span />
                        </div>

                        <button
                            type="button"
                            className="join-button"
                            onClick={() => navigate("/signup")}
                        >
                            회원가입
                        </button>
                    </form>
                </section>
            </main>
        </PageBackground>
    );
}