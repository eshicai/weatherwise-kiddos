import React from 'react';
import './NotFound.scss';
import { useEffect } from 'react';

export const NotFound = () => {
    useEffect(() => {
        document.title = 'BrainFlix Not Found';
    }, []);

    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 - Page Not Found</h1>
            <p className="not-found-info">Sorry, the page you're looking for does not exist.</p>
        </div>
    )
}
