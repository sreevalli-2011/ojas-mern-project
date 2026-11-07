import React from "react";
import "./Navbar.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import menu from "../../../utility/data";
import { isLoggedIn, getStoredUser, clearSession } from "../../../utility/api";

const Navbar = () => {
    const navigate = useNavigate();
    const loggedIn = isLoggedIn();
    const { role, fullName } = getStoredUser();

    const handleLogout = () => {
        clearSession();
        navigate("/login");
    };

    return (
        <div className="navbar">

            <Link to="/" className="logo">
                <p>OJAS</p>
            </Link>

            <ul className="navbar_menu">
                {menu.map((item) => (
                    <li key={item.name}>
                        <NavLink className="link" to={item.path}>
                            {item.name}
                        </NavLink>
                    </li>
                ))}
            </ul>

            <div className="Login">

                {loggedIn ? (
                    <>
                        <Link to={role === "nutritionist" ? "/dashboard" : "/dashboardp"}>
                            <button className="login">
                                Hi, {fullName ? fullName.split(" ")[0] : "there"}
                            </button>
                        </Link>

                        <button className="getstarted" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <button className="login">
                                Login
                            </button>
                        </Link>

                        <Link to="/signup">
                            <button className="getstarted">
                                Get Started
                            </button>
                        </Link>
                    </>
                )}

            </div>
            
        </div>
    );
};

export default Navbar;
