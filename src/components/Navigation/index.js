import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.css';

function Navigation() {
    return (
        <div className='nav'>
            <div> Навигационное меню </div>

            <div className="profile">
                <NavLink to="/profile">Profile</NavLink>
            </div>
            <div className="messages">
                <NavLink to="/dialogs">Messages</NavLink>
            </div>

        </div>

    )
}

export default Navigation;