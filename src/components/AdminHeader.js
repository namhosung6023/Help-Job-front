import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const AdminHeader = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate("/main");
  };

  return (
    <Container>
      <Logo to="/adminmain">
        <img src="/images/mainLogo.png" alt="로고" />
      </Logo>
      <Category>
        <StyledLink to="/adminmem">회원관리</StyledLink>
        <StyledLink to="/adminreport">신고관리</StyledLink>
      </Category>
      <Account>
        <LogoutButton onClick={handleLogoutClick}>로그아웃</LogoutButton>
      </Account>
    </Container>
  );
};

export default AdminHeader;

const Container = styled.div`
  height: 100px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    height: auto;
    padding: 20px 0;
  }
`;

const Logo = styled(Link)`
  img {
    height: 75px;
    width: 75px;
    margin-right: calc(5vw + 10px);

    @media (max-width: 768px) {
      margin-right: 0;
      margin-bottom: 13px;s
    }
  }
`;

const Category = styled.nav`
  display: flex;
  justify-content: flex-start;
  flex: 1;
  a {
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 20px;
    line-height: 16px;
    color: #fff;
    text-decoration: none;
    margin: 10px 30px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 5px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  transition: color 0.3s ease;

  &:hover {
    color: #0003c6;
    font-weight: 700;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
`;

const LoggedInAccount = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-left: auto;

  a {
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    text-decoration: none;
    margin: 0 20px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    justify-content: center;
    width: 100%;

    a {
      margin: 10px;
    }
  }
`;

// 프로필 이미지 스타일링
const ProfileImage = styled.div`
  position: relative;
  width: 75px;
  height: 75px;
  background-color: #d9d9d9;
  border-radius: 50%;
  z-index: 1;
  transition: border 0.3s ease;

  ${LoggedInAccount}:hover & {
    border: 4px solid #0003c6;
  }
`;

// 드롭다운 메뉴 스타일링
const Dropdown = styled.div`
  position: absolute;
  align-items: center;
  justify-content: center;
  width: 152px;
  top: calc(50% + 10px);
  height: 146px;
  background-color: #0003c6;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 21px;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5 ease, visibility 0.3 ease;
  padding-top: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  a {
    font-family: "Inter";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 16px;
    color: #fff;
    margin: 10px 0;
    text-align: center;
  }

  ${LoggedInAccount}:hover & {
    opacity: 1;
    visibility: visible;
  }
`;

// 드롭다운 메뉴 버튼 스타일링
const DropdownLink = styled(Link)`
  cursor: pointer;

  &:hover {
    font-weight: 700;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
`;
// const LogoutButton = styled.button`
//   background: none;
//   border: none;
//   font-family: "Inter";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 20px;
//   line-height: 16px;
//   color: #fff;
//   margin: 10px 0;
//   text-align: center;
//   cursor: pointer;

//   &:hover {
//     font-weight: 700;
//     text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
//   }
// `;

const Account = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-shrink: 0;
  margin-left: auto;
  transition: color 0.3s ease;
  a {
    font-family: "Inter", sans-serif;
    font-weight: 400;
    font-size: 20px;
    color: #000000;
    text-decoration: none;
    margin: 0 20px;
    white-space: nowrap;
  }

  @media (max-width: 768px) {
    margin-top: 20px;
    justify-content: center;
    width: 100%;

    a {
      margin: 10px;
    }
  }
`;

const LogoutButton = styled.button`
  background: none;
  border: none;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 16px;
  color: #fff;
  margin: 10px 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    font-weight: 700;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }
`;
