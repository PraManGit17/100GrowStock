import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useBackend from '../../utils/useBackend';
import { TrendingUp, Lock, Mail } from 'lucide-react';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    useBackend;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch(`${useBackend.backendUrl}token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.detail || 'Login failed');
            }

            // Store the received tokens
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);

            // Redirect to dashboard
            navigate('/portfolio');
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'An error occurred during login');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="relative w-full max-w-md p-8 overflow-hidden bg-zinc-900 rounded-xl shadow-2xl">
                {/* Stock chart pattern background */}
                <div className="absolute inset-0 opacity-5">
                    <div className="h-full w-full flex items-end">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="h-[10%] w-[5%] bg-white"
                                style={{
                                    height: `${Math.random() * 60 + 20}%`,
                                    opacity: 0.7,
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="relative z-10">
                    <div className="flex items-center justify-center mb-6">
                        <div className="p-3 bg-zinc-800 rounded-full">
                            <TrendingUp className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    <h2 className="text-white text-2xl font-bold text-center mb-2">
                        Market Access
                    </h2>

                    <p className="text-zinc-400 text-center mb-6">
                        Sign in to your account
                    </p>

                    {error && (
                        <div className="mb-6 p-3 bg-zinc-800 border-l-4 border-red-500 text-white rounded-r text-sm">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col space-y-5"
                    >
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="pl-10 w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="pl-10 w-full p-3 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex items-center justify-center bg-white hover:bg-zinc-200 text-black font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Processing
                                </>
                            ) : (
                                'Access Markets'
                            )}
                        </button>

                        <div className="pt-2">
                            <div className="flex items-center justify-center">
                                <div className="h-px bg-zinc-800 w-full"></div>
                                <span className="px-4 text-xs text-zinc-500 uppercase">
                                    Market Data
                                </span>
                                <div className="h-px bg-zinc-800 w-full"></div>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                                <div className="p-2 bg-zinc-800 rounded">
                                    <div className="text-white">S&P 500</div>
                                    <div className="text-green-500">+1.2%</div>
                                </div>
                                <div className="p-2 bg-zinc-800 rounded">
                                    <div className="text-white">NASDAQ</div>
                                    <div className="text-red-500">-0.8%</div>
                                </div>
                                <div className="p-2 bg-zinc-800 rounded">
                                    <div className="text-white">DOW</div>
                                    <div className="text-green-500">+0.5%</div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
