import React, { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { Bookmark, DotsThree } from '@phosphor-icons/react';

const IntuitiveCard = ({
    stockData = [],
    ticker = 'ISRG',
    companyName = 'INTUITIVE SURGICAL',
    companyShortName = 'INTUITIVE',
    currentValue = 512.78,
    percentageChange = 84.9,
    timeframe = 'PAST YEAR',
}) => {
    const [chartData, setChartData] = useState([]);
    const [isPositive, setIsPositive] = useState(true);

    useEffect(() => {
        if (stockData && stockData.length > 0) {
            setChartData(stockData);
            setIsPositive(percentageChange >= 0);
        } else {
            setChartData([
                { value: 10 },
                { value: 15 },
                { value: 13 },
                { value: 17 },
                { value: 16 },
                { value: 14 },
                { value: 18 },
                { value: 20 },
                { value: 19 },
                { value: 22 },
                { value: 25 },
                { value: 28 },
                { value: 32 },
                { value: 38 },
                { value: 45 },
            ]);
            setIsPositive(true);
        }
    }, []);

    const chartColor = isPositive ? '#4ade80' : '#ef4444';
    const gradientColor = isPositive ? 'from-green-100' : 'from-red-100';
    const changeColor = isPositive ? 'text-green-500' : 'text-red-500';
    const arrowIcon = isPositive ? '↗' : '↘';

    return (
        <div
            className="md:w-64 w-screen bg-white rounded-xl shadow-inner p-5 relative"
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            <div className="absolute top-4 right-4">
                <Bookmark size={18} fill="black" color="black" />
            </div>

            <div className="absolute top-4 left-4">
                <DotsThree size={20} className="text-gray-400" />
            </div>

            <div className="text-xs text-gray-500 mt-4 mb-1 tracking-wide font-medium">
                {companyShortName}
            </div>

            <div className="text-xs text-gray-400 mb-1 tracking-wide">
                {ticker}
            </div>

            <div className="text-lg font-bold tracking-wide mb-6">
                {companyName}
            </div>

            <div className="h-24 mb-1 -mx-1">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={chartColor}
                            strokeWidth={2.5}
                            dot={false}
                            isAnimationActive={true}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div
                className={`h-16 bg-gradient-to-t ${gradientColor} to-transparent -mt-16 mb-6 rounded-b-lg -mx-1`}
            ></div>

            <div className="flex justify-between items-end mt-2">
                <div>
                    <div className={`flex items-center ${changeColor} mb-1`}>
                        <span className="text-xs mr-1">{arrowIcon}</span>
                        <span className="font-semibold">
                            {Math.abs(percentageChange)}%
                        </span>
                    </div>

                    <div className="text-xl font-bold">
                        ${currentValue.toFixed(2)}
                    </div>
                </div>

                <div className="text-xs text-gray-400 mb-4">{timeframe}</div>
            </div>
        </div>
    );
};

export default IntuitiveCard;
