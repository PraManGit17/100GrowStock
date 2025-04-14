import { Log } from '@phosphor-icons/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Portfolio() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        // console.log(token);
        if (!token) {
            navigate('/signup');
        }
    }, [navigate]);
    return <div>Portfolio</div>;
}

export default Portfolio;
Portfolio;
