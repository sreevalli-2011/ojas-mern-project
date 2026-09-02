import React, { useEffect, useState } from "react";
import "./CalendarN.css";
import { Link } from "react-router-dom";
import { apiFetch } from "../../../utility/api";

const CalendarN = () => {

    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiFetch("/appointments")
            .then((data) => {
                const sorted = [...data].sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                );
                setAppointments(sorted);
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    return (

        <div className="calendar_page">

            <div className="calendar_header">

                <div>

                    <h1>Clinic Calendar Schedule</h1>

                    <p>
                        Visualize, schedule, and mark patient consultations and check-ups.
                    </p>

                </div>

                <Link
                    to="/dashboard/calendar/new"
                    className="schedule_btn"
                >
                    + Schedule Visit
                </Link>

            </div>

            <div className="schedule_heading">

                📈 Chronological Appointments Schedule

            </div>

            <div className="calendar_card">

                {loading ? (
                    <div className="empty_state">
                        <p>Loading appointments...</p>
                    </div>
                ) : appointments.length === 0 ? (
                    <div className="empty_state">

                        <div className="calendar_icon">
                            📅
                        </div>

                        <p>
                            No appointments scheduled.
                        </p>

                    </div>
                ) : (
                    <div style={{ textAlign: "left" }}>
                        {appointments.map((a) => (
                            <div key={a._id} style={{ marginBottom: "1rem" }}>
                                <p>
                                    <b>{new Date(a.date).toLocaleDateString()}</b>
                                    {a.time ? ` at ${a.time}` : ""}
                                    {" — "}
                                    {a.patient?.user?.fullName || a.patient?.fullName || "Unknown patient"}
                                </p>
                                {a.reason && <p>{a.reason}</p>}
                                <p style={{ textTransform: "capitalize" }}>Status: {a.status}</p>
                            </div>
                        ))}
                    </div>
                )}

            </div>

        </div>

    );
};

export default CalendarN;
