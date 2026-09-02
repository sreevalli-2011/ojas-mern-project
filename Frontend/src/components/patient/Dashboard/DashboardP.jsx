import React, { useEffect } from "react";
import "./DashboardP.css";
import { patientSidebar } from "../../../utility/data";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getStoredUser, clearSession } from "../../../utility/api";

function DashboardP() {

    const navigate = useNavigate();
    const { role, fullName, email } = getStoredUser();

    useEffect(() => {
        // Guard: only logged-in patients can see this layout.
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else if (role !== "patient") {
            navigate("/dashboard");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        clearSession();
        navigate("/login");
    };

    return (

        <div className="dashboardp">

            <div className="sidebar">

                <p className="loginas">
                    LOGGED IN AS
                </p>

                <div className="profile">

                    <h3>{fullName || "Patient"}</h3>

                    <p>{email}</p>

                </div>

                <ul>

                    {patientSidebar.map((item) => (

                        <li
                            className={item.active ? "active" : ""}
                            key={item.title}
                        >

                            <Link
                                to={item.path}
                                className="sidebarlink"
                            >

                                {item.title}

                            </Link>

                        </li>

                    ))}

                </ul>

                <button className="logout" onClick={handleLogout}>
                    Logout
                </button>

            </div>

            <div className="dashboard_main">

                {/* Nested sub-pages (Consent, My Nutritionist, etc.)
                    render here based on the current URL */}
                <Outlet />

            </div>

        </div>

    );

}

export default DashboardP;
