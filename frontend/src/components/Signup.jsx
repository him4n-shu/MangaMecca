import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { signup } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const result = await signup(formData);
            if (result.success) {
                navigate('/'); // Redirect to home page after successful signup
            } else {
                setError(result.message || 'Failed to create account. Please try again.');
            }
        } catch (err) {
            setError(err.message || 'Failed to create account. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative overflow-hidden flex items-center justify-center py-4">
            {/* Enhanced Animated SVG Background */}
            <div className="absolute inset-0 z-0">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <radialGradient id="signupAnimeGrad1" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.8" />
                            <stop offset="50%" stopColor="#4ecdc4" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#45b7d1" stopOpacity="0.4" />
                        </radialGradient>
                        <linearGradient id="signupAnimeGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ffd93d" stopOpacity="0.7" />
                            <stop offset="50%" stopColor="#ff6b6b" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0.3" />
                        </linearGradient>
                        <linearGradient id="signupAnimeGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a29bfe" stopOpacity="0.6" />
                            <stop offset="100%" stopColor="#fd79a8" stopOpacity="0.4" />
                        </linearGradient>
                        <filter id="signupAnimeGlow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge> 
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Manga panel frames */}
                    <rect x="50" y="100" width="200" height="150" rx="10" fill="none" stroke="url(#signupAnimeGrad1)" strokeWidth="3" opacity="0.6">
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 150 175; 5 150 175; 0 150 175"
                            dur="8s"
                            repeatCount="indefinite"
                        />
                    </rect>
                    
                    <rect x="700" y="200" width="180" height="120" rx="8" fill="none" stroke="url(#signupAnimeGrad2)" strokeWidth="2" opacity="0.5">
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0; -20,30; 0,0"
                            dur="12s"
                            repeatCount="indefinite"
                        />
                    </rect>
                    
                    {/* Speech bubbles */}
                    <ellipse cx="300" cy="400" rx="80" ry="60" fill="url(#signupAnimeGrad1)" filter="url(#signupAnimeGlow)" opacity="0.7">
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0; 40,20; -10,40; 0,0"
                            dur="10s"
                            repeatCount="indefinite"
                        />
                        <animate attributeName="rx" values="80; 90; 70; 80" dur="6s" repeatCount="indefinite" />
                    </ellipse>
                    
                    <ellipse cx="750" cy="600" rx="60" ry="45" fill="url(#signupAnimeGrad3)" filter="url(#signupAnimeGlow)" opacity="0.6">
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0; -30,25; 20,-15; 0,0"
                            dur="14s"
                            repeatCount="indefinite"
                        />
                    </ellipse>
                    
                    {/* Action lines (speed lines) */}
                    <g opacity="0.4">
                        <line x1="100" y1="500" x2="300" y2="480" stroke="url(#animeGrad2)" strokeWidth="2">
                            <animate attributeName="opacity" values="0.4; 0.8; 0.4" dur="3s" repeatCount="indefinite" />
                        </line>
                        <line x1="120" y1="520" x2="320" y2="500" stroke="url(#animeGrad2)" strokeWidth="1.5">
                            <animate attributeName="opacity" values="0.3; 0.7; 0.3" dur="3.5s" repeatCount="indefinite" />
                        </line>
                        <line x1="140" y1="540" x2="340" y2="520" stroke="url(#animeGrad2)" strokeWidth="1">
                            <animate attributeName="opacity" values="0.2; 0.6; 0.2" dur="4s" repeatCount="indefinite" />
                        </line>
                    </g>
                    
                    {/* Japanese characters/symbols */}
                    <text x="200" y="300" fontSize="40" fill="url(#animeGrad1)" opacity="0.3" fontFamily="serif">
                        漫画
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            values="0 200 300; 10 200 300; 0 200 300"
                            dur="15s"
                            repeatCount="indefinite"
                        />
                    </text>
                    
                    <text x="600" y="500" fontSize="30" fill="url(#animeGrad3)" opacity="0.4" fontFamily="serif">
                        アニメ
                        <animateTransform
                            attributeName="transform"
                            type="translate"
                            values="0,0; 15,10; 0,0"
                            dur="8s"
                            repeatCount="indefinite"
                        />
                    </text>
                    
                    {/* Floating stars (anime style) */}
                    <g opacity="0.6">
                        <polygon points="150,700 155,715 170,715 158,725 163,740 150,730 137,740 142,725 130,715 145,715" fill="url(#animeGrad2)">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                values="0 150 715; 360 150 715"
                                dur="20s"
                                repeatCount="indefinite"
                            />
                            <animate attributeName="opacity" values="0.6; 1; 0.6" dur="4s" repeatCount="indefinite" />
                        </polygon>
                        
                        <polygon points="600,100 605,115 620,115 608,125 613,140 600,130 587,140 592,125 580,115 595,115" fill="url(#animeGrad3)">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                values="0 600 115; 360 600 115"
                                dur="25s"
                                repeatCount="indefinite"
                            />
                        </polygon>
                        
                        <polygon points="750,350 752,358 760,358 754,362 756,370 750,366 744,370 746,362 740,358 748,358" fill="url(#animeGrad1)">
                            <animateTransform
                                attributeName="transform"
                                type="rotate"
                                values="0 750 358; 360 750 358"
                                dur="15s"
                                repeatCount="indefinite"
                            />
                            <animate attributeName="opacity" values="0.4; 0.8; 0.4" dur="3s" repeatCount="indefinite" />
                        </polygon>
                    </g>
                    
                    {/* Energy waves */}
                    <g opacity="0.3">
                        <path d="M0,300 Q200,250 400,300 T800,300" stroke="url(#animeGrad1)" strokeWidth="2" fill="none">
                            <animate attributeName="d" values="M0,300 Q200,250 400,300 T800,300; M0,300 Q200,350 400,300 T800,300; M0,300 Q200,250 400,300 T800,300" dur="8s" repeatCount="indefinite" />
                        </path>
                        <path d="M0,400 Q300,350 600,400 T1200,400" stroke="url(#animeGrad2)" strokeWidth="1.5" fill="none">
                            <animate attributeName="d" values="M0,400 Q300,350 600,400 T1200,400; M0,400 Q300,450 600,400 T1200,400; M0,400 Q300,350 600,400 T1200,400" dur="10s" repeatCount="indefinite" />
                        </path>
                    </g>
                </svg>
                
                {/* Enhanced gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/30 to-pink-900/20"></div>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Glassmorphism Login Form */}
            <div className="relative z-10 max-w-sm w-full mx-4">
                <div className="backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl border border-white/20 p-4">
                    <div className="text-center mb-4">
                        <div className="inline-block p-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm border border-white/10 mb-1">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold font-['mangat'] bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-white">
                            Join MangaMecca
                        </h2>
                        <p className="text-gray-300 text-xs">Create your account and start your manga journey</p>
                    </div>
                    
                    {error && (
                        <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 text-red-200 p-2 rounded-xl text-center mb-3">
                            <span className="text-sm">{error}</span>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div className="space-y-2">
                            <div className="group">
                                <label htmlFor="name" className="block text-gray-200 mb-1.5 text-sm font-medium tracking-wide">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/10 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 placeholder-gray-400 hover:bg-white/10 text-sm"
                                        placeholder="Enter your full name"
                                    />
                                </div>
                            </div>
                            
                            <div className="group">
                                <label htmlFor="email" className="block text-gray-200 mb-1.5 text-sm font-medium tracking-wide">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                        </svg>
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/10 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 placeholder-gray-400 hover:bg-white/10 text-sm"
                                        placeholder="Enter your email address"
                                    />
                                </div>
                            </div>
                            
                            <div className="group">
                                <label htmlFor="password" className="block text-gray-200 mb-1.5 text-sm font-medium tracking-wide">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <svg className="h-4 w-4 text-gray-400 group-focus-within:text-blue-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength="6"
                                        className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/5 backdrop-blur-sm text-white border border-white/10 focus:border-blue-400/50 focus:outline-none focus:ring-2 focus:ring-blue-400/20 transition-all duration-300 placeholder-gray-400 hover:bg-white/10 text-sm"
                                        placeholder="Create a password (min. 6 characters)"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white py-2.5 px-4 rounded-xl font-semibold text-base tracking-wide hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-70 disabled:cursor-not-allowed group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                            <div className="relative flex items-center justify-center space-x-1">
                                {isLoading ? (
                                    <>
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span className="text-sm">Creating Account...</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-sm">Create Account</span>
                                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </div>
                        </button>
                    </form>
                    
                    <div className="text-center space-y-2 mt-3">
                        <div className="flex items-center justify-center space-x-2">
                            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div>
                            <span className="text-gray-400 text-xs">or</span>
                            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent flex-1"></div>
                        </div>
                        <p className="text-gray-300 text-xs">
                            Already have an account?{' '}
                            <button 
                                onClick={() => navigate('/login')}
                                className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200 hover:underline"
                            >
                                Sign in here
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;