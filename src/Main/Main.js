import React from 'react';
import Header from '../Default/Navbar';
import { Layout, Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default Main;