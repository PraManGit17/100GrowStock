import React from 'react';
import Landing from './pages/Landing/Landing';
import Header from './components/Navbar/Header';
import { Outlet } from 'react-router-dom';
import Orb from "./components/Orb/Orb.jsx"
import Dashboard from './pages/Dashboard';
function App() {
    return (
        <>
            <div className="px-4 backdrop-filter backdrop-blur-lg bg-opacity-30 border-4 shadow-inner border-gray-200 w-[96vw] md:mx-auto ml-2 rounded-xl">
            
                <Header />
                <Orb />
                <Outlet />
               {/* <Dashboard/> */}
            </div>
        </>
    );
}

export default App;
