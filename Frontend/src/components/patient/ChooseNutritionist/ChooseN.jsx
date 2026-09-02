import React, { useState } from "react";
import "./ChooseN.css";
import { nutritionists } from "../../../utility/data";
import { useNavigate } from "react-router-dom";
import { getStoredUser, ensurePatientProfile } from "../../../utility/api";

function ChooseN() {

    const navigate = useNavigate();
    const { fullName, email } = getStoredUser();
    const [search, setSearch] = useState("");
    const [selecting, setSelecting] = useState(false);
    const [error, setError] = useState("");

    const filtered = nutritionists.filter((n) =>
        n.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSelect = async () => {
        // Note: the nutritionist list above is illustrative sample data, not
        // real backend records, so we can't yet link a specific nutritionist
        // id here. We do make sure the patient's own profile exists in the
        // backend before moving on, so later features (meal plans, blood
        // reports, etc.) have something to attach to.
        setError("");
        setSelecting(true);
        try {
            await ensurePatientProfile();
            navigate("/dashboardp");
        } catch (err) {
            setError(err.message);
        } finally {
            setSelecting(false);
        }
    };

    return (

        <div className="choose">

            <div className="sidebar">

                <p className="loginas">
                    LOGGED IN AS
                </p>

                <div className="profile">

                    <h3>{fullName || "Patient"}</h3>

                    <p>{email}</p>

                </div>

                <ul>

                    <li className="activeitem">
                        My Nutritionist
                    </li>

                </ul>

            </div>

            <div className="main">

                <div className="topbox">

                    <h1>Select Your Nutritionist</h1>

                    <p>
                        Browse our nutritionists and choose the one you'd like to work with.
                    </p>

                    <input
                        type="text"
                        placeholder="Search Nutritionists..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    {error && <p style={{ color: "red" }}>{error}</p>}

                </div>

                <div className="cards">

                    {filtered.map((item) => (

                        <div className="card" key={item.name}>

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <h2>
                                Nutritionist {item.name}
                            </h2>

                            <h4>
                                {item.qualification}
                            </h4>

                            <p>
                                {item.experience}
                            </p>

                            <p className="about">
                                {item.about}
                            </p>

                            <div className="clinic">

                                <p>
                                    <b>Clinic:</b> {item.clinic}
                                </p>

                            </div>

                            <button onClick={handleSelect} disabled={selecting}>
                                {selecting ? "Selecting..." : "Select Nutritionist"}
                            </button>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default ChooseN;
