import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import './Chat.css';
import { useChat } from '../ChatContext';
import Sidebar from '../components/Sidebar';

function Chat({rooms}) {
  const { messages, sendMessage } = useChat([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedUser, setSelectedUser] = useState();

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    sendMessage(newMessage);
    setNewMessage('');
  };

  return (
    <Container fluid className="full-height">
      <Row className="full-height">
        {/* Left Border for Chat Names (1/4) */}
        <Col xs={3} className="border-right">
          <div className="chat-names">
            <div className="chat-name-header">
              <h4>Find Friends</h4>
              <i className="bi bi-arrow-right-circle"></i>
            </div>
            {/* render the the sidebar components */}
            <Sidebar rooms={rooms}/>
          </div>
        </Col>

        {/* Right Border for Messages (1/6) */}
        <Col xs={9}>
          <div className="message-box">
            <div className="messages-label">Messages</div>
            {/* Messages go here */}
            {messages.map((message, i) => (
              <div key={i} className="message">
                {message.content}
              </div>
            ))}

            {/* Form for Typing Messages and Send Button */}
            <Form className="message-form" onSubmit={handleSendMessage}>
              <Form.Control
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="message-input"
              />
              <Button variant="primary" type="submit" className="send-button">
                Send
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Chat;
