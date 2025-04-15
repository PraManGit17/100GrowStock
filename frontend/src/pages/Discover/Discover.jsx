import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    MagnifyingGlass,
    ArrowUp,
    ArrowDown,
    CaretRight,
    Plus,
    Clock,
    TrendUp,
    Lightning,
    Star,
    ChartLine
} from '@phosphor-icons/react';
import {
    Area,
    AreaChart,
    ResponsiveContainer
} from 'recharts';
import useBackend from '../../utils/useBackend';
import axios from 'axios';
import './Discover.css';

function Discover() {
    const [activeTab, setActiveTab] = useState('trending');
    const [loading, setLoading] = useState(true);
    const [activeSector, setActiveSector] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [addingToWatchlist, setAddingToWatchlist] = useState(false);
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [trendingStocks, setTrendingStocks] = useState([]);
    const [gainers, setGainers] = useState([]);
    const [losers, setLosers] = useState([]);
    const [recommended, setRecommended] = useState([]);
    const [popularETFs, setPopularETFs] = useState([]);
    const navigate = useNavigate();
    const backend = useBackend;
    const token = localStorage.getItem('access_token');

    // Market stats - could be fetched from an API in a real implementation
    const marketStats = [
        { label: 'S&P 500', value: '4,782.36', change: -0.3, isNegative: true },
        { label: 'NASDAQ', value: '14,897.24', change: 1.2, isNegative: false },
        { label: 'DOW', value: '38,124.57', change: 0.7, isNegative: false },
        { label: 'NIFTY 50', value: '22,643.75', change: 0.5, isNegative: false },
    ];

    const sectors = [
        'All', 'Technology', 'Healthcare', 'Finance', 'Energy', 'Consumer', 'Utilities', 'Materials'
    ];

    // Generate random chart data
    const generateChartData = (trend = 'up', volatility = 1) => {
        const data = [];
        let value = trend === 'up' ? 100 : 150;
        
        for (let i = 0; i < 20; i++) {
            const change = (Math.random() - (trend === 'up' ? 0.3 : 0.7)) * volatility * 10;
            value = Math.max(50, value + change);
            data.push({ value });
        }
        
        return data;
    };

    // News items - would be fetched from a news API in a real implementation
    const newsItems = [
        {
            id: 1,
            title: 'Fed signals potential rate cuts ahead as inflation cools',
            source: 'Financial Times',
            time: '2 hours ago',
            category: 'Economy',
            imageUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        },
        {
            id: 2,
            title: 'NVIDIA breaks record with $3 trillion market cap on AI chip demand',
            source: 'Bloomberg',
            time: '4 hours ago',
            category: 'Technology',
            imageUrl: 'https://images.unsplash.com/photo-1601446167729-5cddb0b3d596?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        },
        {
            id: 3,
            title: "India's Sensex crosses 75,000 milestone for the first time",
            source: 'Economic Times',
            time: '8 hours ago',
            category: 'Global Markets',
            imageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
        }
    ];

    const fetchStockData = async (symbol) => {
        try {
            const response = await axios.get(`${backend.backendUrl}stock/${symbol}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'ngrok-skip-browser-warning': '69420',
                }
            });
            return response.data;
        } catch (error) {
            console.error(`Error fetching data for ${symbol}:`, error);
            return null;
        }
    };

    const formatStockData = (stockData, badgeType = null) => {
        if (!stockData) return null;
        
        const isPositive = parseFloat(stockData.percent_change) >= 0;
        return {
            ticker: stockData.symbol,
            name: stockData.name,
            price: `$${parseFloat(stockData.price).toFixed(2)}`,
            change: `${isPositive ? '+' : ''}${stockData.percent_change}%`,
            isPositive: isPositive,
            chartData: stockData.chartData || generateChartData(isPositive ? 'up' : 'down'),
            badge: badgeType
        };
    };

    const fetchStocksByCategory = async () => {
        setLoading(true);
        
        try {
            // Trending stocks
            const trendingSymbols = ['AAPL', 'MSFT', 'AMZN', 'NVDA', 'TSLA', 'META', 'GOOGL', 'NFLX'];
            const trendingPromises = trendingSymbols.map(symbol => fetchStockData(symbol));
            const trendingResults = await Promise.all(trendingPromises);
            const formattedTrending = trendingResults
                .filter(Boolean)
                .map((stock, index) => formatStockData(stock, index < 2 ? 'trending' : null));
            setTrendingStocks(formattedTrending);
            
            // Top gainers
            const gainersSymbols = ['NVDA', 'AMD', 'AAPL', 'NFLX', 'MSFT'];
            const gainersPromises = gainersSymbols.map(symbol => fetchStockData(symbol));
            const gainersResults = await Promise.all(gainersPromises);
            const formattedGainers = gainersResults
                .filter(Boolean)
                .filter(stock => parseFloat(stock.percent_change) > 0)
                .sort((a, b) => parseFloat(b.percent_change) - parseFloat(a.percent_change))
                .map((stock, index) => formatStockData(stock, index < 3 ? 'top-gainer' : null));
            setGainers(formattedGainers);
            
            // Top losers
            const losersSymbols = ['TSLA', 'COIN', 'BYND', 'HOOD', 'PLUG'];
            const losersPromises = losersSymbols.map(symbol => fetchStockData(symbol));
            const losersResults = await Promise.all(losersPromises);
            const formattedLosers = losersResults
                .filter(Boolean)
                .filter(stock => parseFloat(stock.percent_change) < 0)
                .sort((a, b) => parseFloat(a.percent_change) - parseFloat(b.percent_change))
                .map((stock, index) => formatStockData(stock, index < 3 ? 'top-loser' : null));
            setLosers(formattedLosers);
            
            // Recommended
            const recommendedSymbols = ['MSFT', 'V', 'MA', 'COST', 'HD'];
            const recommendedPromises = recommendedSymbols.map(symbol => fetchStockData(symbol));
            const recommendedResults = await Promise.all(recommendedPromises);
            const formattedRecommended = recommendedResults
                .filter(Boolean)
                .map(stock => formatStockData(stock, 'recommended'));
            setRecommended(formattedRecommended);
            
            // ETFs
            const etfSymbols = ['VOO', 'QQQ', 'GLD', 'ARKK'];
            const etfPromises = etfSymbols.map(symbol => fetchStockData(symbol));
            const etfResults = await Promise.all(etfPromises);
            const formattedETFs = etfResults
                .filter(Boolean)
                .map(stock => formatStockData(stock));
            setPopularETFs(formattedETFs);
            
        } catch (error) {
            console.error('Error fetching stock data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Check for authentication
        if (!token) {
            navigate('/signup');
            return;
        }
        
        fetchStocksByCategory();
    }, [navigate]);

    const handleStockClick = (ticker) => {
        navigate(`/stock/USD/${ticker}`);
    };

    const addToWatchlist = async (stock) => {
        setAddingToWatchlist(true);
        
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
                navigate('/login');
                return;
            }
            
            const payload = {
                symbol: stock.ticker,
                name: stock.name
            };
            
            const response = await fetch(`${backend.backendUrl}watchlist/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to add to watchlist');
            }
            
            // Show success notification
            setNotification({ 
                show: true, 
                message: `${stock.name} added to watchlist`, 
                type: 'success' 
            });
            
            // Hide notification after 3 seconds
            setTimeout(() => {
                setNotification({ show: false, message: '', type: '' });
            }, 3000);
            
        } catch (error) {
            console.error('Error adding to watchlist:', error);
            
            setNotification({ 
                show: true, 
                message: error.message || 'Failed to add to watchlist', 
                type: 'error' 
            });
            
            setTimeout(() => {
                setNotification({ show: false, message: '', type: '' });
            }, 3000);
        } finally {
            setAddingToWatchlist(false);
        }
    };
    const getStocksByTab = () => {
        switch(activeTab) {
            case 'trending':
                return trendingStocks;
            case 'gainers':
                return gainers;
            case 'losers':
                return losers;
            case 'recommended':
                return recommended;
            default:
                return trendingStocks;
        }
    };

    const filteredStocks = getStocksByTab().filter(stock => {
        const matchesSearch = searchQuery === '' || 
            stock.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
            stock.ticker.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesSector = activeSector === 'All' || true; 
        
        return matchesSearch && matchesSector;
    });

    // Render stock card
    const renderStockCard = (stock) => (
        <div 
            key={stock.ticker} 
            className="stock-card"
            onClick={() => handleStockClick(stock.ticker)}
        >
            {stock.badge && (
                <div className={`stock-badge ${stock.badge}`}>
                    {stock.badge === 'trending' && 'Trending'}
                    {stock.badge === 'top-gainer' && 'Top Gainer'}
                    {stock.badge === 'top-loser' && 'Top Loser'}
                    {stock.badge === 'recommended' && 'Recommended'}
                </div>
            )}
            <div className="ticker">{stock.ticker}</div>
            <div className="name">{stock.name}</div>
            <div className="price">{stock.price}</div>
            <div className={`change ${stock.isPositive ? 'positive' : 'negative'}`}>
                {stock.isPositive ? (
                    <ArrowUp size={16} weight="bold" />
                ) : (
                    <ArrowDown size={16} weight="bold" />
                )}
                {stock.change}
            </div>
            
            <div className="mini-chart">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stock.chartData}>
                        <defs>
                            <linearGradient id={`color${stock.ticker}`} x1="0" y1="0" x2="0" y2="1">
                                <stop 
                                    offset="5%" 
                                    stopColor={stock.isPositive ? "#4ade80" : "#f87171"} 
                                    stopOpacity={0.8}
                                />
                                <stop 
                                    offset="95%" 
                                    stopColor={stock.isPositive ? "#4ade80" : "#f87171"} 
                                    stopOpacity={0}
                                />
                            </linearGradient>
                        </defs>
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke={stock.isPositive ? "#4ade80" : "#f87171"} 
                            fillOpacity={1} 
                            fill={`url(#color${stock.ticker})`} 
                            strokeWidth={2}
                            dot={false}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            <button 
                className="cta-button"
                onClick={(e) => {
                    e.stopPropagation(); // Prevent navigating to stock details
                    addToWatchlist(stock);
                }}
                disabled={addingToWatchlist}
            >
                <Plus size={16} weight="bold" />
                {addingToWatchlist ? 'Adding...' : 'Add to Watchlist'}
            </button>
        </div>
    );

    return (
        <div className="discover-container">
            <h1 className="discover-title">Discover</h1>
            <p className="discover-description">
                Explore trending stocks, top movers, and personalized recommendations
            </p>
            
            {/* Market Overview Section */}
            <div className="market-overview">
                <h2>Market Overview</h2>
                <div className="market-stats">
                    {marketStats.map((stat, index) => (
                        <div key={index} className="market-stat-card">
                            <div className="label">{stat.label}</div>
                            <div className="value">{stat.value}</div>
                            <div className={`change ${stat.isNegative ? 'negative' : 'positive'}`}>
                                <div className="change-icon">
                                    {stat.isNegative ? (
                                        <ArrowDown size={12} weight="bold" />
                                    ) : (
                                        <ArrowUp size={12} weight="bold" />
                                    )}
                                </div>
                                {Math.abs(stat.change)}%
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Category Tabs */}
            <div className="discover-tabs">
                <div 
                    className={`discover-tab ${activeTab === 'trending' ? 'active' : ''}`}
                    onClick={() => setActiveTab('trending')}
                >
                    <TrendUp size={16} weight="bold" />
                    <span className="ml-2">Trending</span>
                </div>
                <div 
                    className={`discover-tab ${activeTab === 'gainers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('gainers')}
                >
                    <ArrowUp size={16} weight="bold" />
                    <span className="ml-2">Top Gainers</span>
                </div>
                <div 
                    className={`discover-tab ${activeTab === 'losers' ? 'active' : ''}`}
                    onClick={() => setActiveTab('losers')}
                >
                    <ArrowDown size={16} weight="bold" />
                    <span className="ml-2">Top Losers</span>
                </div>
                <div 
                    className={`discover-tab ${activeTab === 'recommended' ? 'active' : ''}`}
                    onClick={() => setActiveTab('recommended')}
                >
                    <Star size={16} weight="bold" />
                    <span className="ml-2">For You</span>
                </div>
            </div>
            
            {/* Search */}
            <div className="search-bar">
                <MagnifyingGlass size={20} weight="bold" />
                <input 
                    type="text" 
                    placeholder="Search stocks by name or symbol..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            
            {/* Sector Filter */}
            <div className="sector-filter">
                <h3>Filter by Sector</h3>
                <div className="sector-buttons">
                    {sectors.map((sector) => (
                        <div 
                            key={sector}
                            className={`sector-button ${activeSector === sector ? 'active' : ''}`}
                            onClick={() => setActiveSector(sector)}
                        >
                            {sector}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Stocks Grid */}
            {loading ? (
                <div className="loading-spinner"></div>
            ) : (
                <>
                    {filteredStocks.length > 0 ? (
                        <div className="stock-grid">
                            {filteredStocks.map(stock => renderStockCard(stock))}
                        </div>
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-gray-400">No stocks found matching your criteria.</p>
                        </div>
                    )}
                </>
            )}
            
            {/* News Section */}
            <div className="news-section">
                <h2>Latest Market News</h2>
                {newsItems.map(news => (
                    <div key={news.id} className="news-card">
                        <div 
                            className="news-image" 
                            style={{ backgroundImage: `url(${news.imageUrl})` }}
                        ></div>
                        <div className="news-content">
                            <div className="news-title">{news.title}</div>
                            <div className="news-meta">
                                <div className="flex items-center">
                                    <span>{news.source}</span>
                                    <span className="mx-2">•</span>
                                    <div className="flex items-center">
                                        <Clock size={12} className="mr-1" />
                                        <span>{news.time}</span>
                                    </div>
                                </div>
                                <div className="news-category">{news.category}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* IPO Section */}
            <div className="category-slider">
                <h2>
                    Upcoming IPOs
                    <span className="view-all">
                        View All
                        <CaretRight size={14} weight="bold" />
                    </span>
                </h2>
                <div className="category-cards">
                    {[
                        { name: "Instacart", ticker: "ICART", date: "Sep 19, 2023", price: "$30.00" },
                        { name: "Reddit", ticker: "RDDT", date: "Mar 21, 2024", price: "$34.00" },
                        { name: "Databricks", ticker: "DATA", date: "Expected Q2 2025", price: "TBD" },
                        { name: "Stripe", ticker: "STRP", date: "Expected 2025", price: "TBD" }
                    ].map((ipo, index) => (
                        <div key={index} className="stock-card">
                            <div className="ticker">{ipo.ticker}</div>
                            <div className="name">{ipo.name}</div>
                            <div className="flex items-center text-gray-400 mb-3">
                                <Clock size={14} className="mr-1" />
                                <span>{ipo.date}</span>
                            </div>
                            <div className="price">{ipo.price}</div>
                            <button className="cta-button mt-3">
                                <Lightning size={16} weight="bold" />
                                Get Notified
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            
            {/* ETF Section */}
            <div className="category-slider">
                <h2>
                    Popular ETFs
                    <span className="view-all">
                        View All
                        <CaretRight size={14} weight="bold" />
                    </span>
                </h2>
                <div className="category-cards">
                    {popularETFs.length > 0 ? (
                        popularETFs.map((etf, index) => (
                            <div key={index} className="stock-card" onClick={() => handleStockClick(etf.ticker)}>
                                <div className="ticker">{etf.ticker}</div>
                                <div className="name">{etf.name}</div>
                                <div className="price">{etf.price}</div>
                                <div className={`change ${etf.isPositive ? 'positive' : 'negative'}`}>
                                    {etf.isPositive ? (
                                        <ArrowUp size={16} weight="bold" />
                                    ) : (
                                        <ArrowDown size={16} weight="bold" />
                                    )}
                                    {etf.change}
                                </div>
                                <button 
                                    className="cta-button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToWatchlist(etf);
                                    }}
                                    disabled={addingToWatchlist}
                                >
                                    <Plus size={16} weight="bold" />
                                    {addingToWatchlist ? 'Adding...' : 'Add to Watchlist'}
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center">
                            <p className="text-gray-400">Loading ETFs...</p>
                        </div>
                    )}
                </div>
            </div>
            
            {/* Call to Action */}
            <div className="watchlist-cta">
                <h2>Create Your Personalized Watchlist</h2>
                <p>
                    Keep track of all your favorite stocks in one place. Get real-time updates and price alerts for your watchlist stocks.
                </p>
                <button 
                    className="cta-button"
                    onClick={() => navigate('/watchlist')}
                >
                    <Plus size={18} weight="bold" />
                    Create Watchlist
                </button>
            </div>
            
            {/* Notification */}
            {notification.show && (
                <div className={`notification ${notification.type}`}>
                    <p>{notification.message}</p>
                </div>
            )}
        </div>
    );
}

export default Discover;
