import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Opening = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    city: "",
    district: "",
    salary: "",
    salaryType: "",
    image: null, // New field for the job image
  });
  const navigate = useNavigate();

  // 입력 변경 시 상태 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // 이미지 파일 변경 시 상태 업데이트
  const handleImageChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      image: e.target.files[0], // Save the selected file
    }));
  };

  // 공고 등록 API 호출 함수
  const handleSubmit = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/signin");
      return;
    }

    try {
      // FormData 생성 및 데이터 추가
      const data = new FormData();
      data.append("userId", token);
      data.append("title", formData.title);
      data.append("content", formData.content);
      data.append("location", formData.city + " " + formData.district);
      data.append("salary", formData.salary);
      data.append("image", formData.image); // Append image file

      const response = await axios.post(
        "http://localhost:8090/mypage/jobposting",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        alert("공고가 성공적으로 등록되었습니다.");
        navigate("/mypage");
      }
    } catch (error) {
      console.error("공고 등록 중 오류 발생:", error);
      alert("공고 등록에 실패했습니다.");
    }
  };

  return (
    <Container>
      <Content>
        <Title>공고 등록</Title>
        <ResumeBox>
          <Label>공고 제목</Label>
          <TitleInput
            name="title"
            placeholder="공고 제목 입력"
            onChange={handleChange}
          />

          <Label>공고 내용</Label>
          <SkillsInput
            name="content"
            placeholder="공고 내용 입력"
            onChange={handleChange}
          />

          <Label>근무 조건</Label>
          <WorkingConditions>
            <ConditionContainer>
              <Label>근무지</Label>
              <CityContainer>
                <CityInput
                  name="city"
                  placeholder="시"
                  onChange={handleChange}
                />
                <CityInput
                  name="district"
                  placeholder="구"
                  onChange={handleChange}
                />
              </CityContainer>
            </ConditionContainer>

            <ConditionContainer>
              <Label>급여</Label>
              <CheckboxContainer>
                <Checkbox>
                  <input
                    type="radio"
                    name="salaryType"
                    value="시급"
                    onChange={handleChange}
                  />
                  시급
                </Checkbox>
                <Checkbox>
                  <input
                    type="radio"
                    name="salaryType"
                    value="일급"
                    onChange={handleChange}
                  />
                  일급
                </Checkbox>
                <Checkbox>
                  <input
                    type="radio"
                    name="salaryType"
                    value="주급"
                    onChange={handleChange}
                  />
                  주급
                </Checkbox>
                <Checkbox>
                  <input
                    type="radio"
                    name="salaryType"
                    value="월급"
                    onChange={handleChange}
                  />
                  월급
                </Checkbox>
              </CheckboxContainer>
              <SalaryInput
                name="salary"
                placeholder="급여 입력"
                onChange={handleChange}
              />
              <UnitLabel>원</UnitLabel>
            </ConditionContainer>
          </WorkingConditions>

          <Label>공고 이미지</Label>
          <ImageInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />

          <SaveButton onClick={handleSubmit}>공고 등록</SaveButton>
        </ResumeBox>
      </Content>
    </Container>
  );
};

export default Opening;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
  padding-top: 100px; /* Top padding to create space below header */
  padding-bottom: 100px; /* Bottom padding to create space above footer */
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
  margin-bottom: 40px; /* Increased margin for spacing */
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

const TitleInput = styled.input`
  width: 100%;
  height: 40px;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 40px; /* Increased margin for spacing */
  border: 1px solid #ccc;
`;

const SkillsInput = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 40px; /* Increased margin for spacing */
  border: 1px solid #ccc;
`;

const Label = styled.label`
  font-family: "Inter";
  font-weight: 500;
  margin-bottom: 15px; /* Increased margin for spacing */
`;

const WorkingConditions = styled.div`
  width: 100%;
  margin-bottom: 40px; /* Increased spacing below working conditions */
`;

const ConditionContainer = styled.div`
  margin-bottom: 40px; /* Increased space between conditions */
`;

const CityContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 10px; /* Spacing between inputs */
`;

const CityInput = styled.input`
  width: 48%; /* Two inputs side by side */
  height: 40px;
  border-radius: 10px;
  padding: 0 10px;
  border: 1px solid #ccc;
`;

const SalaryInput = styled.input`
  width: calc(100% - 50px); /* Adjusted width to accommodate unit label */
  height: 40px;
  border-radius: 10px;
  padding: 0 10px;
  margin-bottom: 20px; /* Increased spacing below salary input */
  border: 1px solid #ccc;
`;

const UnitLabel = styled.span`
  font-family: "Inter";
  font-weight: 500;
  font-size: 18px;
  margin-left: 10px; /* Space between input and unit label */
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px; /* Increased space between checkboxes */
  margin-bottom: 15px; /* Increased spacing below checkbox section */
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
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
  margin-top: 30px; /* Increased space above the button */
  cursor: pointer;
  border: none;
`;
const ImageInput = styled.input`
  margin-bottom: 20px; /* Space below the file input */
`;
