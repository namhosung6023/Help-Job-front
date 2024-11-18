import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage";
import IndivSearch from "./pages/IndivSearch";
import IndivRecruit from "./pages/IndivRecruit";
import CorporRecruit from "./pages/CorporRecruit";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SearchId from "./pages/SearchId";
import SearchPw from "./pages/SearchPw";
import AdminMem from "./pages/AdminMem";
import AdminMain from "./pages/AdminMain";
import AdminReport from "./pages/AdminReport";
import Resume from "./pages/Resume";
import Opening from "./pages/Opening";
import Chat from "./pages/Chat";
import JobDetail from "./pages/JobDetail";
import ResumeDetail from "./pages/ResumeDetail";
import MyOpening from "./pages/MyOpening";

import styled from "styled-components";
import AdminHeader from "./components/AdminHeader";

function App() {
  const [userType, setUserType] = useState(null);

  const handleLogin = (type) => {
    setUserType(type);
  };

  const handleLogout = () => {
    setUserType(null);
  };

  return (
    <AppContainer>
      <BrowserRouter>
        {userType === "admin" ? (
          <AdminHeader isLoggedIn={!!userType} onLogout={handleLogout} />
        ) : (
          <Header isLoggedIn={!!userType} onLogout={handleLogout} />
        )}
        <MainContent>
          <Routes>
            <Route exact path="/main" element={<Main />} />
            <Route
              path="/signin"
              element={<SignIn setLoggenIn={handleLogin} />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/indivsearch" element={<IndivSearch />} />
            <Route path="/indivrecruit" element={<IndivRecruit />} />
            <Route path="/corporrecruit" element={<CorporRecruit />} />
            <Route path="/searchid" element={<SearchId />} />
            <Route path="/serchPw" element={<SearchPw />} />
            <Route
              path="/adminmain"
              element={userType === "admin" ? <AdminMain /> : <Main />}
            />
            <Route
              path="/adminmem"
              element={userType === "admin" ? <AdminMem /> : <Main />}
            />
            <Route
              path="/adminreporter"
              element={userType === "admin" ? <AdminReport /> : <Main />}
            />
            <Route path="/resume" element={<Resume />} />
            <Route path="/opening" element={<Opening />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/jobdetail/:jobId" element={<JobDetail />} />
            <Route path="/resumedetail/:jobId" element={<ResumeDetail />} />
            <Route path="/myopening/:jobId" element={<MyOpening />} />
          </Routes>
        </MainContent>
        {userType !== "admin" && <Footer />}
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;
