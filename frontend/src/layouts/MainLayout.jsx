import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import "./MainLayout.css";
import { useState, useEffect } from "react";

function MainLayout() {

    const [collapsed, setCollapsed] = useState(false);
    useEffect(() => {

    const handleResize = () => {

        setCollapsed(window.innerWidth <= 1100);

    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () =>

        window.removeEventListener(

            "resize",

            handleResize

        );

}, []);

    return (

        <div className="layout">

            <Sidebar

                collapsed={collapsed}

            />

            <div className="main-content">

                <Navbar

                    collapsed={collapsed}

                    setCollapsed={setCollapsed}

                />

                <main className="page-content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default MainLayout;