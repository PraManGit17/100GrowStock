import React, { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    ChartLine,
    ClockCounterClockwise,
    List,
    MagnifyingGlass,
    User,
    Calculator, 
} from '@phosphor-icons/react';
import { useState } from 'react';
import './Navbar.css';
import useBackend from '../../utils/useBackend';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [localToken, setLocalToken] = useState();
    
    let Links = [
        { name: 'HOME', link: '/' },
        { name: 'PORTFOLIO', link: '/portfolio' },
        { name: 'WATCHLIST', link: '/watchlist' },
        { name: 'DISCOVER', link: '/discover' },
        { name: 'TAX PLANNING', link: '/tax-planning' }, 
    ];

    useEffect(() => {
        setIsOpen(false);
        const token = localStorage.getItem('access_token');
        setLocalToken(token);
    }, [navigate, localToken]);

    const handleSearch = () => {
        navigate('/search');
    };

    return (
        // Rest of the component stays the same
        <div className="md:mx-auto md:w-auto w-full md:px-8 z-50 pt-3 navbar">
            <div className="flex justify-between items-center text-white p-1 rounded-2xl cursor-pointer shadow-inner">
                <div className="text-xl font-bold">GrowStock</div>
                <div id="navLinks" className="w-fit">
                    <ul
                        id="linkList"
                        className={`flex gap-6 md:items-center md:justify-evenly md:pb-0 absolute md:static md:z-auto z-40 left-0 md:w-auto md:pl-0 transition-all duration-500 ease-in ${
                            isOpen
                                ? 'top-12 p-2 w-[92%] flex-col shadow-inner rounded-xl z-[999] ml-4 backdrop-blur-3xl border-4 border-white'
                                : 'top-[-490px] flex items-center'
                        }`}
                    >
                        {Links.map((link) => (
                            <li
                                key={link.name}
                                className="text-gray-200 font-bold relative nav-item"
                            >
                                <NavLink
                                    to={link.link}
                                    style={({ isActive }) => ({
                                        textDecoration: isActive
                                            ? 'underline'
                                            : 'none',
                                    })}
                                    className="nav-link"
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Rest of component remains unchanged */}
                <div id="search-profile" className="flex flex-row gap-2">
                    <div
                        id="search"
                        className="flex flex-row gap-3 border-r-white border-r-2 px-4"
                    >
                        <List
                            size={24}
                            className="md:hidden"
                            onClick={() => {
                                setIsOpen(!isOpen);
                            }}
                        />
                        <MagnifyingGlass
                            size={24}
                            onClick={() => {
                                handleSearch();
                            }}
                        />
                        <ClockCounterClockwise
                            size={24}
                            className="md:block hidden"
                        />
                    </div>
                    <NavLink
                        to={localToken ? '/dashboard' : '/signup'}
                        id="profile"
                        className="px-2"
                    >
                        {localToken ? (
                            <ChartLine size={24} />
                        ) : (
                            <User size={24} />
                        )}
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
