import React from 'react';
import Landing from './pages/Landing/Landing';
import Header from './components/Navbar/Header';
import { Outlet } from 'react-router-dom';
//  Orb from '../../../Frontend/Projects/MoneyMinder/frontend/src/Components/Orb/Orb';

function App() {
    return (
        <>
            <div className="px-4 backdrop-filter backdrop-blur-lg bg-opacity-30 border-4 shadow-inner border-gray-200 w-[96vw] md:mx-auto ml-2 rounded-xl">
                <Header />
                <Orb />
                <Outlet />
            </div>
        </>
    );
}

export default App;
