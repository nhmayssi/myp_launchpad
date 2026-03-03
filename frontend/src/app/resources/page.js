'use client';

import { useState, useEffect } from 'react';
import { X, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { frameworkTopicsData } from './data';
import './page.css';

export default function Resources() {
    const [selectedTopic, setSelectedTopic] = useState(null);

    // Lock body scroll when drawer is open
    useEffect(() => {
        if (selectedTopic) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
            document.documentElement.classList.add('lenis-stopped');
        } else {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            document.documentElement.classList.remove('lenis-stopped');
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.documentElement.style.overflow = 'unset';
            document.documentElement.classList.remove('lenis-stopped');
        };
    }, [selectedTopic]);

    return (
        <main className="resources-page">
            <div className="hero-logo">
                <img src="/logo.png" alt="MYP Launchpad Logo" className="logo-img" />
                <span className="logo-text">MYP LAUNCHPAD</span>
            </div>
            <div className="resources-header">
                <h1 className="resources-title">MYP Framework</h1>
                <p className="resources-description">
                    Explore the core pillars that make up the Middle Years Programme.
                    Click on any card to dive deeper into the concepts and master your curriculum.
                </p>
            </div>

            <div className="framework-grid">
                {frameworkTopicsData.map((topic) => {
                    const Icon = topic.icon;
                    return (
                        <div
                            key={topic.id}
                            className="concept-card"
                            onClick={() => setSelectedTopic(topic)}
                        >
                            <div className="card-icon-wrapper">
                                <Icon size={28} />
                            </div>
                            <h3>{topic.title}</h3>
                            <p>{topic.description}</p>
                            <div className="explore-link">
                                Explore <ChevronRight size={16} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Retractable Sidebar / Drawer */}
            <div
                className={`drawer-overlay ${selectedTopic ? 'open' : ''}`}
                onClick={() => setSelectedTopic(null)}
            />
            <div className={`drawer-content ${selectedTopic ? 'open' : ''}`} data-lenis-prevent>
                {selectedTopic && (
                    <>
                        <div className="drawer-header">
                            <div className="card-icon-wrapper">
                                <selectedTopic.icon size={24} />
                            </div>
                            <button
                                className="close-drawer"
                                onClick={() => setSelectedTopic(null)}
                            >
                                <X size={20} />
                            </button>
                        </div>
                        <div className="drawer-body" data-lenis-prevent>
                            <h2 className="drawer-title">{selectedTopic.title}</h2>
                            <div className="markdown-content">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {selectedTopic.content}
                                </ReactMarkdown>
                            </div>

                            <div className="bottom-note">
                                <p>
                                    Need help applying <strong>{selectedTopic.title}</strong> to your specific project?
                                    Ask the AI Tutor for personalized guidance!
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </main>
    );
}
