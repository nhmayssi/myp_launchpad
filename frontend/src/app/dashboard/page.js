'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { User, Trash2, Mail, Calendar, Shield, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import API_BASE_URL from '@/utils/api';
import './page.css';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    useEffect(() => {
        const getData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push('/login');
                return;
            }
            setUser(user);

            const { data: profileData } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();

            setProfile(profileData);
            setLoading(false);
        };
        getData();
    }, []);

    const handleClearHistory = async () => {
        if (!window.confirm('Are you sure you want to erase ALL your chat history? This cannot be undone.')) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(`${API_BASE_URL}/api/clear-history`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id })
            });

            if (response.ok) {
                alert('All chat history has been erased.');
            } else {
                throw new Error('Failed to clear history');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (loading) return <div className="dashboard-loading">Loading...</div>;

    return (
        <div className="dashboard-container">
            <div className="dashboard-card">
                <div className="dashboard-header">
                    <div className="header-left">
                        <div className="profile-icon">
                            <User size={48} />
                        </div>
                        <h1>Profile Settings</h1>
                    </div>
                    <Link href="/ai-tutor" className="back-to-tutor-btn">
                        <MessageSquare size={18} />
                        Go Back to Tutor
                    </Link>
                </div>

                <div className="dashboard-content">
                    <section className="info-section">
                        <h2>Account Information</h2>
                        <div className="info-grid">
                            <div className="info-item">
                                <Mail size={18} />
                                <div className="info-text">
                                    <label>Email</label>
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <User size={18} />
                                <div className="info-text">
                                    <label>Full Name</label>
                                    <p>{profile?.full_name || 'Not set'}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <Shield size={18} />
                                <div className="info-text">
                                    <label>MYP Year</label>
                                    <p>Year {profile?.myp_year || 'Not set'}</p>
                                </div>
                            </div>
                            <div className="info-item">
                                <Calendar size={18} />
                                <div className="info-text">
                                    <label>Account Created</label>
                                    <p>{new Date(user.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="danger-section">
                        <h2>Danger Zone</h2>
                        <p>Actions here are permanent and cannot be reversed.</p>
                        <button
                            className="clear-history-btn"
                            onClick={handleClearHistory}
                            disabled={isDeleting}
                        >
                            <Trash2 size={18} />
                            {isDeleting ? 'Erasing...' : 'Erase All Chat History'}
                        </button>
                    </section>
                </div>
            </div>
        </div>
    );
}
