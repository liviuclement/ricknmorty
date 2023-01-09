import React from 'react';
import styles from './App.module.scss';
import {
    Outlet,
} from "react-router-dom";
import Header from "./components/Header/Header";

function App() {
    return (
        <div className={styles.app}>
            <Header/>
            <div className={styles.mainContainer}>
                <Outlet/>
            </div>
        </div>
    );
}

export default App;
