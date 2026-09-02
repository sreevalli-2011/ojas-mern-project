import React, { useEffect, useState } from "react";
import "./CalendarNextPg.css";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../../../utility/api";

const CalendarNextPage = () => {

    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [formData, setFormData] = useState({
        patientId: "",
        consultationType: "Initial Consultation",
        date: "",
        time: "",
        mode: "In Clinic",
        notes: "",
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

        if (!formData.patientId || !formData.date) {
            setError("Please select a patient and a date");
            return;
        }

        setLoading(true);
        try {
            await apiFetch("/appointments", {
                method: "POST",
                body: JSON.stringify({
                    patient: formData.patientId,
                    date: formData.date,
                    time: formData.time,
                    reason: `${formData.consultationType} (${formData.mode})${
                        formData.notes ? " — " + formData.notes : ""
                    }`,
                }),
            });

            navigate("/dashboard/calendar");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="calendarnext_page">

            <div className="calendarnext_header">

                <h1>Schedule Patient Consultation</h1>

                <p>
                    Create and manage appointments for your patients.
                </p>

            </div>


            <div className="calendarnext_card">

                <div className="form_heading">

                    <h2>Appointment Details</h2>

                    <Link
                        to="/dashboard/calendar"
                        className="cancel_link"
                    >
                        Cancel
                    </Link>

                </div>

                <hr />

                <div className="calendar_row">

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

                        <p>Consultation Type *</p>

                        <select name="consultationType" value={formData.consultationType} onChange={handleChange}>

                            <option>Initial Consultation</option>
                            <option>Follow-up</option>
                            <option>Review Session</option>

                        </select>

                    </div>

                </div>


                <div className="calendar_row">

                    <div>

                        <p>Appointment Date *</p>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />

                    </div>

                    <div>

                        <p>Appointment Time *</p>

                        <input
                            type="time"
                            name="time"
                            value={formData.time}
                            onChange={handleChange}
                        />

                    </div>

                </div>


                <p>Mode of Consultation</p>

                <select name="mode" value={formData.mode} onChange={handleChange}>

                    <option>In Clinic</option>

                    <option>Online</option>

                    <option>Phone Call</option>

                </select>


                <p>Notes</p>

                <textarea
                    name="notes"
                    rows="5"
                    placeholder="Add appointment notes..."
                    value={formData.notes}
                    onChange={handleChange}
                ></textarea>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="calendar_buttons">

                    <Link
                        to="/dashboard/calendar"
                        className="cancel_btn"
                    >
                        Cancel
                    </Link>

                    <button className="save_btn" onClick={handleSubmit} disabled={loading}>

                        {loading ? "Saving..." : "Save Appointment"}

                    </button>

                </div>

            </div>

        </div>

    );

};

export default CalendarNextPage;
