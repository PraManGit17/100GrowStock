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
import axios from 'axios';
import useBackend from '../../utils/useBackend';

const StockCard = ({ fetchData = null }) => {
    const [currentstockData, setCurrentStockData] = useState(null);
    const [addingToWatchlist, setAddingToWatchlist] = useState(false);
    const [notification, setNotification] = useState({
        show: false,
        message: '',
        type: '',
    });
    const { stockId } = useParams();
    const { currency } = useParams();
    const navigate = useNavigate();
    const backend = useBackend;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('access_token');
    // console.log(token);

    const fetchStockData = async (symbol) => {
        try {
            const response = await axios.get(`${backendUrl}stock/${symbol}/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'ngrok-skip-browser-warning': '69420',
                },
            });
            return response.data;
        } catch (error) {
            console.error('Error Fetching Stock Card Data: ', error);
        }
    };

    const generateSampleData = () => {
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
            value += i === 5 ? 30 : Math.random() * 10 - 5;
            data.push({
                month: months[i],
                value: Math.max(50, Math.min(200, value)),
            });
        }

        return data;
    };

    const [selectedTimeframe, setSelectedTimeframe] = useState('1Y');

    useEffect(() => {
        const fetchStock = async () => {
            try {
                const result = await fetchStockData(stockId);
                setCurrentStockData(result);
            } catch (error) {
                console.error(`Error Getting Data: ${error}`);
            }
        };

        if (stockId) {
            fetchStock();
        }
    }, [stockId]);

    const handleBack = () => {
        navigate('/search');
    };

    const addToWatchlist = async () => {
        if (!currentstockData) return;

        setAddingToWatchlist(true);

        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                navigate('/login');
                return;
            }

            const payload = {
                symbol: currentstockData.symbol,
                name: currentstockData.name,
            };

            const response = await fetch(`${backend.backendUrl}watchlist/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || 'Failed to add to watchlist'
                );
            }

            // Show success notification
            setNotification({
                show: true,
                message: `${currentstockData.name} added to watchlist`,
                type: 'success',
            });

            // Hide notification after 3 seconds
            setTimeout(() => {
                setNotification({ show: false, message: '', type: '' });
            }, 3000);
        } catch (error) {
            console.error('Error adding to watchlist:', error);

            // Show error notification
            setNotification({
                show: true,
                message: error.message || 'Failed to add to watchlist',
                type: 'error',
            });

            // Hide notification after 3 seconds
            setTimeout(() => {
                setNotification({ show: false, message: '', type: '' });
            }, 3000);
        } finally {
            setAddingToWatchlist(false);
        }
    };

    const isPositive = currentstockData?.percent_change > 0;
    const changeColor = isPositive ? 'text-green-500' : 'text-red-500';

    if (!currentstockData) {
        return (
            <div className="text-center mt-20 text-gray-400">
                Loading stock data...
            </div>
        );
    }

    return (
        <div className="md:px-8 w-full">
            <button
                onClick={handleBack}
                className="mt-4 flex items-center text-white hover:text-white cursor-pointer transition duration-100 border-0"
            >
                <ArrowLeft size={18} className="mr-1" />
                Back to Search
            </button>

            <div id="title" className="mt-4">
                <h1 className="md:text-8xl text-5xl font-bold">
                    {currentstockData?.symbol}
                </h1>
                <p className="font-light md:text-2xl text-xl text-white mt-3 w-[90%]">
                    {currentstockData?.exchange || 'NASDAQ'}:{' '}
                    {currentstockData?.name}
                </p>
            </div>

            <div className="flex md:flex-row flex-col py-4 gap-6">
                <div className="md:w-1/3 w-full flex flex-col justify-between">
                    <div className="text-gray-700 mb-6">
                        {currentstockData?.description ||
                            'A cloud-based web development platform that lets users create and manage websites without coding expertise.'}
                    </div>

                    <div id="scores" className="w-full">
                        <div className="text-lg font-light mb-5">
                            MARKET BENCHMARK SCORES
                        </div>
                        <div className="text-sm text-gray-100 mb-3">
                            {currentstockData?.symbol} vs overall market
                        </div>

                        <div className="flex flex-wrap gap-5 w-full">
                            {['growth', 'profit', 'value', 'health'].map(
                                (metric) => (
                                    <div
                                        key={metric}
                                        className="p-4 rounded-lg w-[45%] backdrop-filter backdrop-blur-lg bg-transparent shadow-lg border border-gray-200"
                                    >
                                        <div className="text-3xl font-bold mb-1">
                                            {metric === 'health'
                                                ? Math.floor(
                                                      Math.random() * 50
                                                  ) + 51
                                                : Math.floor(
                                                      Math.random() * 100 + 25
                                                  )}
                                        </div>
                                        <div className="text-xs text-white">
                                            {metric.toUpperCase()}
                                        </div>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>

                <div className="md:w-2/3 w-full">
                    <div className="mb-4">
                        <div className="text-6xl font-bold mb-1">
                            {currency}
                            {currentstockData?.price?.toFixed(2)}
                        </div>
                        <div
                            className={`flex items-center ${changeColor} mb-6`}
                        >
                            <span className="text-xl font-medium">
                                {currency}
                                {currentstockData?.change} (
                                {currentstockData?.percent_change}%)
                            </span>
                            <span className="ml-2 text-gray-500">
                                {selectedTimeframe}
                            </span>
                        </div>

                        <div className="flex items-center mb-4 gap-4">
                            <button
                                className="bg-black border border-gray-200 text-white px-4 py-2 rounded-lg flex items-center hover:border-black transition duration-300"
                                onClick={addToWatchlist}
                                disabled={addingToWatchlist}
                            >
                                <Bookmark size={18} className="mr-2" />
                                {addingToWatchlist
                                    ? 'ADDING...'
                                    : 'ADD TO WATCHLIST'}
                            </button>
                            <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center transition duration-300">
                                <ShareNetwork size={18} />
                            </button>
                        </div>

                        <div className="flex space-x-2 mb-6">
                            {['1M', '3M', '1Y', '3Y', 'YTD'].map(
                                (timeframe) => (
                                    <button
                                        key={timeframe}
                                        className={`px-4 py-1 rounded-lg text-sm cursor-pointer transition duration-200 ${
                                            selectedTimeframe === timeframe
                                                ? 'bg-white text-black'
                                                : 'bg-black hover:bg-gray-300'
                                        }`}
                                        onClick={() =>
                                            setSelectedTimeframe(timeframe)
                                        }
                                    >
                                        {timeframe}
                                    </button>
                                )
                            )}
                        </div>

                        <div className="h-64 mb-8 bg-gray-200 rounded-lg p-4 shadow-inner">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={
                                        currentstockData?.chartData ||
                                        generateSampleData()
                                    }
                                >
                                    <XAxis
                                        dataKey="month"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#aaa', fontSize: 12 }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#000"
                                        strokeWidth={2}
                                        dot={false}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>

                        <div>
                            <h4 className="text-lg font-light mb-5">
                                COMPANY INSIGHTS
                            </h4>
                            <div className="flex flex-wrap gap-5 w-full">
                                {(currentstockData?.insights || []).map(
                                    (insight, index) => (
                                        <div
                                            key={index}
                                            className="p-4 rounded-lg flex items-center md:w-[48%] w-full transition duration-300 hover:border-black border-gray-200 backdrop-filter backdrop-blur-lg bg-black shadow-lg border"
                                        >
                                            <div className="bg-gray-200 p-2 rounded-lg mr-3">
                                                <Lightbulb
                                                    size={20}
                                                    className="text-gray-700"
                                                />
                                            </div>
                                            <div className="font-medium">
                                                {insight.title}
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Notification */}
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    <p>{notification.message}</p>
                </div>
            )}
        </div>
    );
};

export default StockCard;
