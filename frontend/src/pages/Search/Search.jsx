import { MagnifyingGlass } from '@phosphor-icons/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import stockData from './stocks.json';
import axios from 'axios';
import { ArrowFatLineDown } from '@phosphor-icons/react/dist/ssr';
function Search() {
    const [searchInput, setSearchInput] = useState('');
    const [keyword, setKeyword] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();
    let data;

    // const token = import.meta.env.VITE_TEST_TOKEN;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const token = localStorage.getItem('access_token');
    // console.log(token);

    const handleSearch = async () => {
        const data = await fetchData(searchInput);
        setFilteredData(data);
        console.log(filteredData);
    };

    const fetchData = async (query) => {
        try {
            setTimeout(() => {}, 1000);
            const response = await axios.get(
                `${backendUrl}search/?keyword=${query}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'ngrok-skip-browser-warning': '69420',
                    },
                }
            );
            // console.log('Fetched Data:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return [];
        }
    };

    useEffect(() => {
        // const getData = async () => {
        //     setKeyword(searchInput);
        //     // const data = await fetchData(searchInput);
        //     // setFilteredData(data);
        //     // console.log('Filtered Data:', data);
        // };
        setKeyword(searchInput);

        // if (searchInput.trim() !== '') {
        //     // getData();
        // }
        // console.log(searchInput);
    }, [searchInput]);

    const handleStockClick = (stock) => {
        navigate(`/stock/${stock.currency}/${stock.symbol}`);
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
                    <MagnifyingGlass
                        size={24}
                        className="text-black cursor-pointer hover:scale-110"
                        onClick={handleSearch}
                    />
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
                            <div className="flex flex-row flex-wrap gap-5 w-full py-2 bg-transparent">
                                {filteredData.map((stock) => (
                                    <div
                                        key={stock.symbol}
                                        className="p-4 rounded-lg flex items-center md:w-[22%] w-full transition-all duration-200 cursor-pointer hover:border-black hover:bg-white hover:text-black border-gray-200 ease-in-out 
                                               backdrop-filter backdrop-blur-lg bg-black shadow-lg border "
                                        onClick={() => handleStockClick(stock)}
                                    >
                                        {/* <img
                                            src={stock.logo_url}
                                            alt={stock.name}
                                            className="w-12 h-12 mr-4 rounded-full"
                                        /> */}
                                        <div>
                                            <h2 className="text-lg font-semibold">
                                                {stock.name} ({stock.symbol})
                                            </h2>
                                            <p className="text-gray-600">
                                                {stock.exchange} - {stock.index}
                                            </p>
                                            <p className="text-gray-700 font-bold">
                                                {stock.currency}
                                                {stock.current_price}
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
