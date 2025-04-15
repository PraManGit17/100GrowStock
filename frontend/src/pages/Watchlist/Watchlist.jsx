import React, { useEffect, useState } from 'react';
import IntuitiveCard from '../../components/WatchlistCard/IntuitiveCard';
import useBackend from '../../utils/useBackend';
import { useNavigate } from 'react-router-dom';

function Watchlist() {
    const [watchlistItems, setWatchlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const backend = useBackend;

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            navigate('/signup');
            return;
        }
        
        const fetchWatchlist = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${backend.backendUrl}watchlist/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch watchlist');
                }
                
                const data = await response.json();
                setWatchlistItems(data);
            } catch (err) {
                console.error('Error fetching watchlist:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchWatchlist();
    }, [navigate, backend]);

    const generateRandomChartData = (seed) => {
        const chartData = [];
        let value = 50 + (seed % 30); 
        for (let i = 0; i < 15; i++) {
            const change = Math.sin(i * 0.5 + seed) * 8 + (Math.random() * 6 - 3);
            value += change;
            value = Math.max(10, Math.min(100, value)); 
            chartData.push({ value });
        }
        
        return chartData;
    };

    return (
        <>
            <div className="md:px-8 w-full">
                <div id="title" className="mt-4">
                    <h1 className="md:text-8xl text-5xl">Watchlist</h1>
                    <p className="font-light md:text-2xl text-xl text-gray-400 mt-3 w-[90%]">
                        Add stocks you're interested in to your watchlist to
                        keep track of them in one place!
                    </p>
                </div>
                
                {loading ? (
                    <div className="mt-10 text-center">
                        <div className="loading-spinner"></div>
                        <p className="text-gray-400 mt-4">Loading your watchlist...</p>
                    </div>
                ) : error ? (
                    <div className="mt-10 text-center text-red-500">
                        <p>{error}</p>
                        <button 
                            className="mt-4 px-4 py-2 bg-black border border-gray-200 text-white rounded-lg"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                    </div>
                ) : watchlistItems.length === 0 ? (
                    <div className="mt-10 text-center">
                        <p className="text-gray-400">Your watchlist is empty. Add stocks from the Discover page!</p>
                        <button 
                            className="mt-4 px-4 py-2 bg-black border border-gray-200 text-white rounded-lg"
                            onClick={() => navigate('/discover')}
                        >
                            Go to Discover
                        </button>
                    </div>
                ) : (
                    <div
                        id="watchlistCards"
                        className="mt-5 flex flex-row flex-wrap gap-10 py-4"
                    >
                        {watchlistItems.map((item, index) => (
                            <IntuitiveCard
                                key={item.id || index}
                                stockData={generateRandomChartData(index)}
                                ticker={item.symbol}
                                companyName={item.name}
                                companyShortName={item.symbol.substring(0, 3)}
                                currentValue={120 + (index * 23.5)}
                                percentageChange={index % 2 === 0 ? (5 + index * 2.3) : -(3 + index * 1.7)}
                                timeframe="PAST YEAR"
                                onClick={() => navigate(`/stock/USD/${item.symbol}`)}
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default Watchlist;
