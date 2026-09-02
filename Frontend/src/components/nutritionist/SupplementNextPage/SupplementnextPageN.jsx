import React, { useEffect, useState } from "react";
import "./SupplementNextPgN.css";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../../utility/api";

const SupplementNextPgN = () => {

    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({
        patientId: "",
        name: "",
        dosage: "",
        frequency: "",
        duration: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        apiFetch("/patients")
            .then(setPatients)
            .catch(() => {});
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!formData.patientId) {
            setError("Please select a patient");
            return;
        }
        if (!formData.name || !formData.dosage || !formData.frequency) {
            setError("Please fill in the required fields");
            return;
        }

        setLoading(true);
        try {
            await apiFetch("/supplements", {
                method: "POST",
                body: JSON.stringify({
                    patient: formData.patientId,
                    name: formData.name,
                    dosage: formData.dosage,
                    frequency: formData.frequency,
                    duration: formData.duration,
                }),
            });

            navigate("/dashboard/supplements");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="suppnext_page">

            <div className="suppnext_header">

                <div>

                    <h1>Supplement Management</h1>

                    <p>
                        Review, assign, and customize micronutrient formulations and dosages.
                    </p>

                </div>

            </div>

            <div className="suppnext_card">

                <div className="form_heading">

                    <h2>
                        CONFIGURE SUPPLEMENT DIRECTIVE
                    </h2>

                    <Link
                        to="/dashboard/supplements"
                        className="cancel_link"
                    >
                        Cancel
                    </Link>

                </div>

                <hr />

                <div className="supp_row">

                    <div>

                        <p>Select Patient *</p>

                        <select name="patientId" value={formData.patientId} onChange={handleChange}>

                            <option value="">-- Choose Patient --</option>
                            {patients.map((p) => (
                                <option key={p._id} value={p._id}>
                                    {p.user?.fullName || p.fullName || "Unnamed patient"}
                                </option>
                            ))}

                        </select>

                    </div>

                    <div>

                        <p>Supplement Name *</p>

                        <input
                            type="text"
                            name="name"
                            placeholder="e.g. Magnesium Glycinate"
                            value={formData.name}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                <div className="supp_row">

                    <div>

                        <p>Dosage / Formulation *</p>

                        <input
                            type="text"
                            name="dosage"
                            placeholder="e.g. 400mg"
                            value={formData.dosage}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <p>Frequency *</p>

                        <input
                            type="text"
                            name="frequency"
                            placeholder="e.g. 1 capsule 30m before bed"
                            value={formData.frequency}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <p>Duration *</p>

                        <input
                            type="text"
                            name="duration"
                            placeholder="30 Days"
                            value={formData.duration}
                            onChange={handleChange}
                        />

                    </div>

                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="supp_buttons">

                    <Link
                        to="/dashboard/supplements"
                        className="cancel_btn"
                    >
                        Cancel
                    </Link>

                    <button className="assign_btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Assigning..." : "Assign To Patient"}
                    </button>

                </div>

            </div>

        </div>

    );

};

export default SupplementNextPgN;
