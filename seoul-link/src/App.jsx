import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import MainPage from "./pages/MainPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import "./App.css";
import OAuthSuccessPage from "./pages/OAuthSuccessPage";
import ProfileVerifyPage from "./pages/ProfileVerifyPage";
import ProfileEditPage from "./pages/ProfileEditPage";

function MyPageRoute() {
    const savedMember = localStorage.getItem("member");
    const member = savedMember ? JSON.parse(savedMember) : null;

    if (!member) {
        return <Navigate to="/login" replace />;
    }

    return <MyPage memberId={member.memberId} />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/find-password" element={<FindPasswordPage />} />
                <Route path="/mypage" element={<MyPageRoute />} />
                <Route path="/oauth-success" element={<OAuthSuccessPage />} />
                <Route path="/profile-verify" element={<ProfileVerifyPage />} />
                <Route path="/profile-edit" element={<ProfileEditPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;