import React, { useEffect, useState } from "react";
import { getStoredUser, apiFetch, ensurePatientProfile } from "../../../utility/api";

function DashboardPHome() {

    const { fullName } = getStoredUser();
    const [counts, setCounts] = useState({
        appointments: 0,
        mealPlans: 0,
        bloodReports: 0,
        supplements: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const patientId = await ensurePatientProfile();

                const [mealPlans, supplements, bloodReports, appointments] =
                    await Promise.all([
                        apiFetch(`/mealplans/patient/${patientId}`),
                        apiFetch(`/supplements/patient/${patientId}`),
                        apiFetch(`/bloodreports/patient/${patientId}`),
                        apiFetch("/appointments"),
                    ]);

                const myUpcoming = appointments.filter(
                    (a) => a.patient && a.patient._id === patientId && a.status === "scheduled"
                );

                setCounts({
                    appointments: myUpcoming.length,
                    mealPlans: mealPlans.length,
                    bloodReports: bloodReports.length,
                    supplements: supplements.length,
                });
            } catch (err) {
                // Dashboard still renders with zeros if the backend call fails
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const patientDashboard = [
        { number: loading ? "..." : String(counts.appointments), title: "Upcoming Appointment" },
        { number: loading ? "..." : String(counts.mealPlans), title: "Meal Plans" },
        { number: loading ? "..." : String(counts.bloodReports), title: "Blood Reports" },
        { number: loading ? "..." : String(counts.supplements), title: "Supplements" },
    ];

    return (

        <>

            <div className="welcome">

                <h1>
                    Welcome Back, {fullName ? fullName.split(" ")[0] : "there"} 👋
                </h1>

                <p>
                    Here's a quick overview of your health journey.
                </p>

            </div>

            <div className="dashboard_cards">

                {patientDashboard.map((item) => (

                    <div
                        className="dashboard_card"
                        key={item.title}
                    >

                        <div className="number">

                            {item.number}

                        </div>

                        <div>

                            <h3>

                                {item.title}

                            </h3>

                        </div>

                    </div>

                ))}

            </div>

            <div className="bottom_section">

                <div className="big_card">

                    <h2>
                        Today's Reminder
                    </h2>

                    <p>
                        No reminders available.
                    </p>

                </div>

                <div className="small_card">

                    <h2>
                        Latest Update
                    </h2>

                    <p>
                        Your nutritionist has not shared any updates yet.
                    </p>

                </div>

            </div>

        </>

    );

}

export default DashboardPHome;
