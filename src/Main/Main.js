import React from 'react';
import Header from '../Default/Navbar';
import { Outlet } from 'react-router-dom';
import Footer2 from '../Default/Footer2';

const Main = () => {
    return (
        <div>
            <Header/>
            <Outlet/>
            <Footer2/>
        </div>
    );
};

export default Main;