import React, { useEffect, useState } from "react";
import { getStoredUser, apiFetch } from "../../../utility/api";

function DashboardHome() {

    const { fullName } = getStoredUser();
    const [patientCount, setPatientCount] = useState(0);
    const [todayAppointments, setTodayAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const patients = await apiFetch("/patients");
                setPatientCount(patients.length);

                const appointments = await apiFetch("/appointments");
                const today = new Date().toDateString();
                const todays = appointments.filter(
                    (a) => new Date(a.date).toDateString() === today
                );
                setTodayAppointments(todays);
            } catch (err) {
                // Dashboard still renders with zeros if the backend call fails
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const dashboardCards = [
        { title: "TOTAL PATIENTS", number: loading ? "..." : String(patientCount) },
        { title: "MEAL TEMPLATES", number: "0" },
        { title: "PENDING REVIEWS", number: "0" },
        { title: "TODAY'S VISITS", number: loading ? "..." : String(todayAppointments.length) },
    ];

    return (

        <>

            <div className="welcome">

                <h1>
                    Welcome, {fullName ? fullName.split(" ")[0] : "there"} 👋
                </h1>

                <p>
                    Here's a summary of your clinic metrics and today's appointments.
                </p>

            </div>


            <div className="dashboard_cards">

                {dashboardCards.map((item) => (

                    <div
                        className="dashboard_card"
                        key={item.title}
                    >

                        <div className="icon_box">

                        </div>

                        <div className="card_info">

                            <p>

                                {item.title}

                            </p>

                            <h2>

                                {item.number}

                            </h2>

                        </div>

                    </div>

                ))}

            </div>


            <div className="bottom_section">

                <div className="big_card">

                    <div className="card_heading">

                        <h2>
                            Today's Appointments
                        </h2>

                    </div>

                    {todayAppointments.length === 0 ? (
                        <div className="empty_box">

                            <p>
                                No appointments scheduled today.
                            </p>

                        </div>
                    ) : (
                        <div className="empty_box">
                            {todayAppointments.map((a) => (
                                <p key={a._id}>
                                    {a.time || "Time TBD"} — {a.reason || "Consultation"}
                                </p>
                            ))}
                        </div>
                    )}

                </div>


                <div className="small_card">

                    <h2>
                        Pending Blood Reports
                    </h2>

                    <div className="empty_box">

                        <p>
                            No blood reports awaiting review.
                        </p>

                    </div>

                </div>

            </div>

        </>

    );

}

export default DashboardHome;
