import { NavLink } from "react-router-dom";

import {
    FaHome,
    FaBox,
    FaUsers,
    FaShoppingCart,
    FaHistory,
    FaBoxes
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar({

    collapsed

}) {

    return (

        <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

            <div className="sidebar-logo">

                <FaBoxes className="logo-icon" />

                {

                    !collapsed &&

                    <div>

                        <h2>

                            Inventory

                        </h2>

                        <p>

                            Management System

                        </p>

                    </div>

                }

            </div>

            <NavLink to="/">

                <FaHome />

                {

                    !collapsed &&

                    <span>

                        Dashboard

                    </span>

                }

            </NavLink>

            <NavLink to="/products">

                <FaBox />

                {

                    !collapsed &&

                    <span>

                        Products

                    </span>

                }

            </NavLink>

            <NavLink to="/customers">

                <FaUsers />

                {

                    !collapsed &&

                    <span>

                        Customers

                    </span>

                }

            </NavLink>

            <NavLink to="/orders">

                <FaShoppingCart />

                {

                    !collapsed &&

                    <span>

                        Create Orders

                    </span>

                }

            </NavLink>

            <NavLink to="/order-history">

                <FaHistory />

                {

                    !collapsed &&

                    <span>

                        Order History

                    </span>

                }

            </NavLink>

        </div>

    );

}

export default Sidebar;