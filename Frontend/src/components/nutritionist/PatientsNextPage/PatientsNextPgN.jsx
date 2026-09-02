import React, { useState } from "react";
import "./PatientsNextPg.css";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../../utility/api";

function PatientsNextPg() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        age: "",
        gender: "Female",
        symptoms: "",
        medicalHistory: "",
        medications: "",
        notes: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.fullName || !formData.email) {
            setError("Please enter the patient's full name and email");
            return;
        }

        setLoading(true);

        try {
            await apiFetch("/patients", {
                method: "POST",
                body: JSON.stringify({
                    fullName: formData.fullName,
                    email: formData.email,
                    age: formData.age ? Number(formData.age) : undefined,
                    gender: formData.gender,
                    healthGoals: formData.symptoms,
                    medicalHistory: [
                        formData.medicalHistory,
                        formData.medications,
                        formData.notes,
                    ]
                        .filter(Boolean)
                        .join(" | "),
                }),
            });

            navigate("/dashboard/patients");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="patientnext">

            <div className="patientnext_card">

                <div className="patientnext_header">

                    <div>

                        <h1>Your Registered Patients</h1>

                        <p>
                            Create clinical profiles, customize treatments, and schedule appointments.
                        </p>

                    </div>

                </div>

                <div className="patient_form">

                    <div className="form_heading">

                        <h2>Add New Intake Patient Record</h2>

                        <Link to="/dashboard/patients" className="cancel_link">
                            Cancel
                        </Link>

                    </div>

                    <p style={{ fontSize: "0.85rem", color: "#666" }}>
                        This creates a clinical record for a patient. If they later sign up
                        with the same email, their account can be linked to this record.
                    </p>

                    <div className="row">

                        <div>

                            <p>Full Name *</p>

                            <input
                                type="text"
                                name="fullName"
                                placeholder="e.g., Emily Carter"
                                value={formData.fullName}
                                onChange={handleChange}
                            />

                        </div>

                        <div>

                            <p>Email *</p>

                            <input
                                type="email"
                                name="email"
                                placeholder="emily@example.com"
                                value={formData.email}
                                onChange={handleChange}
                            />

                        </div>

                    </div>

                    <div className="row">

                        <div>

                            <p>Age</p>

                            <input
                                type="number"
                                name="age"
                                placeholder="30"
                                value={formData.age}
                                onChange={handleChange}
                            />

                        </div>

                        <div>

                            <p>Gender</p>

                            <select name="gender" value={formData.gender} onChange={handleChange}>

                                <option>Female</option>
                                <option>Male</option>
                                <option>Other</option>

                            </select>

                        </div>

                    </div>

                    <p>Current Symptoms*</p>

                    <textarea
                        name="symptoms"
                        rows="3"
                        placeholder="e.g., sleep apnea, high stress, bloating etc..."
                        value={formData.symptoms}
                        onChange={handleChange}
                    ></textarea>


                    <p>Medical Conditions (if any)</p>

                    <textarea
                        name="medicalHistory"
                        rows="3"
                        placeholder="e.g., Type-2 Diabetes, Fatty Liver..."
                        value={formData.medicalHistory}
                        onChange={handleChange}
                    ></textarea>

                    <p>Current Medications & Supplements</p>

                    <textarea
                        name="medications"
                        rows="3"
                        placeholder="e.g., Metformin 500mg, Omega-3..."
                        value={formData.medications}
                        onChange={handleChange}
                    ></textarea>

                    <p>Initial Clinical Consultation Notes</p>

                    <textarea
                        name="notes"
                        rows="3"
                        placeholder="Observations, behavioural hurdles, tracking parameters..."
                        value={formData.notes}
                        onChange={handleChange}
                    ></textarea>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <div className="buttons">

                        <Link to="/dashboard/patients" className="cancel_btn">

                            Cancel

                        </Link>

                        <button onClick={handleSubmit} disabled={loading}>

                            {loading ? "Saving..." : "Create Patient Profile"}

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default PatientsNextPg;
