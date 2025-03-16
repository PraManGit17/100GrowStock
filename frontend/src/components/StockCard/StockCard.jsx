import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Bookmark,
    ShareNetwork,
    DotsThreeOutline,
    Lightbulb,
    ArrowLeft,
} from '@phosphor-icons/react';

const StockCard = ({ initialData = null, fetchData = null }) => {
    const { stockId } = useParams();
    const navigate = useNavigate();

    // State for stock data
    const [stockData, setStockData] = useState({
        ticker: initialData?.ticker || stockId || 'WIX',
        exchange: initialData?.exchange || 'NASDAQ',
        companyName: initialData?.name || initialData?.companyName || 'Wix',
        description:
            initialData?.description ||
            'A cloud-based web development platform that lets users create and manage websites without coding expertise.',
        currentValue:
            initialData?.current_price || initialData?.currentValue || 163.43,
        changeValue: initialData?.changeValue || 80.27,
        changePercent: initialData?.changePercent || 96.52,
        timeframe: initialData?.timeframe || 'Past Year',
        chartData: initialData?.chartData || generateSampleData(),
        insights: initialData?.insights || [
            {
                title: 'Wix Launches New E-commerce Platform',
                icon: 'lightbulb',
            },
            {
                title: 'Wix Expands Services with DeviantArt Acquisition',
                icon: 'lightbulb',
            },
        ],
        benchmarks: initialData?.benchmarks || {
            growth: 36,
            profit: 47,
            value: 60,
            health: 25,
        },
    });

    const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');

    // Generate sample chart data
    function generateSampleData() {
        const months = [
            'Oct',
            'Nov',
            'Dec',
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
        ];
        const data = [];
        let value = 80;

        for (let i = 0; i < months.length; i++) {
            if (i < 5) {
                value = value + Math.random() * 10 - 2;
            } else if (i === 5) {
                value = value + 30; // Big jump
            } else {
                value = value + Math.random() * 15 - 7;
            }

            data.push({
                month: months[i],
                value: Math.max(50, Math.min(200, value)),
            });
        }

        return data;
    }

    // Load data on mount
    useEffect(() => {
        if (fetchData && stockId) {
            fetchData(stockId).then((data) => {
                if (data)
                    setStockData((prevState) => ({
                        ...prevState,
                        ticker: data.ticker || stockId,
                        exchange: data.exchange || prevState.exchange,
                        companyName:
                            data.name ||
                            data.companyName ||
                            prevState.companyName,
                        description: data.description || prevState.description,
                        currentValue:
                            data.current_price ||
                            data.currentValue ||
                            prevState.currentValue,
                    }));
            });
        }
    }, [stockId, fetchData]);

    // Go back to search
    const handleBack = () => {
        navigate('/search');
    };

    // Determine if change is positive or negative
    const isPositive = stockData.changePercent > 0;
    const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

    return (
        <div className="md:px-8 md:w-[96vw] w-[90vw] mx-auto h-auto bg-gradient-to-br from-purple-50 to-green-50 rounded-2xl shadow-inner border-2 border-gray-300 p-2">
            {/* Back button */}
            <button
                onClick={handleBack}
                className="mt-4 flex items-center text-gray-600 hover:text-gray-900 cursor-pointer transition duration-100"
            >
                <ArrowLeft size={18} className="mr-1" />
                Back to Search
            </button>

            {/* Main content */}
            <div className="flex md:flex-row flex-col -mx-4 py-4">
                {/* Left sidebar */}
                <div className="md:w-3/8 px-4 md:border-r-2 md:border-r-gray-300 rounded-md flex flex-col justify-between">
                    <div id="name-ticker" className="">
                        <div className="text-3xl font-bold mb-4 font-[Orbitron]">
                            {stockData.ticker}
                        </div>
                        <div className="text-5xl font-bold mb-6">
                            {stockData.ticker}
                        </div>
                        <div className="text-gray-500 mb-12">
                            {stockData.description}
                        </div>
                    </div>
                    <div id="scores">
                        <div className="text-sm text-gray-600 mb-2">
                            MARKET BENCHMARK SCORES
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                            {stockData.ticker} vs overall market
                        </div>

                        <div className="flex mb-8">
                            <div className="mr-12 text-center">
                                <div className="text-3xl font-bold mb-1">
                                    {stockData.benchmarks.growth}
                                </div>
                                <div className="text-xs text-gray-500">
                                    GROWTH
                                </div>
                            </div>
                            <div className="mr-12 text-center">
                                <div className="text-3xl font-bold mb-1">
                                    {stockData.benchmarks.profit}
                                </div>
                                <div className="text-xs text-gray-500">
                                    PROFIT
                                </div>
                            </div>
                            <div className="mr-12 text-center">
                                <div className="text-3xl font-bold mb-1">
                                    {stockData.benchmarks.value}
                                </div>
                                <div className="text-xs text-gray-500">
                                    VALUE
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold mb-1">
                                    {stockData.benchmarks.health}
                                </div>
                                <div className="text-xs text-gray-500">
                                    HEALTH
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right content */}
                <div className="md:w-4/8 w-full px-4">
                    <div className="mb-4">
                        <div className="text-gray-500 mb-1">
                            {stockData.exchange}: {stockData.ticker}
                        </div>
                        <div className="text-6xl font-bold mb-1">
                            ${stockData.currentValue}
                        </div>
                        <div
                            className={`flex items-center ${changeColor} mb-6`}
                        >
                            <span className="text-xl font-medium">
                                ${stockData.changeValue} (
                                {stockData.changePercent}%)
                            </span>
                            <span className="ml-2 text-gray-500">
                                {stockData.timeframe}
                            </span>
                        </div>

                        <div className="flex items-center mb-4 gap-4 md:w-auto ">
                            <button className="bg-white border border-gray-200 text-gray-800 px-4 py-2 rounded-xl flex items-center cursor-pointer hover:scale-110 transition-all duration-200">
                                <Bookmark size={18} className="mr-2" />
                                ADD TO LIST
                            </button>
                            <button className="bg-gray-900 text-white px-4 py-2 rounded-xl cursor-pointer hover:scale-110 transition duration-200">
                                <ShareNetwork size={18} />
                            </button>
                        </div>

                        <div className="flex space-x-2 mb-6">
                            <button
                                className={`px-4 py-1 rounded-lg text-sm cursor-pointer ${
                                    selectedTimeframe === '1M'
                                        ? 'bg-gray-200'
                                        : 'bg-gray-100'
                                }`}
                                onClick={() => setSelectedTimeframe('1M')}
                            >
                                1M
                            </button>
                            <button
                                className={`px-4 py-1 rounded-lg text-sm cursor-pointer ${
                                    selectedTimeframe === '3M'
                                        ? 'bg-gray-200'
                                        : 'bg-gray-100'
                                }`}
                                onClick={() => setSelectedTimeframe('3M')}
                            >
                                3M
                            </button>
                            <button
                                className={`px-4 py-1 rounded-lg text-sm cursor-pointer ${
                                    selectedTimeframe === '1Y'
                                        ? 'bg-gray-200'
                                        : 'bg-gray-100'
                                }`}
                                onClick={() => setSelectedTimeframe('1Y')}
                            >
                                1Y
                            </button>
                            <button
                                className={`px-4 py-1 rounded-lg text-sm cursor-pointer ${
                                    selectedTimeframe === '3Y'
                                        ? 'bg-gray-200'
                                        : 'bg-gray-100'
                                }`}
                                onClick={() => setSelectedTimeframe('3Y')}
                            >
                                3Y
                            </button>
                            <button
                                className={`px-4 py-1 rounded-lg text-sm cursor-pointer ${
                                    selectedTimeframe === 'YTD'
                                        ? 'bg-gray-200'
                                        : 'bg-gray-100'
                                }`}
                                onClick={() => setSelectedTimeframe('YTD')}
                            >
                                YTD
                            </button>
                        </div>

                        {/* Chart */}
                        <div className="h-64 mb-8 bg-white bg-opacity-40 rounded-xl p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={stockData.chartData}>
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#aaa', fontSize: 12 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#4ade80"
                                        strokeWidth={3}
                                        dot={false}
                                        isAnimationActive={true}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Company insights */}
                        <div className="flex space-x-4 mb-6 md:flex-row flex-col md:min-w-auto w-full gap-4">
                            {stockData.insights.map((insight, index) => (
                                <div
                                    key={index}
                                    className="flex-1 bg-white rounded-xl p-4 shadow-sm w-full"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center text-gray-500 text-sm">
                                            <Lightbulb
                                                size={16}
                                                className="mr-2"
                                            />
                                            COMPANY INSIGHTS
                                        </div>
                                        <DotsThreeOutline
                                            size={16}
                                            className="text-gray-400"
                                        />
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                                            <Lightbulb
                                                size={20}
                                                className="text-yellow-500"
                                            />
                                        </div>
                                        <div className="font-medium">
                                            {insight.title}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockCard;
