import React from 'react';
import styles from './Header.module.scss'
import { NavLink } from "react-router-dom";
import classNames from "classnames";

const Header = () => {
    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <NavLink to={'/'}>
                    Rick & Morty <span>Wiki</span>
                </NavLink>
            </div>
            <div className={styles.navigation}>
                <NavLink
                    to={'/'}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}
                    end
                >Characters</NavLink>
                <NavLink
                    to={'/episodes'}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}>Episode</NavLink>
                <NavLink
                    to={'/location'}
                    className={({ isActive }) => classNames({ [styles.active]: isActive })}>Location</NavLink>
            </div>
        </div>
    );
};

export default Header;
