import React from 'react';
import './style.css';

function Navigation() {
    return (
        <div className='nav'>
            <div className="context">
                <a href="/context">Навигационное меню</a>
            </div>
            <div className="component">
                <a href="/component">Component </a>
            </div>
            <div className="props">
                <a href="/props"> Props</a>
            </div>
            <div className="state">
                <a href="/state">State</a>
            </div>
            <div className="route">
                <a href="/route">Route</a>
            </div>
        </div>

    )
}

export default Navigation;