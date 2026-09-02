import React, { useEffect } from "react";
import "./Dashboard.css";
import { sidebar } from "../../../utility/data";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getStoredUser, clearSession } from "../../../utility/api";

function Dashboard() {

    const navigate = useNavigate();
    const { role, fullName, email } = getStoredUser();

    useEffect(() => {
        // Guard: only logged-in nutritionists can see this layout.
        if (!localStorage.getItem("token")) {
            navigate("/login");
        } else if (role !== "nutritionist") {
            navigate("/dashboardp");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogout = () => {
        clearSession();
        navigate("/login");
    };

    return (

        <div className="dashboard">

            <div className="sidebar">

                <p className="loginas">
                    LOGGED IN AS
                </p>

                <div className="profile">

                    <h3>
                        {fullName || "Nutritionist"}
                    </h3>

                    <p>
                        {email}
                    </p>

                </div>

                <ul>

                    {sidebar.map((item) => (

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

                <Outlet />

            </div>

        </div>

    );

}

export default Dashboard;
