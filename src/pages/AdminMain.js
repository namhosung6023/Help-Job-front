import React from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

const AdminMain = () => {
  return (
    <Container>
      <Content>
        <Button to="/adminmem">회원관리</Button>
        <Button to="/adminreport">신고관리</Button>
      </Content>
    </Container>
  );
};

export default AdminMain;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #222;
`;

const Content = styled.div`
  width: 487px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
`;
const Button = styled(Link)`
  width: 300px;
  height: 70px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222;
  border: 1px solid #fff;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  text-decoration: none;
  border-radius: 10px;
  transition: background-color 0.5s, color 0.5s, transform 0.5s;

  &:hover {
    background-color: #0003c6; /* 호버 시 파란색 */
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2); /* 호버 시 그림자 확대 */
    transform: translateY(-3px); /* 살짝 위로 올라가는 효과 */
    border: none;
  }
`;
