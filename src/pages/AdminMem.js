import React from "react";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";

const AdminMem = () => {
  return (
    <Container>
      <Content>
        <Button to="/adminmem">회원관리</Button>
        <Button to="adminreport">신고관리</Button>
      </Content>
    </Container>
  );
};

export default AdminMem;

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
const Button = styled(Link)``;
