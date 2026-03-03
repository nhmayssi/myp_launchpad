'use client'

import { useState, useEffect, useMemo } from 'react'
import { GraduationCap, BookOpen, Asterisk, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import './page.css'

export default function HomePage() {
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [snowflakes, setSnowflakes] = useState([])
    const supabase = createClient()

    useEffect(() => {
        // Generate snowflake styles client-side only to avoid hydration mismatch
        const flakes = [...Array(50)].map(() => ({
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${5 + Math.random() * 10}s`,
            opacity: 1,
            fontSize: `${Math.random() * 4 + 2}px`,
        }))
        setSnowflakes(flakes)
    }, [])

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
            setAuthLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    return (
        <main className="homepage">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-logo">
                    <img src="/logo.png" alt="MYP Launchpad Logo" className="logo-img" />
                    <span className="logo-text">MYP LAUNCHPAD</span>
                </div>
                <div className="hero-container">
                    <div className="hero-content">
                        <h1 className="hero-title">
                            Your Personalized <br />
                            MYP Guide
                        </h1>
                        <div className="hero-separator" />
                        <div className="hero-actions-vertical">
                            {!authLoading && (user ? (
                                <Link href="/about" className="btn btn-outline full-width">
                                    LEARN MORE
                                </Link>
                            ) : (
                                <Link href="/signup" className="btn btn-outline full-width">
                                    SIGN UP / LOGIN
                                </Link>
                            ))}
                            <Link href="/ai-tutor" className="btn btn-primary full-width">
                                MY TUTOR
                            </Link>
                        </div>
                    </div>
                    <div className="hero-visual">
                        <div className="icon-wrapper graduation-cap">
                            <GraduationCap size={400} strokeWidth={2.0} />
                        </div>
                        <div className="icon-wrapper book-icon">
                            <BookOpen size={64} />
                        </div>
                        <div className="icon-wrapper asterisk-icon">
                            <Asterisk size={40} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Brief Section */}
            <section className="mission-section">
                <div className="mission-container">
                    <div className="mission-left">
                        <span className="section-subtitle">MISSION BRIEF</span>
                        <h2 className="section-title">Master the Middle Years</h2>
                        <div className="mission-description">
                            <p>
                                The MYP (Middle Years Programme) is a challenging framework
                                that encourages students to make practical connections
                                between their studies and the real world.
                            </p>
                            <p>
                                Our Launchpad is designed to de-mystify the criteria, clarify the
                                curriculum and provide instant feedback—so you can
                                focus on learning, not guessing.
                            </p>
                        </div>
                    </div>
                    <div className="mission-right">
                        <div className="brief-card">
                            <ul className="brief-list">
                                <li>
                                    <span className="list-number">1</span>
                                    Global Contexts
                                </li>
                                <li>
                                    <span className="list-number">2</span>
                                    ATL Skills
                                </li>
                                <li>
                                    <span className="list-number">3</span>
                                    Assessment Criteria
                                </li>
                                <li>
                                    <span className="list-number">4</span>
                                    Statement of Inquiry
                                </li>
                                <li>
                                    <span className="list-number">5</span>
                                    Personal Project
                                </li>
                                <li>
                                    <span className="list-number">6</span>
                                    Service As Action
                                </li>
                                <li>
                                    <span className="list-number">7</span>
                                    IDU
                                </li>
                                <li>
                                    <span className="list-number">8</span>
                                    Learner Profiles
                                </li>
                                <li>
                                    <span className="list-number">9</span>
                                    Command Terms
                                </li>
                                <li>
                                    <span className="list-number">10</span>
                                    Smart Goals
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Flight Plan Section */}
            <section className="flight-plan-section">
                <div className="snowfall-container">
                    {snowflakes.map((style, i) => (
                        <div
                            key={i}
                            className="snowflake"
                            style={style}
                        />
                    ))}
                </div>
                <div className="container">
                    <h2 className="flight-plan-title">Your Flight Plan</h2>
                    <div className="flight-grid">
                        <div className="flight-card">
                            <div className="card-header">
                                <h3>Pick a Topic</h3>
                                <span className="card-number">01</span>
                            </div>
                            <p>
                                Browse our extensive library of MYP-specific guides and templates.
                            </p>
                        </div>
                        <div className="flight-card">
                            <div className="card-header">
                                <h3>Consult AI</h3>
                                <span className="card-number">02</span>
                            </div>
                            <p>
                                Stuck on a concept? Ask our specialized MYP Tutor for instant clarification.
                            </p>
                        </div>
                        <div className="flight-card">
                            <div className="card-header">
                                <h3>Liftoff</h3>
                                <span className="card-number">03</span>
                            </div>
                            <p>
                                Apply the knowledge to your assessments and watch your grades soar.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-container">
                    <h2 className="cta-title">Ready for Liftoff?</h2>
                    <p className="cta-description">
                        Your journey through the MYP doesn't have to be a solo flight.
                        Join thousands of students mastering the curriculum.
                    </p>
                    <div className="cta-actions">
                        {!authLoading && (user ? (
                            <Link href="/about" className="btn btn-outline">
                                LEARN MORE
                            </Link>
                        ) : (
                            <Link href="/signup" className="btn btn-outline">
                                SIGN UP / LOGIN
                            </Link>
                        ))}
                        <Link href="/ai-tutor" className="btn btn-primary wide">
                            AI TUTOR
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
