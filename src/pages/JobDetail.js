import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const JobDetail = () => {
  const navigate = useNavigate();
  const { jobId } = useParams();
  const [jobData, setJobData] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // Store user info
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/mypage/job-postings/${jobId}`
        );
        setJobData(response.data);
      } catch (error) {
        console.error("공고 상세 정보 가져오기 오류:", error);
        alert("해당 공고를 불러오는 데 실패했습니다.");
      }
    };

    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/mypage/user-info", 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setUserInfo(response.data); // Set the full user info object
      } catch (error) {
        console.error("사용자 정보 가져오기 오류:", error);
        alert("사용자 정보를 가져오는 데 실패했습니다.");
      }
    };

    fetchJobDetail();
    fetchUserInfo(); // Fetch user info on component mount
  }, [jobId]);

  if (!jobData || !userInfo) return <div>로딩 중...</div>;

  const handleApply = async () => {
    try {
      // Send the jobId as _id and userId as userInfo.id
      await axios.post(
        "http://localhost:8090/mypage/apply",
        { _id: jobId, userId: userInfo.id }, // Pass jobId and userId
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      alert("지원이 완료되었습니다.");
      console.log("지원하기 페이지 userid:", userInfo.id)

      // After successful application, navigate to chat
      navigate("/chat", {
        state: {
          senderId: userInfo.id,
          receiverId: jobData.postedBy._id,
        },
      });
    } catch (error) {
      console.error("지원하기 오류:", error);
      alert("지원 중 오류가 발생했습니다.");
    }
  };

  return (
    <Container>
      <Content>
        <Title>공고 상세</Title>
        <JobTitle>{jobData.title}</JobTitle>
        <JobDescription>{jobData.content}</JobDescription>
        <WorkingConditions>
          <ConditionTitle>근무 조건</ConditionTitle>
          <Condition>근무지: {jobData.location}</Condition>
          <Condition>급여: {jobData.salary}</Condition>
        </WorkingConditions>
        <ApplyButton onClick={handleApply}>지원하기</ApplyButton>
      </Content>
    </Container>
  );
};

export default JobDetail;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Content = styled.div`
  width: 600px;
  background: #ffffff;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-family: "Inter";
  font-weight: 500;
  font-size: 40px;
  color: #000000;
  margin-bottom: 30px;
`;

const JobTitle = styled.h2`
  font-family: "Inter";
  font-weight: 600;
  font-size: 28px;
  color: #000000;
  margin-bottom: 10px;
`;

const JobDescription = styled.p`
  font-family: "Inter";
  font-weight: 400;
  font-size: 16px;
  color: #666666;
  margin-bottom: 20px;
`;

const WorkingConditions = styled.div`
  margin-top: 20px;
`;

const ConditionTitle = styled.h3`
  font-family: "Inter";
  font-weight: 500;
  font-size: 20px;
  color: #000000;
  margin-bottom: 10px;
`;

const Condition = styled.p`
  font-family: "Inter";
  font-weight: 400;
  font-size: 16px;
  color: #666666;
`;

const ApplyButton = styled.button`
  width: 100%;
  height: 57px;
  background: #0003c6;
  border-radius: 10px;
  font-family: "Inter";
  font-weight: 400;
  font-size: 18px;
  color: #ffffff;
  margin-top: 20px;
  cursor: pointer;
  border: none;

  &:hover {
    background: #0001a2;
  }
`;
