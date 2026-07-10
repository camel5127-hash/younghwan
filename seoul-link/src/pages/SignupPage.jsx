import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import PageBackground from "../component/PageBackground";
import "../styles/SignupPage.css";

export default function SignupPage() {
    const navigate = useNavigate();

    return (
        <PageBackground>
            <Header />

            <main className="signup-container">
                <section className="signup-card">
                    <p className="signup-small">회원가입</p>

                    <h1 className="signup-title">
                        서울 여행을 함께할
                        <br />
                        계정을 만들어보세요
                    </h1>

                    <div className="signup-form">
                        <div className="form-group">
                            <label htmlFor="email">이메일</label>
                            <input
                                id="email"
                                type="email"
                                placeholder="이메일을 입력해주세요"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="passwordCheck">비밀번호 확인</label>
                            <input
                                id="passwordCheck"
                                type="password"
                                placeholder="비밀번호를 다시 입력해주세요"
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="name">이름</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="이름"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="nickname">닉네임</label>
                                <input
                                    id="nickname"
                                    type="text"
                                    placeholder="닉네임"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">전화번호</label>
                            <input
                                id="phone"
                                type="tel"
                                placeholder="010-0000-0000"
                            />
                        </div>
                    </div>

                    <label className="agree-box">
                        <input type="checkbox" />
                        <span>이용약관 및 개인정보 처리방침에 동의합니다</span>
                    </label>

                    <button className="signup-btn" type="button">
                        회원가입
                    </button>

                    <p className="login-link">
                        이미 계정이 있으신가요?
                        <span onClick={() => navigate("/login")}>
                            로그인
                        </span>
                    </p>
                </section>
            </main>
        </PageBackground>
    );
}