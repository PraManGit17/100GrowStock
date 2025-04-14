import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, User, Mail, Lock, ArrowRight } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        password_confirm: '',
        first_name: '',
        last_name: '',
    });
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        } else if (formData.email.length > 254) {
            newErrors.email = 'Email must be less than 254 characters';
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 1) {
            newErrors.password = 'Password is required';
        }

        // Password confirmation
        if (!formData.password_confirm) {
            newErrors.password_confirm = 'Please confirm your password';
        } else if (formData.password !== formData.password_confirm) {
            newErrors.password_confirm = 'Passwords do not match';
        }

        // First name validation
        if (!formData.first_name) {
            newErrors.first_name = 'First name is required';
        } else if (formData.first_name.length > 30) {
            newErrors.first_name = 'First name must be less than 30 characters';
        }

        // Last name validation
        if (!formData.last_name) {
            newErrors.last_name = 'Last name is required';
        } else if (formData.last_name.length > 30) {
            newErrors.last_name = 'Last name must be less than 30 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        try {
            const response = await fetch(`${backendUrl}register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': '69420',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                if (data.errors) {
                    setErrors(data.errors);
                } else {
                    setErrors({ api: data.message || 'Registration failed' });
                }
                return;
            }
            toast.success('Registeration Successful!', {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'light',
                transition: Bounce,
            });
            navigate('/login');
        } catch (error) {
            toast.error('Registeration Failed!');
            console.error('Registration error:', error);
            setErrors({ api: 'An error occurred during registration' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-black">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="flex flex-col items-center max-w-md w-full">
                    <div className="relative w-full p-8 overflow-hidden bg-zinc-900 rounded-xl shadow-2xl">
                        {/* Stock chart pattern background */}
                        <div className="absolute inset-0 opacity-5">
                            <div className="h-full w-full flex items-end">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="h-[10%] w-[5%] bg-white"
                                        style={{
                                            height: `${
                                                Math.random() * 60 + 20
                                            }%`,
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
                                Create Account
                            </h2>
                            <p className="text-zinc-400 text-center mb-6">
                                Join the trading platform
                            </p>

                            {errors.api && (
                                <div className="mb-6 p-3 bg-zinc-800 border-l-4 border-red-500 text-white rounded-r text-sm">
                                    {errors.api}
                                </div>
                            )}

                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col space-y-4"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                                            <input
                                                type="text"
                                                name="first_name"
                                                placeholder="First Name"
                                                className={`pl-10 w-full p-3 rounded-lg bg-zinc-800 text-white border ${
                                                    errors.first_name
                                                        ? 'border-red-500'
                                                        : 'border-zinc-700'
                                                } focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent`}
                                                value={formData.first_name}
                                                onChange={handleChange}
                                                maxLength={30}
                                            />
                                        </div>
                                        {errors.first_name && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.first_name}
                                            </p>
                                        )}
                                    </div>
                                    <div>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-4 w-4" />
                                            <input
                                                type="text"
                                                name="last_name"
                                                placeholder="Last Name"
                                                className={`pl-10 w-full p-3 rounded-lg bg-zinc-800 text-white border ${
                                                    errors.last_name
                                                        ? 'border-red-500'
                                                        : 'border-zinc-700'
                                                } focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent`}
                                                value={formData.last_name}
                                                onChange={handleChange}
                                                maxLength={30}
                                            />
                                        </div>
                                        {errors.last_name && (
                                            <p className="mt-1 text-xs text-red-500">
                                                {errors.last_name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Email"
                                            className={`pl-10 w-full p-3 rounded-lg bg-zinc-800 text-white border ${
                                                errors.email
                                                    ? 'border-red-500'
                                                    : 'border-zinc-700'
                                            } focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent`}
                                            value={formData.email}
                                            onChange={handleChange}
                                            maxLength={254}
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.email}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Password"
                                            className={`pl-10 w-full p-3 rounded-lg bg-zinc-800 text-white border ${
                                                errors.password
                                                    ? 'border-red-500'
                                                    : 'border-zinc-700'
                                            } focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent`}
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.password}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-500 h-5 w-5" />
                                        <input
                                            type="password"
                                            name="password_confirm"
                                            placeholder="Confirm Password"
                                            className={`pl-10 w-full p-3 rounded-lg bg-zinc-800 text-white border ${
                                                errors.password_confirm
                                                    ? 'border-red-500'
                                                    : 'border-zinc-700'
                                            } focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent`}
                                            value={formData.password_confirm}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    {errors.password_confirm && (
                                        <p className="mt-1 text-xs text-red-500">
                                            {errors.password_confirm}
                                        </p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center justify-center bg-white hover:bg-zinc-200 text-black font-bold py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? (
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
                                        'Create Trading Account'
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={() => navigate('/login')}
                            className="flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-2 px-4 rounded-lg transition"
                        >
                            Login to an existing account{' '}
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                    </div>

                    <div className="mt-8 grid grid-cols-3 gap-3 w-full">
                        <div className="p-3 bg-zinc-900 rounded-lg text-center">
                            <div className="text-xs text-zinc-500">NASDAQ</div>
                            <div className="text-sm font-medium text-white">
                                14,897.24
                            </div>
                            <div className="text-xs text-green-500">+1.2%</div>
                        </div>
                        <div className="p-3 bg-zinc-900 rounded-lg text-center">
                            <div className="text-xs text-zinc-500">S&P 500</div>
                            <div className="text-sm font-medium text-white">
                                4,782.36
                            </div>
                            <div className="text-xs text-red-500">-0.3%</div>
                        </div>
                        <div className="p-3 bg-zinc-900 rounded-lg text-center">
                            <div className="text-xs text-zinc-500">DOW</div>
                            <div className="text-sm font-medium text-white">
                                38,124.57
                            </div>
                            <div className="text-xs text-green-500">+0.7%</div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </>
    );
}
