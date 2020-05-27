import React from "react";
import { Link } from "react-router-dom";
import "../css/Navbar.css";


const Navbar = () => {
    return (
        <div className="nav-back flex">
            <Link className="main-navbar" to="/">
                Home
			</Link>
            <Link className="main-navbar" to="/students">
                Students List
			</Link>
            <Link className="main-navbar" to="/score">
                House Score
			</Link>
        </div>
    );
};

export default Navbar;
