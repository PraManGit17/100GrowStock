import React, { useEffect } from 'react';
<<<<<<< HEAD:frontend/src/components/Navbar/Header.jsx
import { NavLink,Link, useLocation } from 'react-router-dom';
=======
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
>>>>>>> 69922dd9c8a3e09ebde9b0c6b8951db95f5f1867:frontend/src/components/Navbar/Navbar.jsx
import {
    ClockCounterClockwise,
    List,
    MagnifyingGlass,
    User,
} from '@phosphor-icons/react';
import { useState } from 'react';
<<<<<<< HEAD:frontend/src/components/Navbar/Header.jsx
import Signup from '../../pages/Signup/Signup';
const Header = () => {
=======

const Navbar = () => {
    const navigate = useNavigate();
>>>>>>> 69922dd9c8a3e09ebde9b0c6b8951db95f5f1867:frontend/src/components/Navbar/Navbar.jsx
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    let Links = [
        { name: 'HOME', link: '/' },
        {
            name: 'PORTFOLIO',
            link: '',
        },
        {
            name: 'WATCHLIST',
            link: '/watchlist',
        },
        {
            name: 'DISCOVER',
            link: '',
        },

    ];

    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const handleSearch = () => {
        navigate('/search');
    };

    return (
        <div className="md:mx-auto md:w-auto w-full md:px-8 mb-4 z-50">
            <div className="flex justify-between items-center p-3 rounded-2xl mt-4 cursor-pointer border-2 border-white bg-gray-200 shadow-inner">
                <div className="text-lg font-bold">GrowStock</div>
                <div id="navLinks" className="w-fit">
                    <ul
                        id="linkList"
                        className={`flex gap-6 md:items-center md:justify-evenly md:pb-0 absolute md:static  md:z-auto z-40 left-0  md:w-auto md:pl-0  transition-all duration-500 ease-in ${
                            isOpen
                                ? 'top-20 p-2 w-[92%] flex-col border-2 border-white shadow-inner rounded-xl z-[999] ml-4 backdrop-blur-3xl bg-gray-300'
                                : 'top-[-490px] flex items-center'
                        }`}
                    >
                        {Links.map((link) => (
                            <li
                                key={link.name}
                                className="text-gray-600 font-bold"
                            >
                                <NavLink
                                    to={link.link}
                                    style={({ isActive }) => ({
                                        textDecoration: isActive
                                            ? 'underline'
                                            : 'none',
                                    })}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="search-profile" className="flex flex-row gap-2">
                    <div
                        id="search"
                        className="flex flex-row gap-3 border-r-gray-700 border-r-2 px-2"
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
                    <NavLink to="/signup" id="profile" className="px-2"  >
                        <User size={24} />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
