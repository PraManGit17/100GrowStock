import React, { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    ClockCounterClockwise,
    List,
    MagnifyingGlass,
    User,
} from '@phosphor-icons/react';
import { useState } from 'react';
const Header = () => {
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
            link: '',
        },
        {
            name: 'DISCOVER',
            link: '',
        },
    ];

    useEffect(() => {
        setIsOpen(false);
    }, [location]);
    return (
        <div className="mx-auto md:w-auto w-[90%] md:px-8">
            <div className="flex justify-between items-center p-3 rounded-2xl mt-4 cursor-pointer border-2 border-white">
                <div className="text-lg font-bold">GrowStock</div>
                <div id="navLinks" className="w-3/5">
                    <ul
                        id="linkList"
                        className={`flex gap-3 md:items-center md:justify-evenly md:pb-0 pb-12 absolute md:static  md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0  transition-all duration-500 ease-in ${
                            isOpen
                                ? 'top-20 w-3/5 pl-10 flex-col border-2 border-white  rounded-xl'
                                : 'top-[-490px] flex items-center'
                        }`}
                    >
                        {Links.map((link) => (
                            <li
                                key={link.name}
                                className="text-gray-600 font-bold"
                            >
                                <NavLink to={link.link}>{link.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                </div>
                <div id="search-profile" className="flex flex-row gap-2">
                    <div
                        id="search"
                        className="flex flex-row gap-3 border-r-gray-200 border-r-2 px-2"
                    >
                        <List
                            size={24}
                            className="md:hidden"
                            onClick={() => {
                                setIsOpen(!isOpen);
                            }}
                        />
                        <MagnifyingGlass size={24} />
                        <ClockCounterClockwise size={24} />
                    </div>
                    <div id="profile" className="px-2">
                        <User size={24} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
