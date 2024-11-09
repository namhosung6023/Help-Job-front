import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsChecked, setTermsChecked] = useState({
    terms: false,
    age: false,
    privacy: false,
    terms2: false,
    marketing: false,
  });

  // 회원가입 요청 함수
  const handleSignUp = async () => {
    if (!isEmailChecked) {
      alert("이메일 중복 미확인");
      return;
    }
    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }
    if (!termsChecked.age || !termsChecked.privacy || !termsChecked.terms2) {
      alert("모든 필수 약관에 동의해야 합니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8090/users/register",
        {
          //이거자나 Json에서 텓스트 보낼때
          name,
          email,
          password,
        }
      );
      if (response.ok) {
        alert("회원가입이 완료되었습니다.");
        navigate("/signin");
      } else {
        const result = await response.json();
        alert(`회원가입 실패: ${result.message}`);
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      console.log(name, email, password);
      alert("회원가입이 완료되었습니다");
      navigate("/signin");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setIsEmailChecked(false);
    setIsEmailValid(false);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(false);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordError(password !== e.target.value);
  };

  const checkEmail = () => {
    if (!email.includes("@")) {
      alert("올바른 이메일 형식이 아닙니다.");
      return;
    }

    const isAvailable = Math.random() < 0.5;

    if (isAvailable) {
      setIsEmailValid(true);
      setIsEmailChecked(true);
      alert("사용 가능한 이메일입니다.");
    } else {
      setIsEmailValid(false);
      setIsEmailChecked(false);
      alert("이미 사용 중인 이메일입니다.");
    }
  };

  const handleCheckAllTerms = () => {
    const allChecked = !termsChecked.terms;
    setTermsChecked({
      terms: allChecked,
      age: allChecked,
      privacy: allChecked,
      terms2: allChecked,
      marketing: allChecked,
    });
  };

  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setTermsChecked({ ...termsChecked, [id]: checked });
  };

  return (
    <Container>
      <Content>
        <Title>회원가입</Title>
        <Form>
          <Field>
            <Label>이름</Label>
            <Input
              type="text"
              value={name} //여기가 문제라는 거자나
              onChange={handleNameChange}
              placeholder="이름(실명)을 입력하세요."
            />
          </Field>
          <Field>
            <Label>이메일</Label>
            <Input
              type="email"
              placeholder="이메일을 입력하세요."
              value={email}
              onChange={handleEmailChange}
            />
            <CheckButton onClick={checkEmail}>이메일 중복확인</CheckButton>
          </Field>
          <Field>
            <Label>비밀번호</Label>
            <PasswordWrapper>
              <PasswordInput
                type={showPassword ? "text" : "password"}
                placeholder="영문+숫자 조합 (8자리 이상) 입력하세요."
                value={password}
                onChange={handlePasswordChange}
                isError={passwordError}
              />
              <ToggleIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </ToggleIcon>
            </PasswordWrapper>
          </Field>
          <Field>
            <Label>비밀번호 확인</Label>
            <PasswordWrapper>
              <PasswordInput
                type={showConfirmPassword ? "text" : "password"}
                placeholder="비밀번호를 다시 입력하세요."
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                isError={passwordError}
              />
              <ToggleIcon
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </ToggleIcon>
            </PasswordWrapper>
            {passwordError && (
              <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
            )}
          </Field>
          <Terms>
            <CheckboxField>
              <CheckboxInput
                type="checkbox"
                id="terms"
                checked={termsChecked.terms}
                onChange={handleCheckAllTerms}
              />
              <CheckboxLabel htmlFor="terms">약관 전체 동의</CheckboxLabel>
            </CheckboxField>
            <Divider />
            <CheckboxField>
              <CheckboxInput
                type="checkbox"
                id="age"
                checked={termsChecked.age}
                onChange={handleCheckboxChange}
              />
              <CheckboxLabel htmlFor="age">
                만 14세 이상입니다. (필수)
              </CheckboxLabel>
            </CheckboxField>
            <Divider />
            <CheckboxField>
              <CheckboxInput
                type="checkbox"
                id="privacy"
                checked={termsChecked.privacy}
                onChange={handleCheckboxChange}
              />
              <CheckboxLabel htmlFor="privacy">
                개인 정보 이용 및 수집 동의 (필수)
              </CheckboxLabel>
            </CheckboxField>
            <Divider />
            <CheckboxField>
              <CheckboxInput
                type="checkbox"
                id="terms2"
                checked={termsChecked.terms2}
                onChange={handleCheckboxChange}
              />
              <CheckboxLabel htmlFor="terms2">
                이용 약관 동의 (필수)
              </CheckboxLabel>
            </CheckboxField>
            <Divider />
            <CheckboxField>
              <CheckboxInput
                type="checkbox"
                id="marketing"
                checked={termsChecked.marketing}
                onChange={handleCheckboxChange}
              />
              <CheckboxLabel htmlFor="marketing">
                마케팅 알림 수신 동의 (선택)
              </CheckboxLabel>
            </CheckboxField>
          </Terms>
          <SignUpButton
            onClick={handleSignUp}
            disabled={
              !termsChecked.age || !termsChecked.privacy || !termsChecked.terms2
            }
          >
            회원가입
          </SignUpButton>
        </Form>
      </Content>
    </Container>
  );
};

export default SignUp;

// 스타일 컴포넌트 부분은 생략

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const Content = styled.div`
  width: 487px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 120px;
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

const Form = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 100px;
`;

const Field = styled.div`
  width: 100%;
  margin-bottom: 30px;
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
`;

const Input = styled.input`
  width: 100%;
  height: 57px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 16px;
  color: #a0a0a0;
  border: 1px solid #a0a0a0;
  border-radius: 10px;
  padding: 0 10px;
  outline: none;
  background: none;
`;

const CheckButton = styled.button`
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
  margin-top: 10px;
  cursor: pointer;
  border: none;
`;

const PasswordInput = styled(Input)`
  border: ${({ isError }) =>
    isError ? "1px solid #d50000" : "1px solid #a0a0a0"};
`;

const ErrorText = styled.div`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #d50000;
  margin-top: 5px;
`;

const PasswordWrapper = styled.div`
  width: 100%;
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

const Terms = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const CheckboxField = styled.div`
  display: flex;
  align-items: center;
`;

const CheckboxInput = styled.input`
  margin-right: 10px;
`;

const CheckboxLabel = styled.label`
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: "#000";
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d0d0d0;
  margin: 10px 0;
`;

const SignUpButton = styled.button`
  width: 100%;
  height: 57px;
  background: ${({ disabled }) => (disabled ? "#CCCCCC" : "#0003c6")};
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
  margin-top: 10px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  border: none;
`;
