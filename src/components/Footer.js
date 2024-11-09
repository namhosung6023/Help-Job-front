import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Logo src="/images/mainLogo.png" alt="로고" />
        <ContactInfo>1234 - 5678</ContactInfo>
        <FooterMenu>
          <FooterLink to="#">회사소개</FooterLink>
          <FooterLink to="#">개인정보처리방침</FooterLink>
          <FooterLink to="#">이용약관</FooterLink>
          <FooterLink to="#">모바일</FooterLink>
          <FooterLink to="#">PC버전</FooterLink>
        </FooterMenu>
      </FooterContent>
      <FooterSidePanel>
        <Link to="#" className="footer-link">
          고객센터
        </Link>
        <Link to="#" className="footer-link">
          공지사항
        </Link>
        <Link to="#" className="footer-link">
          자주묻는질문
        </Link>
      </FooterSidePanel>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 291px;
  background: #e1e1e1;

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
    padding: 20px;
  }
`;

const FooterContent = styled.div`
  position: relative;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    gap: 20px;
  }
`;

const Logo = styled.img`
  position: absolute;
  width: 75px;
  height: 75px;
  left: 87px;
  top: 55px;

  @media (max-width: 768px) {
    position: static;
    margin-bottom: 20px;
  }
`;

const ContactInfo = styled.div`
  position: absolute;
  width: 211px;
  height: 33px;
  left: 214px;
  top: 55px;
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #0003c6;

  @media (max-width: 768px) {
    position: static;
    justify-content: center;
    font-size: 24px;
  }
`;

const FooterMenu = styled.div`
  position: absolute;
  width: 43%;
  height: 16px;
  left: 214px;
  top: 115px;
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    position: static;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const FooterLink = styled(Link)`
  font-family: "Inter", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #8f8f8f;
  text-decoration: none;
  &:hover {
    color: #000000;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FooterSidePanel = styled.div`
  position: absolute;
  width: 25%;
  height: 100%;
  right: 0;
  background: #8e8e8e;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;

  .footer-link {
    font-family: "Inter", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #e1e1e1;
    text-decoration: none;
    &:hover {
      color: #ffffff;
      text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
    }
  }
  @media (max-width: 768px) {
    position: static;
    width: 100%;
    height: auto;
    background: none;
    flex-direction: row;
    justify-content: center;
    gap: 20px;
    margin-top: 170px;

    .footer-link {
      color: #8f8f8f;
      font-size: 18px;
      &:hover {
        color: #000;
        text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
      }
    }
  }
`;
