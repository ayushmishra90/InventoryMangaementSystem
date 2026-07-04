import { FaBars } from "react-icons/fa";

import "./Navbar.css";

function Navbar({

    collapsed,

    setCollapsed

}) {

    return (

        <header className="navbar">

            <div className="navbar-left">

                <h1>

                Inventory Manager

                </h1>

            </div>

        </header>

    );

}

export default Navbar;