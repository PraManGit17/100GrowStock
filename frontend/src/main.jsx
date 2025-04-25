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
// import Dashboard from './pages/dashboard/dashboard.jsx';
import Discover from './pages/Discover/Discover.jsx';
import TaxPlanning from './pages/TaxPlanning.jsx';
import Portfolio from './pages/Portfolio/Portfolio.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<App />}>
                <Route path="" element={<Landing />} />
                <Route path="/watchlist" element={<Watchlist />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/search" element={<Search />} />
                {/* <Route path="/dashboard" element={<Portfolio />} /> */}
                <Route
                    path="/stock/:currency/:stockId"
                    element={<StockCard />}
                />
                <Route path="/discover" element={<Discover />} />
                <Route path="/tax-planning" element={<TaxPlanning />} />
            </Route>
            <Route path="/Home" element={<Home />} />
        </Route>
    )
);

createRoot(document.getElementById('root')).render(
    // <StrictMode>
    <RouterProvider router={router} />
    // {/* </StrictMode> */}
);
