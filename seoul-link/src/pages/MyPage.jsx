import { useEffect, useState } from "react";
import { apiGet } from "../api/client";

function MyPage({ memberId }) {
    const [myPage, setMyPage] = useState(null);
    const [message, setMessage] = useState("");

    useEffect(() => {
        apiGet(`/mypage/${memberId}`)
            .then(setMyPage)
            .catch((error) => {
                setMessage(error.message);
            });
    }, [memberId]);

    const logout = () => {
        localStorage.removeItem("member");
        window.location.href = "/login";
    };

    if (!myPage) {
        return (
            <main className="subPage">
                <div className="loadingBox">
                    {message || "마이페이지를 불러오는 중입니다."}
                </div>
            </main>
        );
    }

    return (
        <main className="subPage">
            <section className="pageTitle">
                <span>MY SEOULINK</span>
                <h1>마이페이지</h1>
                <p>{myPage.member.nickname || myPage.member.name}님의 서울 여행 기록입니다.</p>
                <button type="button" onClick={logout}>
                    로그아웃
                </button>
            </section>

            <section className="mySummary">
                <div className="profileCard">
                    <div className="profileIcon">MY</div>
                    <h2>{myPage.member.name}</h2>
                    <p>아이디: {myPage.member.loginId}</p>
                    <p>{myPage.member.email}</p>
                </div>

                <div className="typeCard">
                    <span>나의 여행 유형</span>

                    {myPage.travelType ? (
                        <>
                            <h2>{myPage.travelType.travelCode}</h2>
                            <strong>{myPage.travelType.typeTitle}</strong>
                            <p>{myPage.travelType.typeDescription}</p>
                        </>
                    ) : (
                        <>
                            <h2>검사 전</h2>
                            <p>아직 여행 취향 검사 결과가 없습니다.</p>
                        </>
                    )}
                </div>
            </section>

            <section className="mySection">
                <div className="sectionHead">
                    <h2>저장한 여행 코스</h2>
                    <span>{myPage.courses.length}개</span>
                </div>

                <div className="cardGrid">
                    {myPage.courses.length === 0 && (
                        <div className="emptyCard">아직 저장한 코스가 없습니다.</div>
                    )}

                    {myPage.courses.map((course) => (
                        <article className="dataCard" key={course.courseId}>
                            <span>{course.courseType}</span>
                            <h3>{course.title}</h3>
                            <p>{course.description}</p>
                            <small>
                                {course.region} · 조회 {course.viewCount}
                            </small>
                        </article>
                    ))}
                </div>
            </section>

            <section className="mySection">
                <div className="sectionHead">
                    <h2>결제 내역</h2>
                    <span>{myPage.payments.length}건</span>
                </div>

                <div className="listBox">
                    {myPage.payments.length === 0 && (
                        <div className="emptyLine">결제 내역이 없습니다.</div>
                    )}

                    {myPage.payments.map((payment) => (
                        <div className="listItem" key={payment.paymentId}>
                            <strong>{payment.productName}</strong>
                            <span>{payment.amount}원</span>
                            <span>{payment.paymentStatus}</span>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mySection">
                <div className="sectionHead">
                    <h2>AI 챗봇 저장 내역</h2>
                    <span>{myPage.chatbotHistories.length}개</span>
                </div>

                <div className="listBox">
                    {myPage.chatbotHistories.length === 0 && (
                        <div className="emptyLine">챗봇 저장 내역이 없습니다.</div>
                    )}

                    {myPage.chatbotHistories.map((chat) => (
                        <div className="chatHistoryItem" key={chat.chatId}>
                            <strong>{chat.travelConcept}</strong>
                            <p>{chat.question}</p>
                            <small>{chat.courseSummary}</small>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default MyPage;