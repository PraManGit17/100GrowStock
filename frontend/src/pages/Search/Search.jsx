import { MagnifyingGlass } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stockData from './stocks.json';

function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [filteredData, setFilteredData] = useState(stockData);
    const navigate = useNavigate();

    useEffect(() => {
        const results = stockData.filter(
            (stock) =>
                stock.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                stock.ticker.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFilteredData(results);
    }, [searchInput]);

    const handleStockClick = (stock) => {
        navigate(`/stock/${stock.ticker}`);
    };

    return (
        <>
            <div className="md:px-8 w-full">
                <div id="title" className="mt-4">
                    <h1 className="md:text-8xl text-5xl">Search</h1>
                    <p className="font-light md:text-2xl text-xl text-gray-400 mt-3 w-[90%]">
                        Search through over 5000 companies
                    </p>
                </div>
                <div
                    id="search-box"
                    className="flex flex-row bg-gray-200 rounded-lg p-2 gap-2 mt-4"
                >
                    <MagnifyingGlass size={24} className="text-gray-500" />
                    <input
                        type="text"
                        id="searchInput"
                        placeholder="Search for stocks.."
                        className="focus:outline-none font-[Inter] text-gray-700 font-medium w-full"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </div>
                <div id="search-results" className="mt-4 flex flex-col">
                    <h4 id="title" className="text-lg font-light mb-5">
                        SEARCH RESULTS
                    </h4>
                    <div>
                        {filteredData.length > 0 ? (
                            <div className="flex flex-row flex-wrap gap-5 w-full py-2">
                                {filteredData.map((stock) => (
                                    <div
                                        key={stock.ticker}
                                        className="p-4 rounded-lg flex items-center md:w-[22%] w-full transition duration-300 cursor-pointer hover:border-black border-gray-200 ease-in-out 
                                               backdrop-filter backdrop-blur-lg bg-white/50 shadow-lg border"
                                        onClick={() => handleStockClick(stock)}
                                    >
                                        <img
                                            src={stock.logo_url}
                                            alt={stock.name}
                                            className="w-12 h-12 mr-4 rounded-full"
                                        />
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {stock.name} ({stock.ticker})
                                            </h2>
                                            <p className="text-gray-600">
                                                {stock.exchange} - {stock.index}
                                            </p>
                                            <p className="text-gray-700 font-bold">
                                                ${stock.current_price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-lg">
                                No results found.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Search;
