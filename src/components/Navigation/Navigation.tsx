import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

const Navigation:React.FC = () => {
    return (
        <div className={s.nav}>
            <div className={s.title}> Навигационное меню </div>

            <div className={s.nav__item}>
                <NavLink to="/profile">Profile</NavLink>
            </div>
            <div className={s.nav__item}>
                <NavLink to="/dialogs">Messages</NavLink>
            </div>
            <div className={s.nav__item}>
                <NavLink to="/users">Users</NavLink>
            </div>
        </div>
    )
}

export default Navigation;