import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const ResumeDetail = () => {
  const location = useLocation();
  const { resumeData } = location.state || {}; // location.state에서 resumeData 가져오기

  // resumeData가 없을 경우 기본값 설정
  const {
    profileImage = "default-image-url.jpg",
    name = "고객님 이름",
    title = "이력서 제목 입력",
    skills = "업무 스킬 입력",
    conditions = [],
    city = "시",
    county = "군",
  } = resumeData || {};

  return (
    <Container>
      <Content>
        <Title>이력서 상세 보기</Title>
        <ResumeBox>
          <ProfileImage src={profileImage} alt="Profile" />
          <Name>{name}</Name>
          <Label>이력서 제목</Label>
          <TitleText>{title}</TitleText>
          <Label>자기 소개 업무 스킬</Label>
          <SkillsText>{skills}</SkillsText>

          <Label>희망 근무 조건</Label>
          <ConditionsList>
            {conditions.length > 0 ? (
              conditions.map((condition, index) => (
                <ConditionItem key={index}>{condition}</ConditionItem>
              ))
            ) : (
              <ConditionItem>조건 없음</ConditionItem>
            )}
          </ConditionsList>

          <CityContainer>
            <City>{city}</City>
            <County>{county}</County>
          </CityContainer>
        </ResumeBox>
      </Content>
    </Container>
  );
};

export default ResumeDetail;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Content = styled.div`
  margin-top: 50px;
  width: 487px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  font-family: "Inter";
  font-weight: 500;
  font-size: 40px;
  color: #000000;
  margin-bottom: 30px;
`;

const ResumeBox = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProfileImage = styled.img`
  width: 100px; /* Set desired width */
  height: 100px; /* Set desired height */
  border-radius: 50%; /* Circular image */
  margin-bottom: 20px;
`;

const Name = styled.h2`
  font-family: "Inter";
  font-weight: 600;
  font-size: 24px;
  color: #000000;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-family: "Inter";
  font-weight: 500;
  margin-bottom: 10px;
`;

const TitleText = styled.p`
  font-family: "Inter";
  font-weight: 500;
  font-size: 18px;
  color: #000000;
  margin-bottom: 20px;
`;

const SkillsText = styled.p`
  font-family: "Inter";
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  margin-bottom: 20px;
`;

const ConditionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin-bottom: 20px;
`;

const ConditionItem = styled.li`
  font-family: "Inter";
  font-weight: 400;
  font-size: 16px;
  color: #666666;
`;

const CityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const City = styled.p`
  font-family: "Inter";
  font-weight: 400;
  font-size: 16px;
  color: #666666;
`;

const County = styled.p`
  font-family: "Inter";
  font-weight: 400;
  font-size: 16px;
  color: #666666;
`;
