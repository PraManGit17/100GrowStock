import React, { useEffect, useState } from 'react';
// import Landing from './pages/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import StockChatbot from './components/StockChatbot/StockChatbot';

// import Orb from "./components/Orb/Orb.jsx"
// import Dashboard from './pages/portfolio';
function App() {
    const navigate = useNavigate();
    const [localToken, setLocalToken] = useState();
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setLocalToken(token);
        // console.log(`Token: ${token}\nLocalToken:${localToken}`);
        // window.location.reload();
    }, [navigate, localToken]);

    return (
        <>
            {/* <div className="px-4 backdrop-filter backdrop-blur-lg bg-opacity-30 border-4 shadow-inner border-gray-200 w-[95vw] md:mx-auto ml-2 rounded-xl overflow-x-hidden h-screen md:w-auto"> */}
            <div className="md:px-0 px-4 bg-black">
                {/* <Orb /> */}
                {localToken && <Navbar />}
                {/* <Navbar /> */}
                <Outlet />
                {/* <Dashboard/>  */}
                <StockChatbot />
            </div>
            {/* </div> */}
        </>
    );
}

export default App;
