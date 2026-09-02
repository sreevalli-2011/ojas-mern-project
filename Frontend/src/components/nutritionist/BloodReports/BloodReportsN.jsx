import React, { useEffect, useState } from "react";
import "./BloodReportsN.css";
import { apiFetch, apiUpload, getFileUrl } from "../../../utility/api";

const BloodReportsN = () => {

    const [patients, setPatients] = useState([]);
    const [patientId, setPatientId] = useState("");
    const [title, setTitle] = useState("");
    const [testDate, setTestDate] = useState("");
    const [resultsText, setResultsText] = useState("");
    const [file, setFile] = useState(null);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    useEffect(() => {
        apiFetch("/patients")
            .then(setPatients)
            .catch(() => {});
    }, []);

    const loadHistory = async (id) => {
        if (!id) {
            setHistory([]);
            return;
        }
        setHistoryLoading(true);
        try {
            const data = await apiFetch(`/bloodreports/patient/${id}`);
            setHistory(data);
        } catch (err) {
            setHistory([]);
        } finally {
            setHistoryLoading(false);
        }
    };

    const handlePatientChange = (e) => {
        const id = e.target.value;
        setPatientId(id);
        loadHistory(id);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setError("");

        if (!patientId) {
            setError("Please select a patient");
            return;
        }
        if (!resultsText && !file) {
            setError("Please enter lab results text or attach a file");
            return;
        }

        setSaving(true);
        try {
            const form = new FormData();
            form.append("patient", patientId);
            if (testDate) form.append("reportDate", testDate);
            form.append(
                "reviewNotes",
                title ? `${title}\n\n${resultsText}` : resultsText
            );
            if (file) form.append("file", file);

            await apiUpload("/bloodreports", form);

            setTitle("");
            setTestDate("");
            setResultsText("");
            setFile(null);
            loadHistory(patientId);
        } catch (err) {
            setError(err.message);
        } finally {
            setSaving(false);
        }
    };

    return (

        <div className="blood_page">

            <div className="blood_header">

                <h1>
                    Lab & Blood Reports Workspace
                </h1>

                <p>
                    Upload biomarker records directly for each patient and manage laboratory results in one central hub.
                </p>

            </div>


            <div className="blood_layout">

                <div className="upload_card">

                    <div className="card_title">

                        <span className="icon">📤</span>

                        <h2>
                            Upload Patient Lab Document
                        </h2>

                    </div>

                    <hr />

                    <p>Select Patient *</p>

                    <select value={patientId} onChange={handlePatientChange}>

                        <option value="">-- Choose a patient --</option>
                        {patients.map((p) => (
                            <option key={p._id} value={p._id}>
                                {p.user?.fullName || p.fullName || "Unnamed patient"}
                            </option>
                        ))}

                    </select>


                    <p>Report / Lab Test Title *</p>

                    <input
                        type="text"
                        placeholder="e.g. Comprehensive Blood Work, HbA1c, Vitamin D Panel"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />


                    <div className="two_fields">

                        <div>

                            <p>Date of Test *</p>

                            <input
                                type="date"
                                value={testDate}
                                onChange={(e) => setTestDate(e.target.value)}
                            />

                        </div>


                        <div>

                            <p>Attach File (.pdf, .txt)</p>

                            <input
                                type="file"
                                accept=".pdf,.txt"
                                onChange={(e) => setFile(e.target.files[0] || null)}
                            />

                        </div>

                    </div>


                    <p>Biomarkers & Lab Results Text</p>

                    <textarea
                        rows="8"
                        placeholder={"Type or copy-paste clinical test values, biomarker details, and blood readings...\n\nExample:\nVitamin D: 24 ng/mL\nHbA1c: 6.1%\nFerritin: 18 ng/mL\nTSH: 4.8 mIU/L"}
                        value={resultsText}
                        onChange={(e) => setResultsText(e.target.value)}
                    ></textarea>

                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <button className="save_btn" onClick={handleSave} disabled={saving}>
                        {saving ? "Saving..." : "Save Lab Document"}
                    </button>

                </div>



                <div className="history_card">

                    <div className="card_title">

                        <span className="icon">📄</span>

                        <h2>
                            Lab & Blood Reports History ({history.length})
                        </h2>

                    </div>

                    <hr />


                    {!patientId ? (
                        <div className="empty_state">
                            <p>Select a patient to see their report history.</p>
                        </div>
                    ) : historyLoading ? (
                        <div className="empty_state">
                            <p>Loading...</p>
                        </div>
                    ) : history.length === 0 ? (
                        <div className="empty_state">

                            <div className="empty_icon">
                                📄
                            </div>

                            <p>
                                No blood reports found in patient database.
                            </p>

                        </div>
                    ) : (
                        <div style={{ textAlign: "left" }}>
                            {history.map((r) => (
                                <div key={r._id} style={{ marginBottom: "1rem" }}>
                                    <p><b>{new Date(r.reportDate).toLocaleDateString()}</b></p>
                                    {r.reviewNotes && (
                                        <p style={{ whiteSpace: "pre-wrap" }}>{r.reviewNotes}</p>
                                    )}
                                    {r.fileUrl && (
                                        <p>
                                            <a href={getFileUrl(r.fileUrl)} target="_blank" rel="noreferrer">
                                                📎 View attached file
                                            </a>
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                </div>

            </div>

        </div>

    );

};

export default BloodReportsN;
