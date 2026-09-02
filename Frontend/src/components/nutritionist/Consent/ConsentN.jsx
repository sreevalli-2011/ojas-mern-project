import React, { useEffect, useState } from "react";
import "./ConsentN.css";
import { apiFetch } from "../../../utility/api";

function ConsentN() {

    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAll = async () => {
            try {
                const myPatients = await apiFetch("/patients");

                // The backend only supports fetching one patient's consent
                // form at a time, so we check each of the nutritionist's
                // patients and collect the ones who have submitted one.
                const results = await Promise.all(
                    myPatients.map((p) =>
                        apiFetch(`/consent/${p._id}`)
                            .then((consent) => (consent ? { ...consent, patient: p } : null))
                            .catch(() => null)
                    )
                );
                setSubmissions(results.filter(Boolean));
            } catch (err) {
                // leave list empty on failure
            } finally {
                setLoading(false);
            }
        };
        loadAll();
    }, []);

    return (

        <div className="consentn">

            <div className="consentn_header">

                <div>

                    <h1>
                        Patient Intake & Consent Forms
                    </h1>

                    <p>
                        Review the intake and consent questionnaires your patients have submitted.
                    </p>

                </div>

            </div>

            {loading ? (
                <div className="consentn_body">
                    <p>Loading submissions...</p>
                </div>
            ) : submissions.length === 0 ? (
                <div className="consentn_body">

                    <h2>
                        No Submissions Yet
                    </h2>

                    <p>
                        Once a patient fills out their intake & consent form, it will appear here.
                    </p>

                </div>
            ) : (
                <div className="consentn_body" style={{ textAlign: "left" }}>
                    {submissions.map((s) => (
                        <div key={s._id} style={{ marginBottom: "1.5rem" }}>
                            <h3>
                                {s.patient?.user?.fullName || s.patient?.fullName || "Unnamed patient"}
                            </h3>
                            <p style={{ color: "#666" }}>
                                Submitted {new Date(s.signedAt).toLocaleDateString()}
                            </p>
                            {s.answers &&
                                Object.entries(s.answers).map(([question, answer]) => (
                                    <p key={question}>
                                        <b>{question}:</b> {answer}
                                    </p>
                                ))}
                        </div>
                    ))}
                </div>
            )}

        </div>

    );

}

export default ConsentN;
