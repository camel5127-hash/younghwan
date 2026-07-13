import {
    Bed,
    Bookmark,
    Coffee,
    Landmark,
    LogOut,
    Map,
    Menu,
    MessageCircle,
    PencilLine,
    Route,
    Search,
    Sparkles,
    User,
    Utensils,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/MyPage.css";

const travelTypeMap = {
    A: "활동형",
    H: "역사형",
    M: "현대형",
    B: "가성비형",
    L: "럭셔리형",
    S: "안정형",
    D: "도파민형",
    R: "휴식형",
    P: "빽빽한 일정형",
    T: "역사형",
};

const myCourses = [
    {
        title: "북촌 감성 산책",
        area: "종로구",
        places: 5,
        imageClass: "museum",
    },
];

const savedCourses = [
    {
        title: "성수 카페 투어",
        area: "성수동",
        places: 6,
        imageClass: "night",
    },
];

const likedGroups = [
    { label: "찜한 관광지", count: 8, icon: Landmark },
    { label: "찜한 식당", count: 5, icon: Utensils },
    { label: "찜한 카페", count: 11, icon: Coffee },
    { label: "찜한 숙소", count: 3, icon: Bed },
];

const reviews = [
    {
        title: "북촌 골목에서 만난 오후",
        meta: "좋아요 128 · 댓글 23",
    },
];

const comments = [
    {
        title: "성수 카페 거리 추천",
        text: "저도 여기 다녀왔어요!",
    },
];

function parseTravelType(code) {
    return code
        .split("")
        .map((key) => travelTypeMap[key])
        .filter(Boolean)
        .join(", ");
}

function getLoginTypeLabel(loginType) {
    switch (loginType) {
        case "GOOGLE":
            return "Google 로그인";
        case "KAKAO":
            return "카카오 로그인";
        case "NAVER":
            return "네이버 로그인";
        case "LOCAL":
        default:
            return "일반 로그인";
    }
}

export default function MyPage() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const savedMember = localStorage.getItem("member");
    const member = savedMember ? JSON.parse(savedMember) : null;

    const travelCode = "ATBSP";
    const travelDescription = parseTravelType(travelCode);
    const loginTypeLabel = getLoginTypeLabel(member?.loginType);

    const handleLogout = () => {
        localStorage.removeItem("member");
        localStorage.removeItem("accessToken");
        navigate("/login");
    };

    return (
        <main className="mypage-fixed">
            <header className="mypage-topbar">
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

                <nav className="mypage-main-nav">
                    <button type="button">추천 코스</button>
                    <button type="button">지도 코스 만들기</button>
                    <button type="button">방문 후기</button>
                    <button type="button">AI 여행 챗봇</button>
                    <button className="active" type="button">
                        마이페이지
                    </button>
                </nav>

                <div className="topbar-actions">
                    <button className="icon-btn" type="button">
                        <Search size={21} />
                    </button>

                    <button className="user-pill" type="button">
                        <User size={20} />
                        {member?.name || "김가네"}님
                    </button>

                    <button
                        className="menu-btn"
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                    >
                        <Menu size={27} />
                    </button>
                </div>

                {menuOpen && (
                    <aside className="floating-menu">
                        <button type="button" onClick={() => navigate("/")}>
                            <Map size={22} />
                            메인으로
                        </button>

                        <button type="button">
                            <Route size={22} />
                            내 코스 보기
                        </button>

                        <button type="button">
                            <Bookmark size={22} />
                            찜목록
                        </button>

                        <div className="menu-divider" />

                        <button type="button" onClick={handleLogout}>
                            <LogOut size={22} />
                            로그아웃
                        </button>
                    </aside>
                )}
            </header>

            <section className="mypage-stage">
                <aside className="mypage-intro">
                    <span className="intro-badge">MY TRAVEL STORAGE</span>

                    <h1>
                        {member?.name || "김가네"}님의
                        <br />
                        서울 여행 보관함
                    </h1>

                    <p>
                        여행 유형 검사 결과부터 직접 만든 코스, 저장한 코스,
                        찜한 장소와 나의 기록까지 한 화면에서 이어서 관리하세요.
                    </p>

                    <div className="intro-feature">
                        <span>
                            <Sparkles size={24} />
                        </span>
                        <div>
                            <strong>내 여행 유형 코드</strong>
                            <p>
                                {travelCode} · {travelDescription}
                            </p>
                        </div>
                    </div>

                    <div className="intro-feature">
                        <span>
                            <Route size={24} />
                        </span>
                        <div>
                            <strong>이어 짜는 여행 계획</strong>
                            <p>저장한 코스와 찜목록을 다시 불러올 수 있어요.</p>
                        </div>
                    </div>

                    <div className="intro-feature">
                        <span>
                            <MessageCircle size={24} />
                        </span>
                        <div>
                            <strong>내 여행 기록</strong>
                            <p>작성한 후기와 댓글을 모아 확인해요.</p>
                        </div>
                    </div>
                </aside>

                <section className="storage-panel">
                    <div className="panel-head">
                        <div>
                            <p>마이페이지</p>
                            <h2>개인 여행 기록</h2>
                        </div>

                        <div className="panel-actions">
                            <button
                                className="profile-edit-action"
                                type="button"
                                onClick={() => navigate("/profile-edit")}
                            >
                                <User size={18} />
                                회원정보 수정
                            </button>

                            <button className="type-retest-action" type="button">
                                <Sparkles size={18} />
                                유형 다시 검사
                            </button>
                        </div>
                    </div>

                    <div className="type-summary">
                        <div className="code-box">
                            <span>여행 유형 검사 결과 코드</span>
                            <strong>{travelCode}</strong>
                        </div>

                        <div className="code-desc">
                            <span>코드 해석</span>
                            <strong>{travelDescription}</strong>
                            <p>
                                활동적인 코스를 선호하고 역사적 장소에 관심이 많으며,
                                가성비와 안정성을 중요하게 생각하는 빽빽한 일정형
                                여행자입니다. 현재 로그인 방식은 {loginTypeLabel}입니다.
                            </p>
                        </div>
                    </div>

                    <div className="storage-layout">
                        <article className="mini-card course-card">
                            <div className="mini-head">
                                <span>
                                    <Route size={22} />
                                </span>
                                <div>
                                    <p>직접 만든 코스</p>
                                    <h3>내 코스</h3>
                                </div>
                            </div>

                            {myCourses.map((course) => (
                                <div className="course-preview-row" key={course.title}>
                                    <div className="course-info">
                                        <strong>{course.title}</strong>
                                        <span>
                                            {course.area} · {course.places}개 장소
                                        </span>
                                    </div>

                                    <div className={`course-thumb ${course.imageClass}`}>
                                        <span>대표 장소</span>
                                    </div>
                                </div>
                            ))}
                        </article>

                        <article className="mini-card course-card">
                            <div className="mini-head">
                                <span>
                                    <Bookmark size={22} />
                                </span>
                                <div>
                                    <p>추천받고 저장한 코스</p>
                                    <h3>저장 코스</h3>
                                </div>
                            </div>

                            {savedCourses.map((course) => (
                                <div className="course-preview-row" key={course.title}>
                                    <div className="course-info">
                                        <strong>{course.title}</strong>
                                        <span>
                                            {course.area} · {course.places}개 장소
                                        </span>
                                    </div>

                                    <div className={`course-thumb ${course.imageClass}`}>
                                        <span>대표 장소</span>
                                    </div>
                                </div>
                            ))}
                        </article>

                        <article className="mini-card like-card">
                            <div className="mini-head">
                                <span>
                                    <Bookmark size={22} />
                                </span>
                                <div>
                                    <p>찜한 보관함</p>
                                    <h3>찜목록</h3>
                                </div>
                            </div>

                            <div className="like-grid">
                                {likedGroups.map(({ label, count, icon: Icon }) => (
                                    <button type="button" key={label}>
                                        <Icon size={22} />
                                        <strong>{count}</strong>
                                        <span>{label}</span>
                                    </button>
                                ))}
                            </div>
                        </article>

                        <article className="mini-card record-card">
                            <div className="mini-head">
                                <span>
                                    <PencilLine size={22} />
                                </span>
                                <div>
                                    <p>작성한 기록</p>
                                    <h3>후기</h3>
                                </div>
                            </div>

                            {reviews.map((review) => (
                                <div className="list-row" key={review.title}>
                                    <strong>{review.title}</strong>
                                    <span>{review.meta}</span>
                                </div>
                            ))}
                        </article>

                        <article className="mini-card record-card">
                            <div className="mini-head">
                                <span>
                                    <MessageCircle size={22} />
                                </span>
                                <div>
                                    <p>남긴 의견</p>
                                    <h3>댓글</h3>
                                </div>
                            </div>

                            {comments.map((comment) => (
                                <div className="list-row" key={comment.text}>
                                    <strong>{comment.title}</strong>
                                    <span>{comment.text}</span>
                                </div>
                            ))}
                        </article>
                    </div>
                </section>
            </section>
        </main>
    );
}