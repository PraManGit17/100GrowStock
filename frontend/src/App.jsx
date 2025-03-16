import React from 'react';
import Landing from './pages/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
<<<<<<< HEAD
import Orb from "./components/Orb/Orb.jsx"
import Dashboard from './pages/Dashboard';
=======
import Orb from './components/Orb/Orb';

>>>>>>> 69922dd9c8a3e09ebde9b0c6b8951db95f5f1867
function App() {
    return (
        <>
            {/* <div className="px-4 backdrop-filter backdrop-blur-lg bg-opacity-30 border-4 shadow-inner border-gray-200 w-[95vw] md:mx-auto ml-2 rounded-xl overflow-x-hidden h-screen md:w-auto"> */}
            <div className="md:px-0 px-4 bg-transparent">
                <Orb />
                <Navbar />
                <Outlet />
               {/* <Dashboard/> */}
            </div>
            {/* </div> */}
        </>
    );
}

export default App;
