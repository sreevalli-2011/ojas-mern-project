import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <div className="loginpage">

            <h1>LOGIN AS</h1>

            <div className="login-box">
                <h2>Nutritionist</h2>

                <Link to="/loginNextpg">
                    <button>Login</button>
                </Link>
            </div>

            <div className="login-box">
                <h2>Patient</h2>

                <Link to="/loginNextpg">
                    <button>Login</button>
                </Link>
            </div>

        </div>
    );
};

export default Login;