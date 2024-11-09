import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Chat = () => {
  const location = useLocation();
  const { senderId, receiverId } = location.state || {}; // JobDetail에서 전달받은 senderId와 receiverId
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // 두 사용자 간의 기존 채팅 내역을 불러오는 함수
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8090/chat/messages/${senderId}/${receiverId}`
        );
        setMessages(response.data); // 불러온 채팅 내역을 상태에 저장
      } catch (error) {
        console.error("채팅 내역을 불러오는 중 오류 발생:", error);
      }
    };
    fetchMessages();
  }, [senderId, receiverId]);

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      const newMessage = { senderId, receiverId, message: inputValue };

      try {
        // 새로운 메시지를 서버로 전송
        const response = await axios.post(
          "http://localhost:8090/chat/send-message",
          newMessage
        );
        setMessages([...messages, response.data.chat]); // 새 메시지를 기존 메시지 목록에 추가
        setInputValue(""); // 입력 필드 초기화
      } catch (error) {
        console.error("메시지를 보내는 중 오류 발생:", error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 기본 Enter 키 동작 방지 (줄바꿈 방지)
      handleSendMessage(); // 메시지 전송
    }
  };

  return (
    <Container>
      <Content>
        <Header>
          <ProfileImage src="your-image-url.jpg" alt="Profile" />
          <CustomerName>고객님 이름</CustomerName>
        </Header>
        <ChatBox>
          {messages.map((msg, index) => (
            <Message
              key={index}
              sender={msg.sender === senderId ? "user" : "ai"}
            >
              {msg.message}
            </Message>
          ))}
        </ChatBox>
        <InputContainer>
          <ChatInput
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress} // Enter 키 감지
            placeholder="채팅 내용을 입력하세요..."
          />
          <SendButton onClick={handleSendMessage}>&gt;</SendButton>
        </InputContainer>
      </Content>
    </Container>
  );
};

export default Chat;

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
  width: 600px; /* Increased width for the chat box */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileImage = styled.img`
  width: 50px; /* Adjust the size as needed */
  height: 50px; /* Adjust the size as needed */
  border-radius: 50%;
  margin-right: 10px;
`;

const CustomerName = styled.div`
  font-family: "Inter";
  font-weight: 500;
  font-size: 18px;
`;

const ChatBox = styled.div`
  width: 100%;
  height: 400px; /* Increased height for the chat area */
  background: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto; /* Allow scrolling */
  padding: 10px;
  margin-bottom: 20px; /* Space between chat box and input */
`;

const Message = styled.div`
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background: ${(props) => (props.sender === "user" ? "#e1f5fe" : "#fff3e0")};
  align-self: ${(props) =>
    props.sender === "user" ? "flex-end" : "flex-start"};
`;

const InputContainer = styled.div`
  display: flex;
  width: 100%;
`;

const ChatInput = styled.input`
  width: 100%;
  height: 50px; /* Increased height for input */
  border-radius: 10px;
  padding: 0 10px;
  border: 1px solid #ccc;
  margin-right: 10px; /* Space between input and button */
`;

const SendButton = styled.button`
  height: 50px; /* Increased height for button */
  width: 50px; /* Width to accommodate the icon */
  background: #0003c6;
  border-radius: 10px;
  font-family: "Inter";
  font-weight: 400;
  font-size: 20px; /* Font size for the icon */
  color: #ffffff;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center; /* Center the icon */
`;
