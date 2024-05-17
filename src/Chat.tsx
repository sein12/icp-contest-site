import React, { useState } from 'react';
import './Chat.css';

interface Message {
    text: string;
    user: string;
    timestamp: string;
    avatar: string;
}

interface ChatProps {
    messages: Message[];
    onSendMessage: (message: Message) => void;
}

const Chat: React.FC<ChatProps> = ({ messages, onSendMessage }) => {
    const [input, setInput] = useState<string>('');

    const handleSendMessage = () => {
        if (input.trim() !== '') {
            const newMessage: Message = {
                text: input,
                user: 'User',
                timestamp: new Date().toLocaleTimeString(),
                avatar: 'https://via.placeholder.com/40'
            };
            onSendMessage(newMessage);
            setInput('');
        }
    };

    return (
        <div className="chat">
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className="chat-message">
                        <img src={message.avatar} alt="avatar" className="chat-avatar" />
                        <div className="chat-message-content">
                            <div className="chat-message-header">
                                <span className="chat-user">{message.user}</span>
                                <span className="chat-timestamp">{message.timestamp}</span>
                            </div>
                            <div className="chat-message-text">{message.text}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
}

export default Chat;
