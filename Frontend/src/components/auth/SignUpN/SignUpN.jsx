import React, { useState } from "react";
import "./SignUpN.css";
import { useNavigate } from "react-router-dom";
import { apiFetch, saveSession } from "../../../utility/api";

const SignUpN = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        countryCode: "+91",
        phone: "",
        experience: "",
        qualification: "",
        clinicName: "",
        bio: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
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
                    role: "nutritionist",
                }),
            });

            saveSession(data);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="signupn">

            <h1>Nutritionist Sign Up</h1>

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

                    <p>Email Address</p>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email Address"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </div>

            </div>

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

                    <p>Phone Number</p>

                    <div className="phone">

                        <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                        >

                            <option value="+91">🇮🇳 +91</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+44">🇬🇧 +44</option>
                            <option value="+61">🇦🇺 +61</option>

                        </select>

                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            value={formData.phone}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div>

                    <p>Experience (Years)</p>

                    <input
                        type="number"
                        name="experience"
                        placeholder="Years"
                        value={formData.experience}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <div className="row">

                <div>

                    <p>Qualification</p>

                    <input
                        type="text"
                        name="qualification"
                        placeholder="Enter Qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                    />

                </div>

                <div>

                    <p>Clinic Name (Optional)</p>

                    <input
                        type="text"
                        name="clinicName"
                        placeholder="Enter Clinic Name"
                        value={formData.clinicName}
                        onChange={handleChange}
                    />

                </div>

            </div>

            <p>About / Professional Bio</p>

            <textarea
                name="bio"
                rows="5"
                placeholder="Tell patients about yourself..."
                value={formData.bio}
                onChange={handleChange}
            ></textarea>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <button onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating Account..." : "Sign Up as Nutritionist"}
            </button>

        </div>

    );

};

export default SignUpN;
