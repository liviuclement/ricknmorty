import React from 'react';
import styles from './Header.module.scss'
import { Link, RouteObject, useLocation } from "react-router-dom";

const Header = () => {
    const location = useLocation();

    const isRoute = (route: string) => {
        return location.pathname === route;
    }

    return (
        <div className={styles.header}>
            <div className={styles.logo}>
                <Link to={'/'}>
                    Rick & Morty <span>Wiki</span>
                </Link>
            </div>
            <div className={styles.navigation}>
                <Link to={'/'} className={isRoute('/') ? styles.active : ''}>Characters</Link>
                <Link to={'/episodes'} className={isRoute('/episodes') ? styles.active : ''}>Episode</Link>
                <Link to={'/location'} className={isRoute('/location') ? styles.active : ''}>Location</Link>
            </div>
        </div>
    );
};

export default Header;
