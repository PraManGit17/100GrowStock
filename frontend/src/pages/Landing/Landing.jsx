import { useState, useEffect, useRef } from 'react';
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    AnimatePresence,
} from 'framer-motion';
import {
    ArrowRight,
    TrendingUp,
    BarChart3,
    PieChart,
    DollarSign,
    Users,
    ChevronDown,
    CheckCircle2,
} from 'lucide-react';
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

// Mock data for charts
const stockData = [
    { name: 'Jan', value: 4000, profit: 2400, loss: 1600 },
    { name: 'Feb', value: 3000, profit: 1398, loss: 1800 },
    { name: 'Mar', value: 5000, profit: 3800, loss: 1200 },
    { name: 'Apr', value: 2780, profit: 3908, loss: 2000 },
    { name: 'May', value: 4890, profit: 4800, loss: 1500 },
    { name: 'Jun', value: 3390, profit: 3800, loss: 1700 },
    { name: 'Jul', value: 4490, profit: 4300, loss: 1100 },
];

const marketData = [
    { name: 'Mon', value: 65 },
    { name: 'Tue', value: 59 },
    { name: 'Wed', value: 80 },
    { name: 'Thu', value: 81 },
    { name: 'Fri', value: 56 },
];

// Custom cursor component
const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef(null);

    useEffect(() => {
        const mouseMove = (e) => {
            // Update position immediately without animation for accuracy
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
            // Also update state for other properties
            setMousePosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);
        };

        const mouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', mouseMove);
        document.addEventListener('mouseleave', mouseLeave);

        return () => {
            window.removeEventListener('mousemove', mouseMove);
            document.removeEventListener('mouseleave', mouseLeave);
        };
    }, [isVisible]);

    return (
        <motion.div
            ref={cursorRef}
            className="custom-cursor"
            style={{
                position: 'fixed',
                pointerEvents: 'none',
                zIndex: 9999,
                mixBlendMode: 'difference',
                transform: 'translate(-50%, -50%)', // Center the cursor on the mouse position
            }}
            animate={{
                opacity: isVisible ? 1 : 0,
                scale: isVisible ? 1 : 0.8,
            }}
            transition={{
                opacity: { duration: 0.15 },
                scale: { duration: 0.15 },
            }}
        >
            <div className="h-8 w-8 rounded-full border-2 border-white flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-white" />
            </div>
        </motion.div>
    );
};

// Noise effect component
const NoiseEffect = () => {
    return (
        <div
            className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
        />
    );
};

// Particle effect component
const ParticleEffect = () => {
    const particlesRef = useRef(null);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const createParticles = () => {
            const newParticles = [];
            for (let i = 0; i < 50; i++) {
                newParticles.push({
                    id: i,
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    size: Math.random() * 2 + 1,
                    speedX: (Math.random() - 0.5) * 0.5,
                    speedY: (Math.random() - 0.5) * 0.5,
                    opacity: Math.random() * 0.5 + 0.1,
                });
            }
            setParticles(newParticles);
        };

        createParticles();

        const animateParticles = () => {
            if (!particlesRef.current) return;
            const ctx = particlesRef.current.getContext('2d');
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            setParticles((prevParticles) =>
                prevParticles.map((p) => {
                    let x = p.x + p.speedX;
                    let y = p.y + p.speedY;

                    if (x < 0 || x > window.innerWidth) p.speedX *= -1;
                    if (y < 0 || y > window.innerHeight) p.speedY *= -1;

                    if (x < 0) x = 0;
                    if (x > window.innerWidth) x = window.innerWidth;
                    if (y < 0) y = 0;
                    if (y > window.innerHeight) y = window.innerHeight;

                    ctx.beginPath();
                    ctx.arc(x, y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
                    ctx.fill();

                    return {
                        ...p,
                        x,
                        y,
                    };
                })
            );

            requestAnimationFrame(animateParticles);
        };

        const resizeCanvas = () => {
            if (particlesRef.current) {
                particlesRef.current.width = window.innerWidth;
                particlesRef.current.height = window.innerHeight;
            }
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        const animationId = requestAnimationFrame(animateParticles);

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={particlesRef}
            className="fixed inset-0 pointer-events-none z-10"
            style={{ opacity: 0.3 }}
        />
    );
};

// Stock market grid background
const GridBackground = () => {
    return (
        <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />
        </div>
    );
};

export default function LandingPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const statsRef = useRef(null);
    const chartsRef = useRef(null);
    const testimonialsRef = useRef(null);
    const ctaRef = useRef(null);

    const heroInView = useInView(heroRef, { once: false, amount: 0.3 });
    const featuresInView = useInView(featuresRef, { once: false, amount: 0.3 });
    const statsInView = useInView(statsRef, { once: false, amount: 0.3 });
    const chartsInView = useInView(chartsRef, { once: false, amount: 0.3 });
    const testimonialsInView = useInView(testimonialsRef, {
        once: false,
        amount: 0.3,
    });
    const ctaInView = useInView(ctaRef, { once: false, amount: 0.3 });

    const { scrollYProgress } = useScroll();
    const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
    const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

    useEffect(() => {
        setIsLoaded(true);

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Animated counter hook
    const Counter = ({ from, to, duration = 2 }) => {
        const [count, setCount] = useState(from);
        const nodeRef = useRef(null);
        const inView = useInView(nodeRef);

        useEffect(() => {
            if (!inView) return;

            let startTime;
            let animationFrame;

            const updateCount = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min(
                    (timestamp - startTime) / (duration * 1000),
                    1
                );
                setCount(Math.floor(from + progress * (to - from)));

                if (progress < 1) {
                    animationFrame = requestAnimationFrame(updateCount);
                }
            };

            animationFrame = requestAnimationFrame(updateCount);

            return () => cancelAnimationFrame(animationFrame);
        }, [from, to, duration, inView]);

        return <span ref={nodeRef}>{count}</span>;
    };

    // Glitch text effect
    const GlitchText = ({ children, delay = 0 }) => {
        const [isGlitching, setIsGlitching] = useState(false);

        useEffect(() => {
            const interval = setInterval(() => {
                setIsGlitching(true);
                setTimeout(() => setIsGlitching(false), 150);
            }, 5000 + delay);

            return () => clearInterval(interval);
        }, [delay]);

        return (
            <span
                className={`inline-block relative ${
                    isGlitching ? 'glitch' : ''
                }`}
            >
                {children}
                {isGlitching && (
                    <>
                        <span
                            className="absolute top-0 left-0 -ml-[2px] text-white opacity-70"
                            style={{
                                clipPath:
                                    'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
                            }}
                        >
                            {children}
                        </span>
                        <span
                            className="absolute top-0 left-0 ml-[2px] text-white opacity-70"
                            style={{
                                clipPath:
                                    'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
                            }}
                        >
                            {children}
                        </span>
                    </>
                )}
            </span>
        );
    };

    return (
        <div className="bg-black text-white min-h-screen px-2 relative overflow-hidden">
            <CustomCursor />
            <NoiseEffect />
            <ParticleEffect />
            <GridBackground />

            {/* Hero Section */}
            <motion.section
                ref={heroRef}
                style={{ opacity, scale }}
                className="min-h-[90vh] flex flex-col justify-center items-center text-center py-20 relative"
            >
                <AnimatePresence>
                    {isLoaded && (
                        <>
                            <motion.div
                                className="absolute top-0 left-0 w-full h-full pointer-events-none"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 0.05 }}
                                transition={{ duration: 2 }}
                            >
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="absolute bg-white"
                                        style={{
                                            height: Math.random() * 100 + 50,
                                            width: '1px',
                                            left: `${(i / 20) * 100}%`,
                                            top: 0,
                                        }}
                                        initial={{ scaleY: 0 }}
                                        animate={{ scaleY: 1 }}
                                        transition={{
                                            duration: Math.random() * 2 + 1,
                                            repeat: Number.POSITIVE_INFINITY,
                                            repeatType: 'reverse',
                                            ease: 'easeInOut',
                                            delay: Math.random() * 2,
                                        }}
                                    />
                                ))}
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="mb-6 relative z-10"
                            >
                                <motion.div
                                    className="inline-block bg-white text-black px-4 py-1 rounded-full text-sm font-medium mb-4"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.span
                                        animate={{
                                            opacity: [1, 0.5, 1],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        DISRUPTING STOCK TRADING
                                    </motion.span>
                                </motion.div>
                            </motion.div>

                            <motion.h1
                                className="text-5xl md:text-7xl font-bold mb-6 leading-tight relative z-10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <span className="block">
                                    <GlitchText>Grow Your</GlitchText>
                                </span>
                                <span className="block">
                                    <GlitchText delay={1000}>
                                        Investments with
                                    </GlitchText>
                                </span>
                                <span className="relative">
                                    <motion.span
                                        className="relative z-10 inline-block"
                                        animate={{
                                            textShadow: [
                                                '0 0 5px rgba(255,255,255,0.1)',
                                                '0 0 15px rgba(255,255,255,0.3)',
                                                '0 0 5px rgba(255,255,255,0.1)',
                                            ],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: 'easeInOut',
                                        }}
                                    >
                                        <GlitchText delay={2000}>
                                            100GrowStock
                                        </GlitchText>
                                    </motion.span>
                                    <motion.span
                                        className="absolute bottom-2 left-0 w-full h-3 bg-white opacity-20 z-0"
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ duration: 1, delay: 1 }}
                                    />
                                </span>
                            </motion.h1>

                            <motion.p
                                className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 relative z-10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                Advanced analytics, real-time market data, and
                                AI-powered insights to help you make{' '}
                                <motion.span
                                    className="relative inline-block"
                                    animate={{
                                        color: [
                                            '#ffffff',
                                            '#00ff00',
                                            '#ffffff',
                                        ],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: 'easeInOut',
                                    }}
                                >
                                    smarter investment decisions
                                </motion.span>
                                .
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                className="relative z-10"
                            >
                                <motion.div
                                    className="relative inline-block"
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow:
                                            '0 0 20px rgba(255,255,255,0.3)',
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <motion.div
                                        className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-600 rounded-lg blur opacity-30"
                                        animate={{
                                            opacity: [0.2, 0.4, 0.2],
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: 'easeInOut',
                                        }}
                                    />
                                    <a
                                        href="/signup"
                                        className="relative bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center"
                                    >
                                        Get Started
                                        <motion.div
                                            animate={{
                                                x: [0, 5, 0],
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Number.POSITIVE_INFINITY,
                                                ease: 'easeInOut',
                                            }}
                                            className="ml-2"
                                        >
                                            <ArrowRight className="h-5 w-5" />
                                        </motion.div>
                                    </a>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className="mt-20 w-full max-w-4xl relative z-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 0.8 }}
                            >
                                <div className="h-64 w-full">
                                    <ResponsiveContainer
                                        width="100%"
                                        height="100%"
                                    >
                                        <AreaChart data={stockData}>
                                            <defs>
                                                <linearGradient
                                                    id="colorValue"
                                                    x1="0"
                                                    y1="0"
                                                    x2="0"
                                                    y2="1"
                                                >
                                                    <stop
                                                        offset="5%"
                                                        stopColor="#FFFFFF"
                                                        stopOpacity={0.3}
                                                    />
                                                    <stop
                                                        offset="95%"
                                                        stopColor="#FFFFFF"
                                                        stopOpacity={0}
                                                    />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid
                                                strokeDasharray="3 3"
                                                stroke="rgba(255,255,255,0.1)"
                                            />
                                            <XAxis
                                                dataKey="name"
                                                stroke="#666"
                                            />
                                            <YAxis stroke="#666" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor:
                                                        'rgba(0, 0, 0, 0.8)',
                                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                                    color: 'white',
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="value"
                                                stroke="#FFFFFF"
                                                fillOpacity={1}
                                                fill="url(#colorValue)"
                                                strokeWidth={2}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="profit"
                                                stroke="#FFFFFF"
                                                strokeWidth={1}
                                                dot={{ r: 4, strokeWidth: 1 }}
                                                activeDot={{
                                                    r: 6,
                                                    strokeWidth: 1,
                                                }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: 2 }}
                                className="mt-10 relative z-10"
                            >
                                <motion.div
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                    }}
                                >
                                    <ChevronDown className="h-8 w-8 text-gray-400" />
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </motion.section>

            {/* Charts Section */}
            <motion.section ref={chartsRef} className="py-20 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={chartsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <GlitchText>Real-Time Analytics</GlitchText>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Track market movements with precision and make
                            data-driven decisions.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={chartsInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                        >
                            <h3 className="text-xl font-bold mb-4">
                                Market Performance
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={stockData}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="rgba(255,255,255,0.1)"
                                        />
                                        <XAxis dataKey="name" stroke="#666" />
                                        <YAxis stroke="#666" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    'rgba(0, 0, 0, 0.8)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                color: 'white',
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="profit"
                                            stroke="#FFFFFF"
                                            strokeWidth={2}
                                            dot={{ r: 4, strokeWidth: 1 }}
                                            activeDot={{ r: 6, strokeWidth: 1 }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="loss"
                                            stroke="#666666"
                                            strokeWidth={2}
                                            dot={{ r: 4, strokeWidth: 1 }}
                                            activeDot={{ r: 6, strokeWidth: 1 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={chartsInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gray-900 p-6 rounded-xl border border-gray-800"
                        >
                            <h3 className="text-xl font-bold mb-4">
                                Trading Volume
                            </h3>
                            <div className="h-64">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={marketData}>
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="rgba(255,255,255,0.1)"
                                        />
                                        <XAxis dataKey="name" stroke="#666" />
                                        <YAxis stroke="#666" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor:
                                                    'rgba(0, 0, 0, 0.8)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                color: 'white',
                                            }}
                                        />
                                        <Bar
                                            dataKey="value"
                                            fill="white"
                                            radius={[4, 4, 0, 0]}
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.section>

            {/* Features Section */}
            <motion.section ref={featuresRef} className="py-20 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={featuresInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <GlitchText>Powerful Features</GlitchText>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Everything you need to make informed investment
                            decisions and grow your portfolio.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <TrendingUp className="h-10 w-10" />,
                                title: 'Real-Time Analytics',
                                description:
                                    'Track market movements as they happen with millisecond precision data.',
                            },
                            {
                                icon: <BarChart3 className="h-10 w-10" />,
                                title: 'Advanced Charting',
                                description:
                                    'Visualize market trends with customizable technical indicators.',
                            },
                            {
                                icon: <PieChart className="h-10 w-10" />,
                                title: 'Portfolio Diversification',
                                description:
                                    'Optimize your investment allocation across different sectors.',
                            },
                            {
                                icon: <DollarSign className="h-10 w-10" />,
                                title: 'Profit Projections',
                                description:
                                    'AI-powered forecasting to estimate potential returns.',
                            },
                            {
                                icon: <Users className="h-10 w-10" />,
                                title: 'Social Trading',
                                description:
                                    'Learn from successful investors and share strategies.',
                            },
                            {
                                icon: <CheckCircle2 className="h-10 w-10" />,
                                title: 'Risk Assessment',
                                description:
                                    'Evaluate investment risks with our proprietary scoring system.',
                            },
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={
                                    featuresInView ? { opacity: 1, y: 0 } : {}
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1 * index,
                                }}
                                whileHover={{
                                    y: -10,
                                    boxShadow:
                                        '0 10px 30px -10px rgba(255,255,255,0.2)',
                                }}
                            >
                                <div className="p-6 h-full bg-gray-900 border border-gray-800 rounded-xl hover:border-white transition-all duration-300 relative overflow-hidden group">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    />
                                    <motion.div
                                        className="mb-4 text-white relative z-10"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 10,
                                        }}
                                    >
                                        {feature.icon}
                                    </motion.div>
                                    <h3 className="text-xl font-bold mb-2 relative z-10">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-400 relative z-10">
                                        {feature.description}
                                    </p>

                                    <motion.div
                                        className="absolute bottom-0 right-0 w-20 h-20 opacity-10"
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 20,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: 'linear',
                                        }}
                                    >
                                        <svg
                                            viewBox="0 0 100 100"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <circle
                                                cx="50"
                                                cy="50"
                                                r="40"
                                                stroke="white"
                                                strokeWidth="2"
                                                fill="none"
                                            />
                                        </svg>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* Stats Section */}
            <motion.section
                ref={statsRef}
                className="py-20 bg-gray-900 relative"
            >
                <motion.div
                    className="absolute inset-0 opacity-10"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: 'reverse',
                    }}
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.2'%3E%3Cpath d='M36 34v-4h-10v10h4v-6h6zM30 20h-4v4h4v-4zm-10 4h4v-4h-4v4zm6 0h4v-4h-4v4zm-6 6h4v-4h-4v4zm6 0h4v-4h-4v4zm6-10h4v-4h-4v4zm-6 10h4v-4h-4v4zm-6 6h4v-4h-4v4zm6 0h4v-4h-4v4zm6 0h4v-4h-4v4zm6-6h4v-4h-4v4zm0 6h4v-4h-4v4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
                    }}
                />
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        initial={{ opacity: 0 }}
                        animate={statsInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        {[
                            {
                                value: 2500000,
                                label: 'Active Users',
                                prefix: '',
                                suffix: '+',
                            },
                            {
                                value: 850,
                                label: 'Trading Volume',
                                prefix: '$',
                                suffix: 'B+',
                            },
                            {
                                value: 150,
                                label: 'Global Markets',
                                prefix: '',
                                suffix: '+',
                            },
                            {
                                value: 99.9,
                                label: 'Uptime',
                                prefix: '',
                                suffix: '%',
                            },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="text-center relative"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={
                                    statsInView ? { opacity: 1, scale: 1 } : {}
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1 * index,
                                }}
                                whileHover={{ y: -5 }}
                            >
                                <motion.div
                                    className="absolute inset-0 bg-white opacity-0 blur-xl rounded-full"
                                    animate={
                                        statsInView
                                            ? {
                                                  opacity: [0, 0.05, 0],
                                                  scale: [1, 1.2, 1],
                                              }
                                            : {}
                                    }
                                    transition={{
                                        duration: 2,
                                        repeat: Number.POSITIVE_INFINITY,
                                        delay: index * 0.2,
                                    }}
                                />
                                <motion.div
                                    className="text-4xl md:text-5xl font-bold mb-2 relative"
                                    animate={
                                        statsInView
                                            ? {
                                                  opacity: [0, 1],
                                                  y: [20, 0],
                                              }
                                            : {}
                                    }
                                    transition={{
                                        duration: 0.8,
                                        delay: 0.2 * index,
                                    }}
                                >
                                    {stat.prefix}
                                    <Counter
                                        from={0}
                                        to={stat.value}
                                        duration={2.5}
                                    />
                                    {stat.suffix}
                                </motion.div>
                                <div className="text-gray-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* Testimonials */}
            <motion.section ref={testimonialsRef} className="py-20 relative">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={testimonialsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <GlitchText>What Our Users Say</GlitchText>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Join thousands of satisfied investors who have
                            transformed their trading experience.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                quote: '100GrowStock completely changed how I approach the market. The analytics are unmatched.',
                                author: 'Sarah J.',
                                role: 'Day Trader',
                            },
                            {
                                quote: 'As a long-term investor, the portfolio diversification tools have been invaluable for my strategy.',
                                author: 'Michael T.',
                                role: 'Portfolio Manager',
                            },
                            {
                                quote: 'The real-time data and intuitive interface make trading decisions faster and more accurate.',
                                author: 'Alex R.',
                                role: 'Retail Investor',
                            },
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={
                                    testimonialsInView
                                        ? { opacity: 1, y: 0 }
                                        : {}
                                }
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1 * index,
                                }}
                                whileHover={{
                                    y: -10,
                                    boxShadow:
                                        '0 10px 30px -10px rgba(255,255,255,0.2)',
                                }}
                            >
                                <div className="p-6 h-full bg-gray-900 border border-gray-800 rounded-xl relative overflow-hidden group">
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    />
                                    <div className="mb-4 text-4xl">"</div>
                                    <p className="text-gray-300 mb-6 relative z-10">
                                        {testimonial.quote}
                                    </p>
                                    <div className="mt-auto relative z-10">
                                        <div className="font-bold">
                                            {testimonial.author}
                                        </div>
                                        <div className="text-gray-400 text-sm">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                ref={ctaRef}
                className="py-20 bg-gray-900 relative overflow-hidden"
            >
                <motion.div
                    className="absolute inset-0 opacity-20"
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: 'reverse',
                    }}
                />

                <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent"
                    animate={{
                        opacity: [0.1, 0.5, 0.1],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: 'easeInOut',
                    }}
                />

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            <GlitchText>
                                Ready to Grow Your Investments?
                            </GlitchText>
                        </h2>
                        <p className="text-gray-300 text-lg mb-10 max-w-2xl mx-auto">
                            Join 100GrowStock today and get access to
                            professional-grade trading tools and insights.
                        </p>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="relative inline-block"
                        >
                            <motion.div
                                className="absolute -inset-0.5 bg-gradient-to-r from-white to-gray-600 rounded-lg blur opacity-30"
                                animate={{
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    ease: 'easeInOut',
                                }}
                            />
                            <a
                                href="/signup"
                                className="relative bg-white text-black hover:bg-gray-200 px-8 py-4 rounded-lg text-lg font-medium inline-flex items-center"
                            >
                                Get Started Now
                                <motion.div
                                    animate={{
                                        x: [0, 5, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        ease: 'easeInOut',
                                    }}
                                    className="ml-2"
                                >
                                    <ArrowRight className="h-5 w-5" />
                                </motion.div>
                            </a>
                        </motion.div>

                        <p className="mt-6 text-gray-400">
                            No credit card required. Free plan available.
                        </p>
                    </motion.div>
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="py-10 border-t border-gray-800">
                <div className="max-w-7xl mx-auto text-center">
                    <p className="text-gray-500">
                        © {new Date().getFullYear()} 100GrowStock. All rights
                        reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
