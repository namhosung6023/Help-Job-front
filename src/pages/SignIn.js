import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios"; // Axios 추가

const SignIn = ({ setLoggenIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8090/users/login", {
        email, // 이메일을 사용자명으로 보냄
        password,
      });

      // 로그인 성공 후 처리
      const { accessToken } = response.data; // JWT 토큰을 받아옴
      localStorage.setItem("accessToken", accessToken); // 토큰을 로컬 스토리지에 저장
      setLoggenIn("user"); // 일반 사용자 권한 부여
      navigate("/mypage"); // 일반 사용자 메인 페이지로 이동
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      // 에러 메시지 처리 (예: 사용자에게 알림)
      alert(error.response.data.message);
    }
  };

  return (
    <Container>
      <Content>
        <Title>로그인</Title>
        <LoginBox>
          <Label>이메일</Label>
          <InputBox>
            <Input
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputBox>
          <Label>비밀번호</Label>
          <PasswordWrapper>
            <InputBox>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </ToggleIcon>
            </InputBox>
          </PasswordWrapper>
          <LoginButton onClick={handleLogin}>이메일 로그인</LoginButton>
          <Links>
            <LinkItem to="/searchid">아이디 찾기</LinkItem>
            <Divider />
            <LinkItem to="/searchpw">비밀번호 찾기</LinkItem>
            <Divider />
            <LinkItem to="/signup">회원가입</LinkItem>
          </Links>
        </LoginBox>
        <SocialLoginBox>
          <KakaoLoginButton>
            <KakaoLogo />
            <KakaoText>카카오 로그인</KakaoText>
          </KakaoLoginButton>
          <GoogleLoginButton>
            <GoogleLogo />
            <GoogleText>구글 로그인</GoogleText>
          </GoogleLoginButton>
        </SocialLoginBox>
      </Content>
    </Container>
  );
};

export default SignIn;

// 스타일드 컴포넌트 코드 생략 (이전 코드와 동일)

// 스타일드 컴포넌트 코드 생략 (이전 코드와 동일)

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Content = styled.div`
  width: 487px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 40px;
  line-height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000000;
  margin-bottom: 20px;
`;

const LoginBox = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  display: flex;
  align-items: center;
  color: #000000;
  margin-bottom: 10px;
  width: 100%;
`;

const InputBox = styled.div`
  width: 100%;
  height: 57px;
  background: #ffffff;
  border: 1px solid #a0a0a0;
  border-radius: 10px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  padding: 0 10px;
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 16px;
  color: #a0a0a0;
  border: none;
  outline: none;
  background: none;
`;

const PasswordWrapper = styled.div`
  width: 105%;
  position: relative;
  display: flex;
  align-items: center;
`;

const ToggleIcon = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #a0a0a0;
`;

const LoginButton = styled.button`
  width: 100%;
  height: 57px;
  background: #0003c6;
  border-radius: 10px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  margin-top: 50px;
  cursor: pointer;
  border: none;
`;

const Links = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  justify-content: center;
  gap: 30px;
  align-items: center;
  margin-top: 30px;
`;

const LinkItem = styled(Link)`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  line-height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8f8f8f;
  cursor: pointer;
  text-decoration: none;
`;

const Divider = styled.div`
  width: 1px;
  height: 16px;
  background: #8f8f8f;
`;

const SocialLoginBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

const KakaoLoginButton = styled.button`
  width: 100%;
  height: 57px;
  background: #ffe600;
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-bottom: 10px;
`;

const KakaoLogo = styled.div`
  width: 27px;
  height: 27px;
  background: url("/images/kakao.png") no-repeat center center;
  background-size: contain;
  margin-right: 10px;
`;

const KakaoText = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #784100;
`;

const GoogleLoginButton = styled.button`
  width: 100%;
  height: 57px;
  background: #f5f5f5;
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const GoogleLogo = styled.div`
  width: 30px;
  height: 29px;
  background: url("/images/google.png") no-repeat center center;
  background-size: contain;
  margin-right: 10px;
`;

const GoogleText = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #000000;
`;
