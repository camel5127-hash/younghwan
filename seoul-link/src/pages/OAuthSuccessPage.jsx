import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function OAuthSuccessPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const memberId = searchParams.get("memberId");
        const email = searchParams.get("email");
        const name = searchParams.get("name");
        const loginType = searchParams.get("loginType");

        if (!memberId || !email || !name) {
            alert("소셜 로그인 처리 중 문제가 발생했습니다.");
            navigate("/login");
            return;
        }

        localStorage.setItem(
            "member",
            JSON.stringify({
                memberId: Number(memberId),
                email,
                name,
                loginType,
            })
        );

        navigate("/mypage");
    }, [navigate, searchParams]);

    return null;


}