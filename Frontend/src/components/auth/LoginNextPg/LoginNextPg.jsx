import React, { useState } from "react";
import "./LoginNextPg.css";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch, saveSession } from "../../../utility/api";

const LoginNextPg = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter your email and password");
            return;
        }

        setLoading(true);
        try {
            const data = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({ email, password }),
            });

            saveSession(data);

            if (data.role === "nutritionist") {
                navigate("/dashboard");
            } else {
                navigate("/dashboardp");
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="loginpage">

            <div className="loginbox">

                <h1>Login</h1>

                <p>Email</p>
                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <p>Password</p>
                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button onClick={handleLogin} disabled={loading}>
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p>Don't have an account?</p>

                <Link to="/signup">
                    <button>Sign Up</button>
                </Link>

            </div>

        </div>
    );
};

export default LoginNextPg;
