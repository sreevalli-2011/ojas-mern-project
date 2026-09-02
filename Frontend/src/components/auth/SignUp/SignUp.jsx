import React from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <div className="signup">

            <h1>SIGN UP AS</h1>

            <div className="signup-box">
                <h2>Nutritionist</h2>

                <Link to="/signupn">
                    <button>Sign Up</button>
                </Link>
            </div>

            <div className="signup-box">
                <h2>Patient</h2>

                <Link to="/patientsignup">
                    <button>Sign Up</button>
                </Link>
            </div>

        </div>
    );
};

export default SignUp;