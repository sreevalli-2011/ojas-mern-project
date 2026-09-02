import React, { useEffect, useState } from "react";
import "./PatientsN.css";
import { Link } from "react-router-dom";
import { apiFetch } from "../../../utility/api";

const PatientsN = () => {
    const [patients, setPatients] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadPatients = async () => {
            try {
                const data = await apiFetch("/patients");
                setPatients(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadPatients();
    }, []);

    const filtered = patients.filter((p) => {
        const name = p.user?.fullName || p.fullName || "";
        const email = p.user?.email || p.email || "";
        const term = search.toLowerCase();
        return name.toLowerCase().includes(term) || email.toLowerCase().includes(term);
    });

    return (

        <div className="patients_page">

            <div className="patients_header">

                <div>

                    <h1>Your Registered Patients</h1>

                    <p>
                        Create clinical profiles, customize treatments, and schedule appointments.
                    </p>

                </div>

                <Link to="/dashboard/patients/new" className="addpatient">

                    + Add Patient

                </Link>
            </div>

            <div className="search_box">

                <input
                    type="text"
                    placeholder="Search patients by name or email address..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>

            <div className="patients_card">

                {loading ? (
                    <div className="empty_state">
                        <p>Loading patients...</p>
                    </div>
                ) : error ? (
                    <div className="empty_state">
                        <p style={{ color: "red" }}>{error}</p>
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="empty_state">

                        <div className="patient_icon">
                            👤
                        </div>

                        <p>No matched patient records found.</p>

                    </div>
                ) : (
                    filtered.map((p) => (
                        <div className="empty_state" key={p._id} style={{ textAlign: "left" }}>
                            <p>
                                <b>{p.user?.fullName || p.fullName || "Unnamed patient"}</b>
                                {(p.user?.email || p.email) ? ` — ${p.user?.email || p.email}` : ""}
                            </p>
                            {p.phone && <p>Phone: {p.phone}</p>}
                            {p.gender && <p>Gender: {p.gender}</p>}
                        </div>
                    ))
                )}

            </div>

        </div>

    );
};

export default PatientsN;
