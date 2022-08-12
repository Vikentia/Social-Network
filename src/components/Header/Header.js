import React from 'react';
import s from './Header.module.scss';
import { NavLink } from 'react-router-dom';

function Header(props) {
    return <div className={s.header}>
        Шапка сайта
        <div className={s.loginBlock}>
            {props.isAuth
                ? <div>{props.login} - <button onClick={props.logout}>LogOut</button></div>
                : <NavLink to='/login'>Login</NavLink>
            }

        </div>
    </div>
}

export default Header;
