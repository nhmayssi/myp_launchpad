'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { House, BookText, MessageSquare, CircleHelp, Info, UserPlus, LogOut, User } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'
import './Navbar.css'

const navItems = [
    { name: 'Home', href: '/home', icon: House },
    { name: 'Resources', href: '/resources', icon: BookText },
    { name: 'AI Tutor', href: '/ai-tutor', icon: MessageSquare },
    { name: 'FAQ', href: '/faq', icon: CircleHelp },
    { name: 'About', href: '/about', icon: Info },
]

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()
    const [hoveredPath, setHoveredPath] = useState(null)
    const [user, setUser] = useState(null)
    const [authLoading, setAuthLoading] = useState(true)
    const [showDropdown, setShowDropdown] = useState(false)
    const isNotSticky = pathname === '/signup' || pathname === '/login'

    const supabase = createClient()

    useEffect(() => {
        // onAuthStateChange fires INITIAL_SESSION on mount, so no need for a separate getUser() call.
        // Using both causes a race condition that makes the UI flicker.
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null)
            setAuthLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        await supabase.auth.signOut()
        setShowDropdown(false)
        router.push('/home')
    }

    return (
        <div className={`navbar-container ${isNotSticky ? 'not-sticky' : ''}`}>
            <nav
                className="navbar-wrapper"
                onMouseLeave={() => setHoveredPath(null)}
            >
                {navItems.map((item) => {
                    const isPageActive = pathname === item.href
                    const isVisuallyActive = hoveredPath ? (hoveredPath === item.href) : isPageActive
                    const Icon = item.icon

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onMouseEnter={() => setHoveredPath(item.href)}
                            className={`nav-item ${isVisuallyActive ? 'active' : ''}`}
                        >
                            <div className="pill-bg" />
                            <Icon
                                className="nav-icon"
                                size={20}
                                strokeWidth={isVisuallyActive ? 2.5 : 2}
                            />
                            <span className="nav-text">
                                {item.name}
                            </span>
                        </Link>
                    )
                })}

                {/* Auth Section - Show Signup or Dashboard */}
                {!authLoading && (user ? (
                    <div
                        className="nav-item dashboard-item"
                        onMouseEnter={() => setShowDropdown(true)}
                        onMouseLeave={() => setShowDropdown(false)}
                    >
                        <div className="pill-bg" />
                        <User className="nav-icon" size={20} strokeWidth={2} />
                        <span className="nav-text">Dashboard</span>

                        {showDropdown && (
                            <div className="dropdown-menu">
                                <div className="dropdown-header">
                                    {user.email}
                                </div>
                                <Link href="/dashboard" className="dropdown-item" onClick={() => setShowDropdown(false)}>
                                    <User size={16} />
                                    Profile Settings
                                </Link>
                                <button onClick={handleLogout} className="dropdown-item">
                                    <LogOut size={16} />
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link
                        href="/signup"
                        onMouseEnter={() => setHoveredPath('/signup')}
                        className={`nav-item ${hoveredPath === '/signup' || pathname === '/signup' ? 'active' : ''}`}
                    >
                        <div className="pill-bg" />
                        <UserPlus className="nav-icon" size={20} strokeWidth={2} />
                        <span className="nav-text">Signup</span>
                    </Link>
                ))}
            </nav>
        </div>
    )
}
