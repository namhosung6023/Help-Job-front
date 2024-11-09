import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const IndivRecruit = () => {
  const [jobList, setJobList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5; // 예시로 총 페이지 수를 설정했습니다.
  const navigate = useNavigate();

  // 공고 리스트 API 호출
  useEffect(() => {
    const fetchJobList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/mypage/job-postings"
        );
        setJobList(response.data);
      } catch (error) {
        console.error("공고 리스트 불러오기 중 오류 발생:", error);
      }
    };

    fetchJobList();
  }, []);

  // 페이지 이동 함수
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 공고 클릭 시 상세 페이지로 이동
  const handleJobClick = (jobId) => {
    navigate(`/jobdetail/${jobId}`);
  };

  return (
    <Container>
      <Title>도와주세요</Title>
      <JobList>
        {jobList.map((job) => (
          <JobItem key={job._id} onClick={() => handleJobClick(job._id)}>
            <JobTitle>{job.title}</JobTitle>
            <JobDescription>{job.content}</JobDescription>
          </JobItem>
        ))}
      </JobList>
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

export default IndivRecruit;

// Styled components
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

const JobList = styled.div`
  width: 100%;
  max-width: 600px;
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
`;

const JobItem = styled.div`
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
  cursor: pointer;
`;

const JobTitle = styled.h2`
  font-family: "Inter";
  font-weight: 600;
  font-size: 20px;
  color: #000000;
`;

const JobDescription = styled.p`
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
