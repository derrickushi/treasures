import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAuth } from '../frontend/context/authContext';
import GoogleSignInButton from '../frontend/components/GoogleSignInButton';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await login(email, password);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
            style={{
                backgroundImage: 'url(/logo.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                fontFamily: "'Playfair Display', 'Georgia', serif"
            }}>
            {/* Semi-transparent overlay for readability */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(245, 241, 232, 0.85)',
                backdropFilter: 'blur(2px)'
            }} />

            <Head>
                <title>Timeless Treasures - Sign In</title>
                <meta name="description" content="Sign in to your Timeless Treasures account" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Crimson+Text:wght@400;600&display=swap" rel="stylesheet" />
            </Head>

            {/* Vintage ornamental background pattern */}
            <style jsx>{`
                .vintage-border {
                    border: 3px solid #8B7355;
                    border-image: repeating-linear-gradient(
                        45deg,
                        #8B7355,
                        #8B7355 10px,
                        #D4AF37 10px,
                        #D4AF37 20px
                    ) 10;
                    box-shadow: 
                        0 0 0 1px #D4AF37,
                        0 0 0 4px #8B7355,
                        0 10px 30px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3);
                }
                
                .vintage-input {
                    background: #FBF8F1;
                    border: 2px solid #C9B896;
                    font-family: 'Crimson Text', serif;
                    color: #3E2723;
                    transition: all 0.3s ease;
                }
                
                .vintage-input:focus {
                    outline: none;
                    border-color: #D4AF37;
                    box-shadow: 0 0 10px rgba(212, 175, 55, 0.3);
                    background: #FFFEF9;
                }
                
                .vintage-button {
                    background: linear-gradient(to bottom, #8B7355 0%, #704214 100%);
                    border: 2px solid #D4AF37;
                    color: #FBF8F1;
                    font-family: 'Playfair Display', serif;
                    font-weight: 600;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                    box-shadow: 
                        0 4px 6px rgba(0, 0, 0, 0.3),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2);
                    transition: all 0.3s ease;
                }
                
                .vintage-button:hover:not(:disabled) {
                    background: linear-gradient(to bottom, #704214 0%, #5a3410 100%);
                    box-shadow: 
                        0 6px 12px rgba(0, 0, 0, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.2),
                        0 0 20px rgba(212, 175, 55, 0.4);
                    transform: translateY(-2px);
                }
                
                .vintage-button:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }
                
                .ornament {
                    color: #D4AF37;
                    font-size: 2rem;
                    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
                }
                
                .vintage-title {
                    font-family: 'Playfair Display', serif;
                    color: #3E2723;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
                    letter-spacing: 2px;
                }
                
                .vintage-link {
                    color: #8B7355;
                    text-decoration: none;
                    border-bottom: 1px solid #D4AF37;
                    transition: all 0.3s ease;
                    font-family: 'Crimson Text', serif;
                }
                
                .vintage-link:hover {
                    color: #D4AF37;
                    border-bottom-color: #8B7355;
                }
                
                .aged-paper {
                    background: 
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.6)),
                        url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><filter id="noise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /></filter><rect width="100" height="100" filter="url(%23noise)" opacity="0.05"/></svg>');
                    background-color: #FBF8F1;
                }
                
                .divider-ornament {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    color: #8B7355;
                    font-family: 'Crimson Text', serif;
                }
                
                .divider-ornament::before,
                .divider-ornament::after {
                    content: '';
                    flex: 1;
                    border-bottom: 1px solid #C9B896;
                }
                
                .divider-ornament::before {
                    margin-right: 1rem;
                }
                
                .divider-ornament::after {
                    margin-left: 1rem;
                }
            `}</style>

            <div className="max-w-md w-full" style={{ position: 'relative', zIndex: 1 }}>
                {/* Ornamental top decoration */}
                <div className="text-center mb-6">
                    <div className="ornament">❦</div>
                </div>

                {/* Main login card */}
                <div className="vintage-border aged-paper rounded-lg p-8 shadow-2xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="vintage-title text-4xl font-bold mb-2">
                            Timeless Treasures
                        </h1>
                        <div className="ornament text-xl mb-4">✦ ✦ ✦</div>
                        <h2 className="text-2xl font-semibold mb-2" style={{ color: '#3E2723', fontFamily: "'Playfair Display', serif" }}>
                            Member Sign In
                        </h2>
                        <p className="text-sm" style={{ color: '#704214', fontFamily: "'Crimson Text', serif" }}>
                            Access Your Collection
                        </p>
                    </div>

                    {/* Google Sign-In */}
                    <div className="mb-6">
                        <GoogleSignInButton />

                        <div className="my-6 divider-ornament">
                            <span className="px-3 text-sm">Or continue with email</span>
                        </div>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{ color: '#3E2723', fontFamily: "'Crimson Text', serif" }}>
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="vintage-input block w-full px-4 py-3 rounded text-base"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{ color: '#3E2723', fontFamily: "'Crimson Text', serif" }}>
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="vintage-input block w-full px-4 py-3 rounded text-base"
                                placeholder="Enter your password"
                            />
                        </div>

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="vintage-button w-full py-3 px-4 rounded text-sm"
                            >
                                {isLoading ? 'Authenticating...' : 'Enter Collection'}
                            </button>
                        </div>
                    </form>

                    {/* Footer Links */}
                    <div className="mt-8 text-center space-y-3">
                        <p className="text-sm" style={{ color: '#704214', fontFamily: "'Crimson Text', serif" }}>
                            New to our collection?{' '}
                            <Link href="/register">
                                <a className="vintage-link font-semibold">
                                    Register Here
                                </a>
                            </Link>
                        </p>

                        <div className="pt-4 border-t border-gray-300">
                            <Link href="/">
                                <a className="vintage-link text-sm">
                                    ← Return to Marketplace
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Ornamental bottom decoration */}
                <div className="text-center mt-6">
                    <div className="ornament">❦</div>
                </div>

                {/* Established badge */}
                <div className="text-center mt-4">
                    <p className="text-xs" style={{ color: '#8B7355', fontFamily: "'Crimson Text', serif", letterSpacing: '2px' }}>
                        EST. 1890 • PURVEYORS OF FINE ANTIQUITIES
                    </p>
                </div>
            </div>
        </div>
    );
}
