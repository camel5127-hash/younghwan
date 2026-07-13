import {
    Bot,
    Building2,
    Coffee,
    Heart,
    Hotel,
    Landmark,
    Map,
    MapPinned,
    Menu,
    MessageSquareText,
    MoonStar,
    ShoppingBag,
    Sparkles,
    TreePine,
    User,
    Utensils,
    LogOut,
    CreditCard,
    Route,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MainPage.css";

const categories = [
    { label: "지도", icon: Map, color: "blue" },
    { label: "궁궐·문화", icon: Landmark, color: "gray" },
    { label: "자연·한강", icon: TreePine, color: "sky" },
    { label: "데이트", icon: Heart, color: "pink" },
    { label: "맛집 탐방", icon: Utensils, color: "yellow" },
    { label: "카페 투어", icon: Coffee, color: "brown" },
    { label: "쇼핑·핫플", icon: ShoppingBag, color: "purple" },
    { label: "야경", icon: MoonStar, color: "indigo" },
    { label: "숙소", icon: Hotel, color: "mint" },
];

export default function MainPage() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const savedMember = localStorage.getItem("member");
    const member = savedMember ? JSON.parse(savedMember) : null;
    const isLoggedIn = !!member;

    const handleLogout = () => {
        localStorage.removeItem("member");
        localStorage.removeItem("accessToken");
        alert("로그아웃되었습니다.");
        setMenuOpen(false);
        navigate("/");
    };

    return (
        <main className="main-home">
            <section className="main-hero">
                <header className="main-header">
                    <button
                        className="brand"
                        type="button"
                        onClick={() => navigate("/")}
                    >
                        <span className="brand-logo">SL</span>
                        <strong>
                            SEOUL<span>LINK</span>
                        </strong>
                    </button>

                    <nav className="main-nav">
                        <button type="button">
                            <Heart size={22} />
                            추천 코스
                        </button>

                        <button type="button">
                            <MapPinned size={22} />
                            지도 코스 만들기
                        </button>

                        <button type="button">
                            <MessageSquareText size={22} />
                            방문 후기
                        </button>

                        <button type="button">
                            <Bot size={22} />
                            AI 여행 챗봇
                        </button>
                    </nav>

                    <div className="header-actions">
                        {isLoggedIn ? (
                            <button
                                className="user-pill"
                                type="button"
                                onClick={() => navigate("/mypage")}
                            >
                                <User size={21} />
                                {member.name || "회원"}님
                            </button>
                        ) : (
                            <button
                                className="user-pill"
                                type="button"
                                onClick={() => navigate("/login")}
                            >
                                <User size={21} />
                                로그인 / 회원가입
                            </button>
                        )}

                        <button
                            className="menu-btn"
                            type="button"
                            onClick={() => setMenuOpen((prev) => !prev)}
                            aria-label="메뉴 열기"
                        >
                            <Menu size={28} />
                        </button>
                    </div>

                    {menuOpen && (
                        <aside className="floating-menu">
                            {isLoggedIn ? (
                                <>
                                    <button type="button">
                                        <Route size={22} />
                                        내 코스 보기
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => navigate("/mypage")}
                                    >
                                        <User size={22} />
                                        마이페이지
                                    </button>

                                    <button type="button">
                                        <CreditCard size={22} />
                                        이용권 / 결제
                                    </button>

                                    <div className="menu-divider" />

                                    <button type="button" onClick={handleLogout}>
                                        <LogOut size={22} />
                                        로그아웃
                                    </button>
                                </>
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => navigate("/login")}
                                >
                                    <User size={22} />
                                    로그인 / 회원가입
                                </button>
                            )}
                        </aside>
                    )}
                </header>

                <div className="hero-copy">
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

                    <div className="hero-actions">
                        <button className="primary-action" type="button">
                            <Sparkles size={24} />
                            취향 검사 시작
                        </button>

                        <button className="secondary-action" type="button">
                            <Map size={24} />
                            추천 코스 보기
                        </button>
                    </div>
                </div>
            </section>

            <section className="category-panel">
                {categories.map(({ label, icon: Icon, color }) => (
                    <button className="category-item" type="button" key={label}>
                        <span className={`category-icon ${color}`}>
                            <Icon size={28} />
                        </span>
                        <strong>{label}</strong>
                    </button>
                ))}
            </section>

            <section className="theme-section">
                <div className="theme-title">
                    <div>
                        <h2>
                            <Sparkles size={28} />
                            인기 테마 추천 코스
                        </h2>
                        <p>
                            아직 추천받은 코스가 없어 테마별 코스 중 인기가 많은 코스를 보여드려요.
                        </p>
                    </div>

                    <button type="button">전체 보기</button>
                </div>

                <div className="theme-empty">
                    <Building2 size={38} />
                    <strong>추천 코스를 준비 중이에요</strong>
                    <p>취향 검사를 완료하면 나에게 맞는 서울 코스를 보여드릴게요.</p>
                </div>
            </section>
        </main>
    );
}