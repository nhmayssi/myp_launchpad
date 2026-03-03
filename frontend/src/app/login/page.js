'use client'

import { useState } from 'react'
import { Mail, Lock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import './page.css'

export default function Login() {
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

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
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
        <main className="login-page">
            <div className="hero-logo">
                <img src="/logo.png" alt="MYP Launchpad Logo" className="logo-img" />
                <span className="logo-text">MYP LAUNCHPAD</span>
            </div>
            <div className="login-container">
                <div className="login-card">
                    {/* Header */}
                    <div className="card-header">
                        <h1>Welcome Back</h1>
                        <p>Enter your details to continue.</p>
                    </div>

                    {/* Error Message */}
                    {errorMsg && <div className="error-message">{errorMsg}</div>}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="input-group">
                            <Mail className="input-icon" size={20} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                required
                            />
                        </div>

                        <div className="input-group">
                            <Lock className="input-icon" size={20} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                            <ArrowRight size={20} />
                        </button>
                    </form>

                    {/* Link to Signup */}
                    <div className="auth-switch">
                        <p>Don't have an account?</p>
                        <Link href="/signup" className="switch-link">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
