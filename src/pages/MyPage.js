import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyPage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [jobPostings, setJobPostings] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        navigate("/signin");
        return;
      }

      try {
        const profileRes = await axios.get(
          "http://localhost:8090/mypage/user-info",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const data = profileRes.data;
        setProfile(data);

        const jobRes = await axios.get(
          `http://localhost:8090/mypage/job-posts?userId=${data.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setJobPostings(jobRes.data);

        const resumeRes = await axios.get(
          "http://localhost:8090/mypage/resumes",
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setResumes(resumeRes.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("데이터를 가져오는 중 오류가 발생했습니다.");
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) return <div>로딩 중...</div>;

  return (
    <Container>
      <Content>
        <Title>마이페이지</Title>
        <ProfileSection>
          <ProfileImage
            src={profile?.profileImage || "default-image-url.jpg"}
            alt="Profile"
          />
          <AccountName>{profile.name || "계정 이름"}</AccountName>
        </ProfileSection>

        <Section>
          <SectionTitle>내가 올린 공고</SectionTitle>
          {Array.isArray(jobPostings) && jobPostings.length > 0 ? (
            <PostList>
              {jobPostings.map((post) => (
                <PostItem
                  key={post._id}
                  onClick={() => navigate(`/MyOpening/${post._id}`)}
                >
                  {post.title}
                </PostItem>
              ))}
            </PostList>
          ) : (
            <NoData>등록된 공고가 없습니다.</NoData>
          )}

          <RegisterButton onClick={() => navigate("/opening")}>
            공고 등록
          </RegisterButton>
        </Section>

        <Section>
          <SectionTitle>나의 이력서 관리</SectionTitle>
          {resumes.length > 0 ? (
            <ResumeList>
              {resumes.map((resume) => (
                <ResumeItem
                  key={resume._id}
                  onClick={() => navigate(`/ResumeDetail/${resume._id}`)}
                >
                  {resume.title}
                </ResumeItem>
              ))}
            </ResumeList>
          ) : (
            <NoData>등록된 이력서가 없습니다.</NoData>
          )}
          <RegisterButton onClick={() => navigate("/resume")}>
            이력서 등록
          </RegisterButton>
        </Section>
      </Content>
    </Container>
  );
};

export default MyPage;

// styled-components는 그대로 유지합니다...

// styled-components remain the same...

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

const ProfileSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 10px;
`;

const AccountName = styled.h2`
  font-family: "Inter";
  font-weight: 500;
  font-size: 24px;
  color: #000;
`;

const Section = styled.div`
  width: 100%;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled.h3`
  font-family: "Inter";
  font-weight: 500;
  font-size: 20px;
  margin-bottom: 10px;
`;

const PostList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const PostItem = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const ResumeList = styled.ul`
  list-style-type: none;
  padding: 0;
  width: 100%;
`;

const ResumeItem = styled.li`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;

const NoData = styled.div`
  color: #777;
  text-align: center;
  font-size: 16px;
`;

const RegisterButton = styled.button`
  width: 100%;
  height: 40px;
  background: #0003c6;
  color: #ffffff;
  font-family: "Inter";
  font-weight: 500;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  margin-top: 10px;
  cursor: pointer;

  &:hover {
    background: #0001a2;
  }
`;
