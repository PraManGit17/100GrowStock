import React, { useEffect } from 'react';
import IntuitiveCard from '../../components/WatchlistCard/IntuitiveCard';
import useBackend from '../../utils/useBackend';
import { useNavigate } from 'react-router-dom';

function Watchlist() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        // console.log(token);
        if (!token) {
            navigate('/signup');
        }
    }, [navigate]);
    return (
        <>
            <div className="md:px-8 w-full">
                <div id="title" className="mt-4">
                    <h1 className="md:text-8xl text-5xl">Watchlist</h1>
                    <p className="font-light md:text-2xl text-xl text-gray-400 mt-3 w-[90%]">
                        Add stocks you're interested in to your watchlist to
                        keep track of them in one place !
                    </p>
                </div>
                <div
                    id="watchlistCards"
                    className="mt-5 flex flex-row flex-wrap gap-10 py-4"
                >
                    <IntuitiveCard />
                    <IntuitiveCard />
                    <IntuitiveCard />
                    <IntuitiveCard />
                    <IntuitiveCard />
                    <IntuitiveCard />
                    <IntuitiveCard />
                    <IntuitiveCard />
                    <IntuitiveCard />
                </div>
            </div>
        </>
    );
}

export default Watchlist;
