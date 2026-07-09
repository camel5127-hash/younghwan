import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MyPage from "./pages/MyPage";
import "./App.css";

function HomePage() {
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
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;