import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import {
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider,
} from 'react-router-dom';
import Landing from './pages/Landing/Landing.jsx';
import Watchlist from './pages/Watchlist/Watchlist.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Signup from './pages/Signup/Signup.jsx';
import Login from './pages/login.jsx/Login.jsx';
import Search from './pages/Search/Search.jsx';
import StockCard from './components/StockCard/StockCard.jsx';
import Home from './pages/Home/Home.jsx';


const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<App />}>
                <Route path="" element={<Landing />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
                <Route path="/stock/:stockId" element={<StockCard />} />
            </Route>
            <Route path="/Home" element={<Home />} />
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
