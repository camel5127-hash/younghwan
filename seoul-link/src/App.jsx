import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./page/Login/Login";
// import Signup from "./pages/signup/Signup";
// import MyPage from "./pages/mypage/MyPage";

export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />

                <Route path="/login" element={<Login />} />

                {/* 나중에 추가 */}
                {/* <Route path="/signup" element={<Signup />} /> */}
                {/* <Route path="/mypage" element={<MyPage />} /> */}

            </Routes>

        </BrowserRouter>

    );

}