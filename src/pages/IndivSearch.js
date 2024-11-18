import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const IndivSearch = () => {
  const [resumes, setResumes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 예시로 설정한 총 페이지 수
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/mypage/resumes"
        );
        setResumes(response.data);
      } catch (error) {
        console.error("이력서 목록을 불러오는 중 오류가 발생했습니다:", error);
        alert("이력서 목록을 불러오는 데 실패했습니다.");
      }
    };

    fetchResumes();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleResumeClick = (userId) => {
    // userId에 따라 이력서 상세 페이지로 이동
    navigate(`/resumedetail/${userId}`);
  };

  return (
    <Container>
      <Title>도와줄게요</Title>
      <ResumeList>
        {resumes.map((resume, index) => (
          <ResumeItem
            key={index}
            onClick={() => handleResumeClick(resume.userId)}
          >
            <ResumeTitle>{resume.name}님의 이력서</ResumeTitle>
            <ResumeDescription>
              {/* resume.resume가 객체라면 이를 JSON 문자열로 변환 */}
              {typeof resume.resume === "object"
                ? JSON.stringify(resume.resume) // 객체라면 JSON.stringify로 문자열 변환
                : resume.resume || "이력서 내용이 없습니다."}
            </ResumeDescription>
            {/* resume.work가 객체일 경우 */}
            {resume.work && (
              <ResumeDescription>
                {typeof resume.work === "object"
                  ? JSON.stringify(resume.work)
                  : resume.work}
              </ResumeDescription>
            )}
          </ResumeItem>
        ))}
      </ResumeList>
      <Pagination>
        {[...Array(totalPages)].map((_, index) => (
          <PageButton
            key={index}
            active={currentPage === index + 1}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </PageButton>
        ))}
        <NextButton onClick={() => handlePageChange(currentPage + 1)}>
          다음 페이지
        </NextButton>
      </Pagination>
    </Container>
  );
};

export default IndivSearch;

// styled-components는 그대로 사용
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f0f0f0;
`;

const Title = styled.h1`
  font-family: "Inter";
  font-weight: 700;
  font-size: 36px;
  color: #000000;
  margin-bottom: 20px;
`;

const ResumeList = styled.div`
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const ResumeItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const ResumeTitle = styled.h2`
  font-family: "Inter";
  font-weight: 600;
  font-size: 20px;
  color: #000000;
`;

const ResumeDescription = styled.p`
  font-family: "Inter";
  font-weight: 400;
  font-size: 16px;
  color: #666666;
`;

const Pagination = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const PageButton = styled.button`
  background: ${(props) => (props.active ? "#0003c6" : "#ffffff")};
  color: ${(props) => (props.active ? "#ffffff" : "#000000")};
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background: #0003c6;
    color: #ffffff;
  }
`;

const NextButton = styled.button`
  background: #0003c6;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  cursor: pointer;

  &:hover {
    background: #0001a2;
  }
`;
