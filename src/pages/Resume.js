import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const Resume = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [selectedWorks, setSelectedWorks] = useState([]);
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [userId, setUserId] = useState(null); // userId 상태 추가

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8090/mypage/user-info", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        
        // 프로필 정보에서 userId 추출하여 상태에 저장
        const profile = response.data;
        setUserId(profile.id); // userId 상태 업데이트
        setName(profile.name); // name 설정 (선택사항)
      } catch (error) {
        console.error("프로필 정보를 가져오는 중 오류 발생:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleCheckboxChange = (event) => {
    const { value } = event.target;
    setSelectedWorks((prev) =>
      prev.includes(value)
        ? prev.filter((work) => work !== value)
        : [...prev, value]
    );
  };

  const handleSaveResume = async () => {
    if (!userId) {
      alert("사용자 정보를 가져올 수 없습니다.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8090/mypage/submit-resume",
        {
          userId, // userId를 실제로 설정
          title,
          skill: skills,
          place: `${city} ${district}`,
          work: selectedWorks,
        }
      );
      alert(response.data.message);
    } catch (error) {
      console.error("이력서 저장 중 오류 발생:", error);
    }
  };

  return (
    <Container>
      <Content>
        <Title>나의 이력서 작성</Title>
        <ResumeBox>
          <ProfileImage src="your-image-url.jpg" alt="Profile" />
          <NameInput
            placeholder="고객님 이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Label>이력서 제목</Label>
          <TitleInput
            placeholder="이력서 제목 입력"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Label>자기 소개 업무 스킬</Label>
          <SkillsInput
            placeholder="업무 스킬 입력"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <Label>희망 근무 조건</Label>
          <CheckboxContainer>
            {[
              "배달",
              "비대면",
              "청소",
              "운전",
              "동행/육아",
              "대행",
              "애완동물",
            ].map((work) => (
              <Checkbox key={work}>
                <input
                  type="checkbox"
                  value={work}
                  onChange={handleCheckboxChange}
                />
                <label>{work}</label>
              </Checkbox>
            ))}
          </CheckboxContainer>

          <CityContainer>
            <CityInput
              placeholder="시"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <CityInput
              placeholder="군"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
          </CityContainer>

          <SaveButton onClick={handleSaveResume}>이력서 저장</SaveButton>
        </ResumeBox>
      </Content>
    </Container>
  );
};

export default Resume;

// 스타일 컴포넌트는 기존 코드와 동일합니다.


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Content = styled.div`
  margin-top: 150px;
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
  margin-bottom: 30px; /* Increased margin for spacing */
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
  margin-bottom: 20px; /* Added margin for spacing from footer */
`;

const ProfileImage = styled.img`
  width: 100px; /* Set desired width */
  height: 100px; /* Set desired height */
  border-radius: 50%; /* Circular image */
  margin-bottom: 20px;
`;

const NameInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
`;

const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
`;

const SkillsInput = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
`;

const Label = styled.label`
  font-family: "Inter";
  font-weight: 500;
  margin-bottom: 10px;
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Space between checkboxes */
  margin-bottom: 20px;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
`;

const CityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px; /* Spacing between inputs */
`;

const CityInput = styled.input`
  width: 48%; /* Two inputs side by side */
  height: 40px;
  border-radius: 10px;
  padding: 0 10px;
  border: 1px solid #ccc;
`;

const SaveButton = styled.button`
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
  margin-top: 20px; /* Space above the button */
  cursor: pointer;
  border: none;
`;
