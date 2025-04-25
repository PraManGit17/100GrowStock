import { Calendar, ShareNetwork, DownloadSimple } from '@phosphor-icons/react';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import gsap from 'gsap';

function Portfolio() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/signup');
        }
    }, [navigate]);

    const stockList = [
        {
            name: 'TSLA',
            amount: '$1720',
            change: -3.2,
            profit: false,
            since: 'From Jul, 2024 - Present',
            graphData: [
                { month: 'May', price: 200 },
                { month: 'Jun', price: 195 },
                { month: 'Jul', price: 190 },
                { month: 'Aug', price: 185 },
                { month: 'Sep', price: 180 },
                { month: 'Oct', price: 175 },
                { month: 'Nov', price: 170 },
                { month: 'Dec', price: 165 },
                { month: 'Jan', price: 162 },
                { month: 'Feb', price: 161 },
                { month: 'Mar', price: 160 },
                { month: 'Apr', price: 160 },
            ],
            points: '0,5 10,8 20,10 30,12 40,15 50,18',
        },
        {
            name: 'NFLX',
            amount: '$880',
            change: -1.75,
            profit: false,
            since: 'From Jun, 2024 - Present',
            graphData: [
                { month: 'May', price: 1050 },
                { month: 'Jun', price: 1000 },
                { month: 'Jul', price: 990 },
                { month: 'Aug', price: 980 },
                { month: 'Sep', price: 970 },
                { month: 'Oct', price: 960 },
                { month: 'Nov', price: 940 },
                { month: 'Dec', price: 930 },
                { month: 'Jan', price: 910 },
                { month: 'Feb', price: 900 },
                { month: 'Mar', price: 890 },
                { month: 'Apr', price: 880 },
            ],
            points: '0,6 10,7 20,10 30,12 40,14 50,16',
        },
        {
            name: 'APPL',
            amount: '$2300',
            change: 2.87,
            profit: true,
            since: 'From Dec, 2024 - Present',
            graphData: [
                { month: 'May', price: 180 },
                { month: 'Jun', price: 185 },
                { month: 'Jul', price: 187 },
                { month: 'Aug', price: 190 },
                { month: 'Sep', price: 195 },
                { month: 'Oct', price: 200 },
                { month: 'Nov', price: 210 },
                { month: 'Dec', price: 215 },
                { month: 'Jan', price: 220 },
                { month: 'Feb', price: 225 },
                { month: 'Mar', price: 228 },
                { month: 'Apr', price: 230 },
            ],
            points: '0,15 10,10 20,12 30,6 40,10 50,5',
        },
        {
            name: 'GOOGL',
            amount: '$1950',
            change: 1.45,
            profit: true,
            since: 'From Nov, 2024 - Present',
            graphData: [
                { month: 'May', price: 172 },
                { month: 'Jun', price: 174 },
                { month: 'Jul', price: 176 },
                { month: 'Aug', price: 179 },
                { month: 'Sep', price: 180 },
                { month: 'Oct', price: 182 },
                { month: 'Nov', price: 183 },
                { month: 'Dec', price: 185 },
                { month: 'Jan', price: 186 },
                { month: 'Feb', price: 188 },
                { month: 'Mar', price: 192 },
                { month: 'Apr', price: 195 },
            ],
            points: '0,18 10,15 20,12 30,10 40,7 50,5',
        },
        {
            name: 'NVDA',
            amount: '$2850',
            change: 4.5,
            profit: true,
            since: 'From Aug, 2024 - Present',
            graphData: [
                { month: 'May', price: 150 },
                { month: 'Jun', price: 160 },
                { month: 'Jul', price: 170 },
                { month: 'Aug', price: 180 },
                { month: 'Sep', price: 200 },
                { month: 'Oct', price: 215 },
                { month: 'Nov', price: 230 },
                { month: 'Dec', price: 240 },
                { month: 'Jan', price: 250 },
                { month: 'Feb', price: 260 },
                { month: 'Mar', price: 270 },
                { month: 'Apr', price: 285 },
            ],
            points: '0,12 10,8 20,6 30,4 40,3 50,2',
        },
        {
            name: 'BTC',
            amount: '$34000',
            change: 6.8,
            profit: true,
            since: 'From Apr, 2024 - Present',
            graphData: [
                { month: 'May', price: 27000 },
                { month: 'Jun', price: 28000 },
                { month: 'Jul', price: 29000 },
                { month: 'Aug', price: 31000 },
                { month: 'Sep', price: 32000 },
                { month: 'Oct', price: 33000 },
                { month: 'Nov', price: 33500 },
                { month: 'Dec', price: 34000 },
                { month: 'Jan', price: 34500 },
                { month: 'Feb', price: 35000 },
                { month: 'Mar', price: 35500 },
                { month: 'Apr', price: 36000 },
            ],
            points: '0,20 10,18 20,15 30,12 40,9 50,6',
        },
        {
            name: 'ETH',
            amount: '$2150',
            change: -2.1,
            profit: false,
            since: 'From Jan, 2024 - Present',
            graphData: [
                { month: 'May', price: 2400 },
                { month: 'Jun', price: 2350 },
                { month: 'Jul', price: 2300 },
                { month: 'Aug', price: 2250 },
                { month: 'Sep', price: 2200 },
                { month: 'Oct', price: 2150 },
                { month: 'Nov', price: 2120 },
                { month: 'Dec', price: 2100 },
                { month: 'Jan', price: 2080 },
                { month: 'Feb', price: 2070 },
                { month: 'Mar', price: 2060 },
                { month: 'Apr', price: 2050 },
            ],
            points: '0,4 10,7 20,9 30,11 40,13 50,15',
        },
        {
            name: 'DOGE',
            amount: '$0.07',
            change: -4.8,
            profit: false,
            since: 'From Mar, 2024 - Present',
            graphData: [
                { month: 'May', price: 0.12 },
                { month: 'Jun', price: 0.11 },
                { month: 'Jul', price: 0.1 },
                { month: 'Aug', price: 0.09 },
                { month: 'Sep', price: 0.085 },
                { month: 'Oct', price: 0.08 },
                { month: 'Nov', price: 0.075 },
                { month: 'Dec', price: 0.072 },
                { month: 'Jan', price: 0.071 },
                { month: 'Feb', price: 0.07 },
                { month: 'Mar', price: 0.069 },
                { month: 'Apr', price: 0.07 },
            ],
            points: '0,5 10,7 20,9 30,11 40,13 50,15',
        },
        {
            name: 'GOLD',
            amount: '$1950',
            change: 1.2,
            profit: true,
            since: 'From Apr, 2024 - Present',
            graphData: [
                { month: 'May', price: 1850 },
                { month: 'Jun', price: 1860 },
                { month: 'Jul', price: 1875 },
                { month: 'Aug', price: 1890 },
                { month: 'Sep', price: 1900 },
                { month: 'Oct', price: 1915 },
                { month: 'Nov', price: 1920 },
                { month: 'Dec', price: 1930 },
                { month: 'Jan', price: 1940 },
                { month: 'Feb', price: 1950 },
                { month: 'Mar', price: 1960 },
                { month: 'Apr', price: 1970 },
            ],
            points: '0,15 10,12 20,10 30,8 40,6 50,4',
        },
    ];

    const sortedStocks = [...stockList].sort((a, b) => b.change - a.change);
    const [selectedStock, setSelectedStock] = useState(sortedStocks[0]);
    const mainChartRef = useRef(null);
    const topInvestmentsRef = useRef(null);
    const stockDetailsRef = useRef(null);

    useEffect(() => {
        // Animate main chart section
        gsap.fromTo(
            mainChartRef.current,
            {
                x: -100,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
            }
        );

        // Animate top investments panel
        gsap.fromTo(
            topInvestmentsRef.current,
            {
                x: 100,
                opacity: 0,
            },
            {
                x: 0,
                opacity: 1,
                duration: 1.2,
                delay: 0.3,
                ease: 'power3.out',
            }
        );

        // Animate inner text/details
        gsap.fromTo(
            stockDetailsRef.current,
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                delay: 0.6,
                ease: 'power3.out',
            }
        );
    }, []);

    const score = 74;
    const radius = 60;
    const circumference = Math.PI * radius;
    const offset = circumference * ((100 - score) / 100);

    return (
        <div>
            <div className="h-screen cursor-pointer px-6 flex gap-30">
                <div
                    ref={mainChartRef}
                    className="bg-black h-4/5 w-3/5 border-2 border-white rounded-2xl p-3 mt-20"
                >
                    <div ref={stockDetailsRef} className="flex space-x-24 p-5">
                        <div className="px-2 flex-col space-y-1">
                            <div className="px-2 text-xl font-medium text-gray-400">
                                {selectedStock.name}
                            </div>
                            <div className="px-5 text-8xl font-normal">
                                {selectedStock.amount}
                            </div>
                            <div className="flex items-end">
                                <div
                                    className={`px-4 text-2xl font-bold ${
                                        selectedStock.profit
                                            ? 'text-green-700'
                                            : 'text-red-700'
                                    }`}
                                >
                                    $
                                    {Math.abs(
                                        selectedStock.change * 100
                                    ).toFixed(2)}
                                </div>
                                <div className="text-md font-medium text-gray-200">
                                    ({Math.abs(selectedStock.change)}% Than Past
                                    Year)
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-24">
                            <div className="text-lg font-semibold text-gray-400">
                                {selectedStock.since}
                            </div>
                            <div className="flex-col space-y-3">
                                <div className="flex gap-5">
                                    <div className="w-28 h-12 bg-black text-white flex items-center justify-center gap-1 rounded-xl border-white border-2 font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-black">
                                        <ShareNetwork size={20} weight="bold" />
                                        Share
                                    </div>

                                    <div className="w-32 h-12 bg-black text-white flex items-center justify-center gap-1 rounded-xl border-white border-2 font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-black">
                                        <DownloadSimple
                                            size={20}
                                            weight="bold"
                                        />
                                        Download
                                    </div>
                                </div>
                                <div className="h-13 w-90 border-2 border-white rounded-xl flex items-center px-3 py-2 bg-black gap-4">
                                    <Calendar
                                        size={34}
                                        color="white"
                                        weight="bold"
                                    />
                                    <hr className="h-8 border-2 border-white bg-gray-400"></hr>
                                    <div className="flex justify-between items-center w-full">
                                        {['1M', '3M', '1Y', '3Y', '1YD'].map(
                                            (label) => (
                                                <div
                                                    key={label}
                                                    className="px-2 py-2 rounded-md cursor-pointer text-lg font-semibold transition-all duration-200 text-white hover:bg-white hover:text-black"
                                                >
                                                    {label}
                                                </div>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <ResponsiveContainer width="100%" height="80%">
                    <AreaChart data={selectedStock.graphData} margin={{ top: 50, right: 30, left: 0, bottom: 60 }}>
                        <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#00FF7F" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#00FF7F" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#FFF" />
                        <YAxis stroke="#fff" tickCount={10} />
                        <Tooltip
                            contentStyle={{ backgroundColor: '#111', border: 'none', color: '#fff' }}
                            labelStyle={{ color: '#ccc' }}
                            itemStyle={{ color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="price" stroke="#ffffff" fillOpacity={1} fill="url(#colorPrice)" />
                    </AreaChart>
                </ResponsiveContainer> */}

                    <ResponsiveContainer width="100%" height="80%">
                        <AreaChart
                            data={selectedStock.graphData}
                            margin={{ top: 50, right: 30, left: 0, bottom: 60 }}
                        >
                            <defs>
                                <linearGradient
                                    id="greenGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#00FF7F"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#00FF7F"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                                <linearGradient
                                    id="redGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#FF4C4C"
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#FF4C4C"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>

                            <XAxis dataKey="month" stroke="#FFF" />
                            <YAxis stroke="#fff" tickCount={10} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#111',
                                    border: 'none',
                                    color: '#fff',
                                }}
                                labelStyle={{ color: '#ccc' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="price"
                                stroke={
                                    selectedStock.profit ? '#00FF7F' : '#FF4C4C'
                                }
                                fillOpacity={1}
                                fill={
                                    selectedStock.profit
                                        ? 'url(#greenGradient)'
                                        : 'url(#redGradient)'
                                }
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div
                    ref={topInvestmentsRef}
                    className="bg-black w-[30%] border-2 border-white rounded-2xl p-4 mt-10 h-fit overflow-y-auto"
                >
                    <div className="px-4 flex flex-col">
                        <div className="py-3 text-3xl font-bold text-left text-white">
                            Your Investments
                        </div>
                        <hr className="w-[95%] border border-white mb-4" />

                        <div className="flex-col space-y-6 text-white">
                            {sortedStocks.map((stock, index) => (
                                <div
                                    key={index}
                                    onClick={() => setSelectedStock(stock)}
                                    className="cursor-pointer space-y-2"
                                >
                                    <div className="flex flex-col space-y-2">
                                        <div className="flex justify-between items-center text-lg font-medium">
                                            <div className="w-[30%]">
                                                {stock.name}
                                            </div>

                                            <div className="w-[40%] flex justify-center">
                                                <svg
                                                    width="60"
                                                    height="20"
                                                    viewBox="0 0 50 20"
                                                    fill="none"
                                                >
                                                    <polyline
                                                        points={stock.points}
                                                        fill="none"
                                                        stroke={
                                                            stock.profit
                                                                ? '#22c55e'
                                                                : '#ef4444'
                                                        }
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                            </div>

                                            <div className="w-[30%] text-right">
                                                <div className="text-base font-semibold">
                                                    {stock.amount}
                                                </div>
                                                <div
                                                    className={`text-sm ${
                                                        stock.profit
                                                            ? 'text-green-500'
                                                            : 'text-red-500'
                                                    }`}
                                                >
                                                    {stock.change > 0
                                                        ? `^$${stock.change}% ↑`
                                                        : `↓$${Math.abs(
                                                              stock.change
                                                          )}% ↓`}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="w-full border border-white bg-gray-500" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-screen w-screen p-5 mt-5">
                <div className="h-full w-full rounded-2xl px-10">
                    <div>
                        <div className="flex items-start font-bold text-4xl shadow-md hover:scale-105 transition-transform duration-300">
                            Portfolio Overview
                        </div>
                    </div>

                    <div className="flex w-full gap-5 mt-5">
                        {/* LEFT SIDE: Amount Invested + Recent Activities */}
                        <div className="flex flex-col w-1/2 gap-5">
                            {/* Amount Invested Card */}
                            <div className="w-full h-80 border-2 border-white rounded-2xl flex flex-col">
                                <div className="flex flex-col gap-5 px-10 py-8">
                                    <div className="font-semibold text-2xl">
                                        Amount Invested
                                    </div>
                                    <hr className="border border-white w-full"></hr>
                                    <div className="font-bold text-5xl px-3">
                                        $15,500
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center p-2 w-full">
                                    <div className="flex w-[90%] h-3 rounded-2xl overflow-hidden mb-3">
                                        <div
                                            className="bg-blue-500"
                                            style={{ width: '40%' }}
                                        ></div>
                                        <div
                                            className="bg-yellow-400"
                                            style={{ width: '30%' }}
                                        ></div>
                                        <div
                                            className="bg-amber-600"
                                            style={{ width: '20%' }}
                                        ></div>
                                        <div
                                            className="bg-purple-500"
                                            style={{ width: '10%' }}
                                        ></div>
                                    </div>

                                    <div className="flex w-[90%] justify-between text-md text-white font-medium">
                                        <div className="flex gap-2 items-center px-2 w-[40%]">
                                            <span>📈</span>
                                            <span>Stocks</span>
                                        </div>
                                        <div className="flex gap-2 items-center px-2 w-[30%]">
                                            <span>₿</span>
                                            <span>Bitcoin</span>
                                        </div>
                                        <div className="flex gap-2 items-center px-2 w-[20%]">
                                            <span>🏅</span>
                                            <span>Gold</span>
                                        </div>
                                        <div className="flex gap-2 items-center px-2 w-[10%]">
                                            <span>📦</span>
                                            <span>Others</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between w-[90%] mt-4 text-lg text-white font-medium">
                                        <div className="text-green-400">
                                            Profit Today: +$1,250
                                        </div>
                                        <div className="text-red-400">
                                            Loss Today: -$430
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Activities Card */}
                            <div className="w-full border-2 border-white rounded-2xl text-white bg-[#1a1a1a]">
                                <div className="flex flex-col gap-5 px-10 py-8">
                                    <div className="flex items-end justify-between px-3">
                                        <div className="text-2xl font-semibold">
                                            Recent Activities
                                        </div>
                                        <div className="text-xl font-normal text-blue-600 cursor-pointer">
                                            See All
                                        </div>
                                    </div>

                                    <hr className="border border-white w-full" />

                                    <div className="flex flex-col gap-4">
                                        {[
                                            {
                                                type: 'Apple Inc. (AAPL)',
                                                action: 'Invested',
                                                shares: '+10 shares',
                                                price: '+$1800',
                                                statusColor: 'green-500',
                                                iconBg: 'bg-blue-700',
                                                icon: '📈',
                                            },
                                            {
                                                type: 'Bitcoin (BTC)',
                                                action: 'Sold',
                                                shares: '-0.5 BTC',
                                                price: '-$15,000',
                                                statusColor: 'red-500',
                                                iconBg: 'bg-orange-600',
                                                icon: '📉',
                                            },
                                            {
                                                type: 'Gold',
                                                action: 'Invested',
                                                shares: '+5 oz',
                                                price: '+$10,500',
                                                statusColor: 'green-500',
                                                iconBg: 'bg-yellow-500',
                                                icon: '🥇',
                                            },
                                            {
                                                type: 'Tesla Inc. (TSLA)',
                                                action: 'Sold',
                                                shares: '-8 shares',
                                                price: '+$2,400',
                                                statusColor: 'green-500',
                                                iconBg: 'bg-purple-700',
                                                icon: '📉',
                                            },
                                        ].map((item, i) => (
                                            <div
                                                key={i}
                                                className="flex justify-between items-center border border-white rounded-xl px-4 py-3"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div
                                                        className={`p-2 rounded-full ${item.iconBg}`}
                                                    >
                                                        {item.icon}
                                                    </div>
                                                    <div>
                                                        <div className="font-medium">
                                                            {item.type}
                                                        </div>
                                                        <div
                                                            className={`text-sm text-${item.statusColor}`}
                                                        >
                                                            {item.action}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-md font-semibold">
                                                        {item.shares}
                                                    </div>
                                                    <div
                                                        className={`text-sm text-${item.statusColor}`}
                                                    >
                                                        {item.price}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recommendations Card */}
                        <div className="w-full border-2 border-white rounded-2xl text-white bg-[#1a1a1a]">
                            <div className="flex flex-col gap-5 px-10 py-8">
                                <div className="flex items-end justify-between px-3">
                                    <div className="text-2xl font-semibold">
                                        Recommendations
                                    </div>
                                    <div className="text-xl font-normal text-blue-600 cursor-pointer">
                                        See All
                                    </div>
                                </div>

                                <hr className="border border-white w-full" />

                                <div className="flex flex-col gap-4">
                                    {[
                                        {
                                            name: 'Bitcoin (BTC)',
                                            suggestion: 'Hold More',
                                            reason: 'Strong uptrend and consistent gains',
                                            statusColor: 'green-400',
                                            icon: '🟢',
                                            iconBg: 'bg-green-700',
                                        },
                                        {
                                            name: 'NVIDIA Corporation (NVDA)',
                                            suggestion: 'Hold More',
                                            reason: 'Rapid growth in price, bullish trend',
                                            statusColor: 'green-400',
                                            icon: '🚀',
                                            iconBg: 'bg-green-700',
                                        },
                                        {
                                            name: 'Apple Inc. (APPL)',
                                            suggestion: 'Hold More',
                                            reason: 'Stable performance and gradual growth',
                                            statusColor: 'green-300',
                                            icon: '🍎',
                                            iconBg: 'bg-green-600',
                                        },
                                        {
                                            name: 'Tesla Inc. (TSLA)',
                                            suggestion: 'Sell',
                                            reason: 'Consistent decline in value',
                                            statusColor: 'red-400',
                                            icon: '⚠',
                                            iconBg: 'bg-red-600',
                                        },
                                        {
                                            name: 'Ethereum (ETH)',
                                            suggestion: 'Sell',
                                            reason: 'Downward trend with no recovery signs',
                                            statusColor: 'red-400',
                                            icon: '📉',
                                            iconBg: 'bg-red-600',
                                        },
                                        {
                                            name: 'Netflix Inc. (NFLX)',
                                            suggestion: 'Sell',
                                            reason: 'Steady decline in recent months',
                                            statusColor: 'red-400',
                                            icon: '📉',
                                            iconBg: 'bg-red-600',
                                        },
                                        {
                                            name: 'Dogecoin (DOGE)',
                                            suggestion: 'Sell',
                                            reason: 'Poor performance and declining value',
                                            statusColor: 'red-400',
                                            icon: '🐶',
                                            iconBg: 'bg-red-600',
                                        },
                                        {
                                            name: 'Google (GOOGL)',
                                            suggestion: 'Buy for Profit Boost',
                                            reason: 'Moderate growth and low risk',
                                            statusColor: 'yellow-300',
                                            icon: '📈',
                                            iconBg: 'bg-yellow-600',
                                        },
                                        {
                                            name: 'Gold',
                                            suggestion: 'Buy for Profit Boost',
                                            reason: 'Stable investment, safe haven asset',
                                            statusColor: 'yellow-300',
                                            icon: '🥇',
                                            iconBg: 'bg-yellow-600',
                                        },
                                    ].map((item, i) => (
                                        <div
                                            key={i}
                                            className="flex justify-between items-center border border-white rounded-xl px-4 py-3"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div
                                                    className={`p-2 rounded-full ${item.iconBg}`}
                                                >
                                                    {item.icon}
                                                </div>
                                                <div>
                                                    <div className="font-medium">
                                                        {item.name}
                                                    </div>
                                                    <div
                                                        className={`text-sm text-${item.statusColor}`}
                                                    >
                                                        {item.suggestion}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right max-w-[50%]">
                                                <div className="text-sm text-gray-300 italic">
                                                    {item.reason}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Portfolio;
