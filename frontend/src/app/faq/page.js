'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import './page.css'

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    const faqs = [
        {
            question: "Is this website official IB?",
            answer: "No, MYP Launchpad is an independent student resource platform. We are not affiliated with, endorsed by, or connected to the International Baccalaureate Organization (IBO). We provide supplementary materials and support to help students better understand the MYP framework."
        },
        {
            question: "How do I access the AI Tutor?",
            answer: "Simply click on the 'AI Tutor' tab in the navigation bar at the top of the page. You'll be taken to an interactive chat interface where you can ask questions about MYP concepts, get help with assignments, or clarify any confusion about the curriculum."
        },
        {
            question: "Do I need to create an account to use the platform?",
            answer: "You can browse most resources and use the AI Tutor without an account. However, creating an account allows you to save your progress, bookmark favorite resources, personalize your AI Tutor experience, and track your learning journey over time."
        },
        {
            question: "How do I navigate between different pages?",
            answer: "Use the navigation bar at the top of the page to move between sections. Click on Home, Resources, AI Tutor, FAQ, About, or Signup to access different areas of the platform. The active page is highlighted with a blue indicator."
        },
        {
            question: "Where can I find MYP resources and study materials?",
            answer: "Click on the 'Resources' tab in the navigation bar. There you'll find comprehensive guides, templates, and materials organized by MYP concepts including Global Contexts, ATL Skills, Assessment Criteria, Command Terms, and more."
        },
        {
            question: "Can I use this platform on my phone or tablet?",
            answer: "Absolutely! MYP Launchpad is fully responsive and works seamlessly on smartphones, tablets, and desktop computers. Your progress syncs across all devices when you're logged in, so you can study anywhere."
        },
        {
            question: "How does the AI Tutor work?",
            answer: "Our AI Tutor has been trained on MYP curriculum documents and teaching materials. It understands MYP-specific terminology, command terms, and assessment criteria. Simply type your question in the chat interface, and it will provide guidance tailored to the MYP framework."
        },
        {
            question: "Can the AI Tutor do my homework for me?",
            answer: "No. The AI Tutor is designed to help you understand concepts and develop your thinking skills—not to complete assignments for you. It will guide you through problems, explain concepts, and help you develop your own answers, promoting genuine learning and academic integrity."
        },
        {
            question: "Is my conversation history with the AI Tutor private?",
            answer: "Yes, we take privacy seriously. Your conversations with the AI Tutor, saved resources, and personal information are kept confidential and secure. We do not share your data with third parties. Please review our Privacy Policy for complete details."
        },
        {
            question: "How do I sign up or log in?",
            answer: "Click the 'Signup/Login' button in the navigation bar or on the homepage. You'll be guided through a simple signup process where you can create an account or log in to an existing one."
        },
        {
            question: "What makes this platform different from other study resources?",
            answer: "MYP Launchpad is specifically designed for MYP students. We combine curated resources, interactive tools, and an AI tutor that understands the MYP framework. Everything is organized to help you build academic efficacy and navigate the unique aspects of the MYP curriculum."
        },
        {
            question: "Can I contribute resources to the platform?",
            answer: "Yes! We welcome contributions from students and educators. Visit the About page to contact our team with your resource suggestions. All submissions are reviewed to ensure quality and alignment with MYP standards before being added to the platform."
        },
        {
            question: "How often is new content added to the platform?",
            answer: "We regularly update our resource library with new materials, guides, and tools. Major updates typically occur at the start of each term, with smaller additions throughout the year based on student requests and curriculum updates."
        },
        {
            question: "Is there a mobile app available?",
            answer: "Currently, MYP Launchpad is a web-based platform accessible through any browser. While we don't have a dedicated mobile app yet, our website is fully optimized for mobile devices and provides the same functionality as the desktop version."
        },
        {
            question: "What if I encounter a technical issue or bug?",
            answer: "If you experience any technical problems, please contact our support team through the About page. Include details about the issue, what page you were on, and what device/browser you're using. We'll work to resolve it as quickly as possible."
        },
        {
            question: "Can I bookmark or save specific resources?",
            answer: "Yes! When you create an account and log in, you'll be able to bookmark your favorite resources for easy access later. This feature helps you build a personalized study library tailored to your needs."
        },
        {
            question: "How do I search for specific topics or resources?",
            answer: "Navigate to the Resources page where materials are organized by category. You can browse through different MYP concepts or use the AI Tutor to ask about specific topics, and it will guide you to relevant resources."
        },
        {
            question: "Is there a cost to use MYP Launchpad?",
            answer: "Basic access to resources and the AI Tutor is free for all students. We believe in making quality MYP support accessible to everyone. Premium features may be introduced in the future, but core functionality will always remain free."
        },
        {
            question: "What browsers are supported?",
            answer: "MYP Launchpad works best on modern browsers including Chrome, Firefox, Safari, and Edge. Make sure your browser is updated to the latest version for the best experience and full functionality."
        },
        {
            question: "Can I use the platform offline?",
            answer: "Currently, MYP Launchpad requires an internet connection to access resources and the AI Tutor. We're exploring offline capabilities for future updates, which would allow you to download resources for offline study."
        },
        {
            question: "How do I provide feedback or suggest new features?",
            answer: "We love hearing from our users! Visit the About page to contact us with feedback, feature requests, or suggestions. Your input helps us continuously improve the platform and better serve the MYP student community."
        },
        {
            question: "What if I can't find the answer to my question here?",
            answer: "If your question isn't answered in this FAQ, try asking the AI Tutor for immediate help, or visit our About page to contact our support team directly. We're here to help and continuously update this FAQ based on common questions."
        }
    ]

    return (
        <main className="faq-page">
            <div className="faq-logo">
                <img src="/logo.png" alt="MYP Launchpad Logo" className="logo-img" />
                <span className="logo-text">MYP LAUNCHPAD</span>
            </div>

            <div className="faq-container">
                <div className="faq-header">
                    <h1 className="faq-title">Frequently Asked Questions</h1>
                    <p className="faq-subtitle">Everything you need to know about the Launchpad.</p>
                </div>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`faq-item ${openIndex === index ? 'active' : ''}`}
                        >
                            <button
                                className="faq-question"
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <ChevronDown
                                    className={`faq-icon ${openIndex === index ? 'rotated' : ''}`}
                                    size={20}
                                />
                            </button>
                            <div className={`faq-answer ${openIndex === index ? 'open' : ''}`}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}
