import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUpP.css";
import { apiFetch, saveSession, ensurePatientProfile } from "../../../utility/api";

function SignUpP() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        dob: "",
        gender: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.fullName || !formData.email || !formData.password) {
            setError("Please fill in your name, email, and password");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const data = await apiFetch("/auth/signup", {
                method: "POST",
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    password: formData.password,
                    role: "patient",
                }),
            });

            saveSession(data);

            // Create the Patient profile now (age/gender/phone can be filled
            // in later from a profile page) so downstream features like
            // consent, meal plans, etc. have a patient record to attach to.
            try {
                await apiFetch("/patients", {
                    method: "POST",
                    body: JSON.stringify({
                        phone: formData.phone,
                        gender: formData.gender,
                    }),
                });
                localStorage.removeItem("patientId"); // force ensurePatientProfile to re-fetch fresh
                await ensurePatientProfile();
            } catch (profileErr) {
                // Signup itself succeeded even if the profile step fails;
                // ensurePatientProfile() will retry this later automatically.
            }

            navigate("/dashboardp/choose-nutritionist");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signupp">

            <h1>Patient Sign Up</h1>

            <div className="row">

                <div>
                    <p>Full Name</p>
                    <input
                        type="text"
                        name="fullName"
                        placeholder="Enter Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <p>Phone Number</p>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Enter Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <p>Email Address</p>

            <input
                type="email"
                name="email"
                placeholder="Enter Email Address"
                className="full"
                value={formData.email}
                onChange={handleChange}
            />

            <div className="row">

                <div>
                    <p>Password</p>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <p>Confirm Password</p>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

            </div>

            <div className="row">

                <div>
                    <p>Date of Birth</p>
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                    />
                </div>

                <div>

                    <p>Gender</p>

                    <div className="gender">

                        <input
                            type="radio"
                            name="gender"
                            id="male"
                            value="male"
                            checked={formData.gender === "male"}
                            onChange={handleChange}
                        />
                        <label htmlFor="male">Male</label>

                        <input
                            type="radio"
                            name="gender"
                            id="female"
                            value="female"
                            checked={formData.gender === "female"}
                            onChange={handleChange}
                        />
                        <label htmlFor="female">Female</label>

                        <input
                            type="radio"
                            name="gender"
                            id="other"
                            value="other"
                            checked={formData.gender === "other"}
                            onChange={handleChange}
                        />
                        <label htmlFor="other">Other</label>

                    </div>

                </div>

            </div>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button className="signupbtn" onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating Account..." : "Create Patient Account"}
            </button>

        </div>
    );
}

export default SignUpP;
