import { Target, Lightbulb, Users, BookOpen, Brain, TrendingUp, Mail, MessageCircle } from 'lucide-react'
import './page.css'

export default function About() {
    return (
        <main className="about-page">
            {/* Logo */}
            <div className="hero-logo">
                <img src="/logo.png" alt="MYP Launchpad Logo" className="logo-img" />
                <span className="logo-text">MYP LAUNCHPAD</span>
            </div>

            {/* Hero Section */}
            <section className="about-hero">
                <div className="about-container">
                    <h1 className="about-title">About MYP Launchpad</h1>
                    <p className="about-lead">
                        Empowering MYP students to navigate the framework with confidence,
                        clarity, and academic excellence.
                    </p>
                </div>
            </section>

            {/* Problem Section */}
            <section className="about-section problem-section">
                <div className="about-container">
                    <div className="section-header">
                        <Target className="section-icon animate-float" size={40} />
                        <h2 className="section-title">The Challenge We're Solving</h2>
                    </div>
                    <div className="content-grid">
                        <div className="content-card">
                            <h3>Student Overwhelm</h3>
                            <p>
                                The Middle Years Programme is a well-regarded educational system that develops
                                logical, creative, and resilient learners. However, MYP students often struggle
                                with the framework's complexity, leading to feelings of overwhelm and disorientation.
                            </p>
                        </div>
                        <div className="content-card">
                            <h3>Declining Confidence</h3>
                            <p>
                                Research shows that many students experience a decrease in confidence after
                                transitioning into the MYP. This reduction in self-efficacy can lead to lowered
                                self-esteem and a negative self-perception in relation to learning.
                            </p>
                        </div>
                        <div className="content-card">
                            <h3>Information Gap</h3>
                            <p>
                                While the MYP framework is comprehensive, students often find it difficult to
                                access clear, student-friendly explanations of key concepts like Global Contexts,
                                ATL Skills, Assessment Criteria, and Command Terms.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Solution Section */}
            <section className="about-section solution-section">
                <div className="about-container">
                    <div className="section-header">
                        <Lightbulb className="section-icon animate-pulse" size={40} />
                        <h2 className="section-title">Our Solution</h2>
                    </div>
                    <div className="solution-content">
                        <p className="solution-intro">
                            MYP Launchpad is a web-based digital platform designed to comprehensively outline
                            all MYP requirements in a student-friendly, accessible format. We combine detailed
                            explanations with cutting-edge AI technology to create a personalized learning experience.
                        </p>
                        <div className="solution-features">
                            <div className="feature-item">
                                <BookOpen className="feature-icon" size={32} />
                                <div className="feature-content">
                                    <h4>Comprehensive Resources</h4>
                                    <p>
                                        Detailed, easy-to-understand explanations of all MYP concepts including
                                        Global Contexts, ATL Skills, Assessment Criteria, Command Terms, Personal
                                        Project guidance, Service as Action, IDU, Learner Profiles, and SMART Goals.
                                    </p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <Brain className="feature-icon" size={32} />
                                <div className="feature-content">
                                    <h4>AI-Powered Tutor</h4>
                                    <p>
                                        Our specialized AI tutor is trained on MYP curriculum documents and understands
                                        the framework inside-out. It provides personalized guidance, answers questions,
                                        and helps clarify confusing concepts—available 24/7.
                                    </p>
                                </div>
                            </div>
                            <div className="feature-item">
                                <TrendingUp className="feature-icon" size={32} />
                                <div className="feature-content">
                                    <h4>Building Academic Efficacy</h4>
                                    <p>
                                        By demystifying the MYP framework and providing instant, accurate support,
                                        we help students build confidence, reduce anxiety, and develop a stronger
                                        sense of academic self-efficacy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="about-section mission-section">
                <div className="about-container">
                    <div className="section-header">
                        <Users className="section-icon" size={40} />
                        <h2 className="section-title">Our Mission</h2>
                    </div>
                    <div className="mission-content">
                        <blockquote className="mission-quote">
                            "To empower MYP students worldwide by providing clear, accessible, and comprehensive
                            resources that transform confusion into clarity, overwhelm into confidence, and
                            uncertainty into academic excellence."
                        </blockquote>
                        <p className="mission-text">
                            We believe every student deserves to understand the framework they're learning within.
                            MYP Launchpad exists to level the playing field, ensuring that all students—regardless
                            of their school's resources or their personal circumstances—have access to high-quality,
                            MYP-specific support that helps them thrive.
                        </p>
                    </div>
                </div>
            </section>

            {/* Why It Matters Section */}
            <section className="about-section impact-section">
                <div className="about-container">
                    <h2 className="section-title centered">Why This Matters</h2>
                    <div className="impact-grid">
                        <div className="impact-card">
                            <div className="impact-number">42.5%</div>
                            <p className="impact-label">Average MYP student achievement level</p>
                            <p className="impact-description">
                                Many students struggle to reach higher achievement levels due to framework confusion
                            </p>
                        </div>
                        <div className="impact-card">
                            <div className="impact-number">24/7</div>
                            <p className="impact-label">AI Tutor availability</p>
                            <p className="impact-description">
                                Get help whenever you need it, without waiting for office hours or appointments
                            </p>
                        </div>
                        <div className="impact-card">
                            <div className="impact-number">10+</div>
                            <p className="impact-label">Core MYP concepts covered</p>
                            <p className="impact-description">
                                Comprehensive coverage of all essential MYP framework elements
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="about-section contact-section">
                <div className="about-container">
                    <div className="section-header">
                        <MessageCircle className="section-icon" size={40} />
                        <h2 className="section-title">Get In Touch</h2>
                    </div>
                    <div className="contact-content">
                        <p className="contact-intro">
                            Have questions, feedback, or suggestions? We'd love to hear from you!
                            Your input helps us continuously improve and better serve the MYP student community.
                        </p>
                        <div className="contact-methods">
                            <div className="contact-card">
                                <Mail className="contact-icon" size={28} />
                                <h4>Email Us</h4>
                                <p>support@myplaunchpad.com</p>
                            </div>
                            <div className="contact-card">
                                <MessageCircle className="contact-icon" size={28} />
                                <h4>Feedback</h4>
                                <p>Share your ideas and suggestions to help us improve</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="about-section disclaimer-section">
                <div className="about-container">
                    <div className="disclaimer-box">
                        <p className="disclaimer-text">
                            <strong>Important Note:</strong> MYP Launchpad is an independent student resource
                            platform. We are not affiliated with, endorsed by, or connected to the International
                            Baccalaureate Organization (IBO). All content is created to supplement—not replace—
                            official IB materials and classroom instruction.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    )
}
