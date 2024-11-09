import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const Main = () => {
  const [jobList, setJobList] = useState([]);
  const [resumeList, setResumeList] = useState([]);
  const navigate = useNavigate();

  // 공고 리스트 API 호출
  useEffect(() => {
    const fetchJobList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/mypage/job-postings"
        );
        setJobList(response.data.slice(0, 3)); // 최근 공고 3개
      } catch (error) {
        console.error("공고 리스트 불러오기 중 오류 발생:", error);
      }
    };

    fetchJobList();
  }, []);

  // 이력서 리스트 API 호출
  useEffect(() => {
    const fetchResumeList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8090/mypage/resumes"
        );
        setResumeList(response.data);
      } catch (error) {
        console.error("이력서 리스트 불러오기 중 오류 발생:", error);
      }
    };

    fetchResumeList();
  }, []);

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

      <Service>
        <ServiceTitle>인기 공고</ServiceTitle>
        <ServiceContent>
          <StyledSlider {...settings}>
            {jobList.map((job, index) => (
              <Slide
                key={index}
                onClick={() => navigate(`/jobdetail/${job.id}`)}
              >
                <SlideImageContainer>
                  <SlideImage
                    src={job.image || "images/no-image.png"}
                    alt={job.title}
                  />
                  <JobTitle>{job.title}</JobTitle>
                </SlideImageContainer>
              </Slide>
            ))}
          </StyledSlider>
        </ServiceContent>
      </Service>

      <ResumeSection>
        <ResumeTitle>구직 중인 공고</ResumeTitle>
        <ResumeContent>
          {resumeList.map((resume, index) => (
            <ResumeItem
              key={index}
              onClick={() => navigate(`/resume/${resume.id}`)}
            >
              {resume.title}
            </ResumeItem>
          ))}
        </ResumeContent>
      </ResumeSection>
    </Container>
  );
};

export default Main;

const Container = styled.div`
  display: grid;
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
