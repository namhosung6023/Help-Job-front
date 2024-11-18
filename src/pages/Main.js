import React, { useEffect, useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Main = () => {
  const [jobList, setJobList] = useState([]);
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const navigate = useNavigate();

  // 공고 및 이력서 API 호출 함수
  const fetchData = async (url, setter) => {
    try {
      const response = await axios.get(url);
      console.log("Fetched data:", response.data); // 응답 데이터 확인
      setter(response.data);
    } catch (error) {
      console.error("데이터 불러오기 중 오류 발생:", error);
      alert("데이터를 불러오지 못했습니다. 다시 시도해주세요.");
    }
  };

  // 공고 및 이력서 데이터 가져오기
  useEffect(() => {
    setLoading(true); // 데이터 로딩 시작
    fetchData("http://localhost:8090/mypage/job-postings", (data) =>
      setJobList(data.slice(0, 5)) // 최근 공고 5개만 가져옴
    );
    fetchData("http://localhost:8090/mypage/resumes", (data) => {
      setResumeList(data);
      setLoading(false); // 데이터 로딩 끝
    });
  }, []);

  // 클릭 이벤트 핸들러
  const handleJobClick = useCallback((id) => navigate(`/jobdetail/${id}`), [navigate]);
  const handleResumeClick = useCallback((id) => navigate(`/resume/${id}`), [navigate]);

  // 슬라이더 설정
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Container>
      <Search />
      {/* 인기 공고 섹션 */}
      <Service>
        <ServiceTitle>인기 공고</ServiceTitle>
        <ServiceContent>
          {loading ? (
            <LoadingSpinner>로딩 중...</LoadingSpinner>
          ) : jobList.length > 0 ? (
            <StyledSlider {...settings}>
              {jobList.map((job) => (
                <Slide key={job._id} onClick={() => handleJobClick(job._id)}>
                  <SlideImageContainer>
                    <SlideImage src={job.image || "/images/no-image.png"} alt={job.title} />
                    <JobTitle>{job.title}</JobTitle>
                  </SlideImageContainer>
                </Slide>
              ))}
            </StyledSlider>
          ) : (
            <NoData>등록된 공고가 없습니다.</NoData>
          )}
        </ServiceContent>
      </Service>

      {/* 이력서 섹션 */}
      <ResumeSection>
        <ResumeTitle>구직 중인 공고</ResumeTitle>
        <ResumeContent>
          {loading ? (
            <LoadingSpinner>로딩 중...</LoadingSpinner>
          ) : resumeList.length > 0 ? (
            resumeList.map((resume) => (
              <ResumeItem key={resume._id} onClick={() => handleResumeClick(resume._id)}>
                {resume.title}
              </ResumeItem>
            ))
          ) : (
            <NoData>등록된 이력서가 없습니다.</NoData>
          )}
        </ResumeContent>
      </ResumeSection>
    </Container>
  );
};

export default Main;

// 스타일 컴포넌트
const Container = styled.div`
  display : flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding: 50px 0;
  background-color: #fff;
`;

const Search = styled.input.attrs({ placeholder: "어떤 도움이 필요하세요?" })`
  width: 50vw;
  max-width: 600px;
  padding: 10px 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  text-align: center;
  background-color: #eee;
`;

const Service = styled.div`
  width: 80%;
  margin-top: 20px;
`;

const ServiceTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
`;

const ServiceContent = styled.div`
  width: 100%;
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Slide = styled.div`
  cursor: pointer;
`;

const SlideImageContainer = styled.div`
  width: 300px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: #f0f0f0;
  overflow: hidden;
  text-align: center;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
`;

const JobTitle = styled.div`
  font-size: 18px;
  color: #333;
  margin-top: 10px;
`;

const ResumeSection = styled.div`
  width: 80%;
  margin-top: 40px;
`;

const ResumeTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
`;

const ResumeContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
`;

const ResumeItem = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 10px;
  font-size: 18px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f9f9f9;

  &:hover {
    background-color: #e9e9e9;
  }
`;

const NoData = styled.div`
  font-size: 18px;
  color: #999;
  text-align: center;
  margin-top: 20px;
`;

const LoadingSpinner = styled.div`
  font-size: 18px;
  color: #333;
  text-align: center;
  margin-top: 20px;
  font-weight: bold;
`;
