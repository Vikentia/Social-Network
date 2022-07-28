import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

function Navigation() {
    return (
        <div className={s.nav}>
            <div> Навигационное меню </div>

            <div className={s.profile}>
                <NavLink to="/profile">Profile</NavLink>
            </div>
            <div className={s.messages}>
                <NavLink to="/dialogs">Messages</NavLink>
            </div>


        </div>

    )
}

export default Navigation;