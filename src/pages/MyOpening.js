import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MyOpening = () => {
  const navigate = useNavigate();
  const { jobId } = useParams(); // URL에서 jobId를 가져옴
  const [applicants, setApplicants] = useState([]); // 지원자 목록 상태
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/signin");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8090/mypage/job/applicants?_id=${jobId}`, // jobId를 쿼리 파라미터로 전달
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // API에서 반환된 데이터 구조에 따라 상태 업데이트
        setApplicants(response.data.applicants);
        console.log("지원자 목록:", response.data.applicants);
      } catch (error) {
        console.error("지원자 정보를 가져오는 중 오류가 발생했습니다:", error);
        alert("지원자 정보를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [navigate, jobId]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <Container>
      <Content>
        <Title>내 공고에 지원한 지원자</Title>
        {applicants.length > 0 ? (
          <ApplicantList>
            {applicants.map((applicant) => (
              <ApplicantItem
                key={applicant._id} // MongoDB ObjectId 사용
                onClick={() => navigate(`/chat?userId=${applicant._id}`)}
              >
                {applicant.name}
              </ApplicantItem>
            ))}
          </ApplicantList>
        ) : (
          <NoData>지원자가 없습니다.</NoData>
        )}
      </Content>
    </Container>
  );
};

export default MyOpening;

// Styled components
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
  background: #ffffff;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-family: "Inter";
  font-weight: 500;
  font-size: 32px;
  color: #000;
  margin-bottom: 20px;
  text-align: center;
`;

const ApplicantList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const ApplicantItem = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  text-align: center;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const NoData = styled.div`
  color: #777;
  text-align: center;
  font-size: 16px;
`;
