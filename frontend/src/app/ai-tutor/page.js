'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Image from 'next/image';
import API_BASE_URL from '@/utils/api';
import './page.css';

export default function AiTutor() {
    const [user, setUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [currentChatId, setCurrentChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [authLoading, setAuthLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const supabase = createClient();

    // Get current user on mount
    useEffect(() => {
        const getUser = async () => {
            setAuthLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            if (user) {
                fetchChats(user.id);
            }
            setAuthLoading(false);
        };
        getUser();
    }, []);

    // Auto-scroll to bottom when messages change or loading
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Fetch user's chats
    const fetchChats = async (userId) => {
        const { data, error } = await supabase
            .from('chats')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

        if (data) {
            setChats(data);
        }
    };

    // Fetch messages for a chat
    const fetchMessages = async (chatId) => {
        const { data, error } = await supabase
            .from('messages')
            .select('*')
            .eq('chat_id', chatId)
            .order('created_at', { ascending: true });

        if (data) {
            setMessages(data);
        }
    };

    // Create a new chat
    const createNewChat = async () => {
        if (!user) return;

        const response = await fetch(`${API_BASE_URL}/api/new-chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: user.id })
        });

        const data = await response.json();
        setCurrentChatId(data.chat_id);
        setMessages([]);
        fetchChats(user.id);
    };

    // Select an existing chat
    const selectChat = (chatId) => {
        setCurrentChatId(chatId);
        fetchMessages(chatId);
    };

    // Send a message
    const sendMessage = async (messageContent) => {
        if (!messageContent.trim() || !user) return;

        // If no chat exists, create one first
        let chatId = currentChatId;
        if (!chatId) {
            const response = await fetch(`${API_BASE_URL}/api/new-chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id })
            });
            const data = await response.json();
            chatId = data.chat_id;
            setCurrentChatId(chatId);
        }

        // Add user message to UI immediately
        const userMessage = { role: 'user', content: messageContent };
        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);

        // Send to backend
        try {
            const response = await fetch(`${API_BASE_URL}/api/chat`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: messageContent,
                    chat_id: chatId
                })
            });

            const data = await response.json();

            // Add AI response to UI
            const aiMessage = { role: 'assistant', content: data.answer };
            setMessages(prev => [...prev, aiMessage]);

            // Refresh chat list
            fetchChats(user.id);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        sendMessage(inputValue);
    };

    // Quick action chips
    const quickActions = [
        'I have a test',
        'I need feedback',
        'Explain this',
        'Help with math',
        "What's IDU?"
    ];

    // Helper to format chat title (capitalize first letters)
    const formatChatTitle = (title) => {
        if (!title) return 'New Chat';
        return title
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    return (
        <div className="ai-tutor-container">
            {/* Sidebar */}
            <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <div className="logo-wrapper">
                        <Image
                            src="/logo.png"
                            alt="MYP Launchpad Logo"
                            width={38}
                            height={32}
                            className="sidebar-logo"
                        />
                        <div className="logo">MYP LAUNCHPAD</div>
                    </div>
                    <button
                        className="toggle-sidebar"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        aria-label="Close sidebar"
                    >
                        ‹
                    </button>
                </div>

                <button className="new-chat-btn" onClick={createNewChat}>
                    + New Chat
                </button>

                <div className="chats-section">
                    <h3>Your Chats:</h3>
                    <ul className="chat-list">
                        {chats.map((chat) => (
                            <li
                                key={chat.id}
                                className={chat.id === currentChatId ? 'active' : ''}
                                onClick={() => selectChat(chat.id)}
                            >
                                {formatChatTitle(chat.title)}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Sidebar Toggle Button - shows when sidebar is closed */}
            {!sidebarOpen && (
                <button
                    className="sidebar-toggle-btn"
                    onClick={() => setSidebarOpen(true)}
                >
                    ☰
                </button>
            )}

            {/* Main Chat Area */}
            <main className={`chat-main ${!sidebarOpen ? 'full-width' : ''}`}>
                {/* Messages or Welcome Screen */}
                <div className="messages-container">
                    {messages.length === 0 ? (
                        <div className="welcome-screen">
                            <h1>
                                Hi there, I'm your personalized MYP Tutor.
                                <br />
                                How can I help, <span className="username">
                                    {authLoading ? '...' : (
                                        user?.user_metadata?.full_name
                                            ? user.user_metadata.full_name.split(' ')[0]
                                            : user?.email
                                                ? (user.email.split('@')[0].split('.')[0].charAt(0).toUpperCase() + user.email.split('@')[0].split('.')[0].slice(1))
                                                : 'Student'
                                    )}
                                </span>?
                            </h1>
                        </div>
                    ) : (
                        <div className="messages-list">
                            {messages.map((msg, index) => (
                                <div key={index} className={`message ${msg.role}`}>
                                    <div className="message-content">
                                        {msg.role === 'assistant' ? (
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                        ) : (
                                            msg.content
                                        )}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="message assistant loading">
                                    <div className="message-content">Thinking...</div>
                                </div>
                            )}
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </main>

            {/* Input Area - Outside main for proper positioning */}
            <div className={`input-area ${!sidebarOpen ? 'full-width' : ''}`}>
                <form onSubmit={handleSubmit} className="input-form">
                    <button type="button" className="attach-btn">+</button>
                    <input
                        type="text"
                        placeholder="Ask me anything..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isLoading}
                    />
                    <button type="submit" className="send-btn" disabled={isLoading}>
                        ↑
                    </button>
                </form>

                {/* Quick Actions - only show when no messages */}
                {messages.length === 0 && (
                    <div className="quick-actions">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                className="quick-action-chip"
                                onClick={() => sendMessage(action)}
                                disabled={isLoading}
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
