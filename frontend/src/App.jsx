import React from 'react';
import Landing from './pages/Landing/Landing';
import Header from './components/Navbar/Header';
import { Outlet } from 'react-router-dom';
//  Orb from '../../../Frontend/Projects/MoneyMinder/frontend/src/Components/Orb/Orb';

function App() {
    return (
        <div className="px-4 bg-gray-200">
            {/* <Orb /> */}
            <Header />
            <Outlet />
        </div>
    );
}

export default App;
