import React, { useEffect, useState } from "react";
import "./SupplementN.css";
import { Link } from "react-router-dom";
import { apiFetch } from "../../../utility/api";

const SupplementN = () => {

    const [supplements, setSupplements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAll = async () => {
            try {
                const myPatients = await apiFetch("/patients");
                const results = await Promise.all(
                    myPatients.map((p) =>
                        apiFetch(`/supplements/patient/${p._id}`)
                            .then((list) => list.map((s) => ({ ...s, patient: p })))
                            .catch(() => [])
                    )
                );
                setSupplements(results.flat());
            } catch (err) {
                // leave list empty on failure
            } finally {
                setLoading(false);
            }
        };
        loadAll();
    }, []);

    return (

        <div className="supplement_page">

            <div className="supplement_header">

                <div>

                    <h1>Supplement Management</h1>

                    <p>
                        Review, assign, and customize micronutrient formulations and dosages.
                    </p>

                </div>

                <Link
                    to="/dashboard/supplements/new"
                    className="assign_btn"
                >
                    + Assign Supplement
                </Link>

            </div>


            <div className="supplement_card">

                {loading ? (
                    <div className="empty_state">
                        <p>Loading supplements...</p>
                    </div>
                ) : supplements.length === 0 ? (
                    <div className="empty_state">

                        <div className="supplement_icon">
                            💊
                        </div>

                        <p>
                            No supplements assigned.
                        </p>

                    </div>
                ) : (
                    <div className="empty_state" style={{ textAlign: "left" }}>
                        {supplements.map((s) => (
                            <div key={s._id} style={{ marginBottom: "1rem" }}>
                                <p><b>{s.name}</b> — {s.patient?.user?.fullName || s.patient?.fullName || "Unknown patient"}</p>
                                <p>{s.dosage} · {s.frequency} · {s.duration}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>

        </div>

    );

};

export default SupplementN;
