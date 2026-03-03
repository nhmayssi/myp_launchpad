'use client'

import { useState } from 'react'
import { User, Mail, Lock, BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import './page.css'

export default function Signup() {
    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setErrorMsg('')

        const formData = new FormData(e.currentTarget)
        const email = formData.get('email')
        const password = formData.get('password')
        const fullName = formData.get('fullName')
        const mypYear = formData.get('mypYear')

        try {
            // Sign Up Logic
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        myp_year: mypYear,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            })
            if (error) throw error
            router.push('/home')
        } catch (error) {
            setErrorMsg(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="signup-page">
            <div className="hero-logo">
                <img src="/logo.png" alt="MYP Launchpad Logo" className="logo-img" />
                <span className="logo-text">MYP LAUNCHPAD</span>
            </div>
            <div className="signup-container">
                <div className="signup-card">
                    {/* Header */}
                    <div className="card-header">
                        <h1>Get Started</h1>
                        <p>Create an account to join the launchpad.</p>
                    </div>

                    {/* Error Message */}
                    {errorMsg && <div className="error-banner">{errorMsg}</div>}

                    {/* Form */}
                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Full Name</label>
                            <div className="input-wrapper">
                                <User className="input-icon" size={18} />
                                <input name="fullName" type="text" placeholder="Your Name" required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <div className="input-wrapper">
                                <Mail className="input-icon" size={18} />
                                <input name="email" type="email" placeholder="email@example.com" required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <Lock className="input-icon" size={18} />
                                <input name="password" type="password" placeholder="••••••••" required />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>MYP Year</label>
                            <div className="input-wrapper">
                                <BookOpen className="input-icon" size={18} />
                                <select name="mypYear">
                                    <option value="1">MYP 1</option>
                                    <option value="2">MYP 2</option>
                                    <option value="3">MYP 3</option>
                                    <option value="4">MYP 4</option>
                                    <option value="5">MYP 5</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn-submit" disabled={loading}>
                            {loading ? 'Processing...' : 'Create Account'}
                            {!loading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <p className="auth-footer">
                        Already have an account?
                        <Link href="/login" className="auth-link"> Log In</Link>
                    </p>
                </div>
            </div>

            {/* Decorative Blobs */}
            <div className="blur-blob b-1"></div>
            <div className="blur-blob b-2"></div>
        </main>
    )
}
