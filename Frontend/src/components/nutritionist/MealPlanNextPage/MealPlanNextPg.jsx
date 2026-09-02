import React, { useEffect, useState } from "react";
import "./MealPlanNextPg.css";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch, apiUpload } from "../../../utility/api";

const MealPlanNextPg = () => {

    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [patientId, setPatientId] = useState("");
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        title: "",
        breakfast: "",
        midMorning: "",
        lunch: "",
        eveningSnack: "",
        dinner: "",
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

        if (!patientId) {
            setError("Please select a patient");
            return;
        }
        if (!formData.title) {
            setError("Please enter a meal plan title");
            return;
        }

        setLoading(true);
        try {
            const form = new FormData();
            form.append("patient", patientId);
            form.append("title", formData.title);
            form.append(
                "meals",
                JSON.stringify([
                    {
                        day: "Everyday",
                        breakfast: formData.breakfast,
                        lunch: formData.lunch,
                        dinner: formData.dinner,
                        snacks: [formData.midMorning, formData.eveningSnack]
                            .filter(Boolean)
                            .join(", "),
                    },
                ])
            );
            if (file) form.append("file", file);

            await apiUpload("/mealplans", form);

            navigate("/dashboard/mealplan");
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="mealnext_page">

            <div className="mealnext_header">

                <div>

                    <h1>Therapeutic Meal Blueprints</h1>

                    <p>
                        Create clinical nutrition templates and assign them to active patient profiles.
                    </p>

                </div>

            </div>

            <div className="mealnext_card">

                <div className="form_heading">

                    <h2>
                        Configure Dietary Meal Template
                    </h2>

                    <Link
                        to="/dashboard/mealplan"
                        className="cancel_link"
                    >
                        Cancel
                    </Link>

                </div>

                <hr />

                <p>Select Patient *</p>

                <select value={patientId} onChange={(e) => setPatientId(e.target.value)}>
                    <option value="">-- Choose Patient --</option>
                    {patients.map((p) => (
                        <option key={p._id} value={p._id}>
                            {p.user?.fullName || p.fullName || "Unnamed patient"}
                        </option>
                    ))}
                </select>

                <p>Meal Plan Title *</p>

                <input
                    type="text"
                    name="title"
                    placeholder="e.g. Ketogenic Lipid-Reduction Plan"
                    value={formData.title}
                    onChange={handleChange}
                />

                <div className="pdf_upload">

                    <h3>
                        ATTACH CUSTOM PDF MEAL PLAN (OPTIONAL)
                    </h3>

                    <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => setFile(e.target.files[0] || null)}
                    />

                    <p className="upload_note">
                        Upload a PDF meal plan. If uploaded, the text fields below become optional.
                    </p>

                </div>

                <div className="meal_row">

                    <div>

                        <p>Breakfast *</p>

                        <textarea
                            name="breakfast"
                            rows="4"
                            placeholder="Morning fuels & proteins..."
                            value={formData.breakfast}
                            onChange={handleChange}
                        ></textarea>

                    </div>

                    <div>

                        <p>Mid-Morning Snack</p>

                        <textarea
                            name="midMorning"
                            rows="4"
                            placeholder="Optional snacks..."
                            value={formData.midMorning}
                            onChange={handleChange}
                        ></textarea>

                    </div>

                </div>

                <div className="meal_row">

                    <div>

                        <p>Lunch *</p>

                        <textarea
                            name="lunch"
                            rows="4"
                            placeholder="Healthy lunch portions..."
                            value={formData.lunch}
                            onChange={handleChange}
                        ></textarea>

                    </div>

                    <div>

                        <p>Evening Snack</p>

                        <textarea
                            name="eveningSnack"
                            rows="4"
                            placeholder="Optional snacks..."
                            value={formData.eveningSnack}
                            onChange={handleChange}
                        ></textarea>

                    </div>

                </div>

                <p>Dinner *</p>

                <textarea
                    name="dinner"
                    rows="4"
                    placeholder="Evening clinical portions..."
                    value={formData.dinner}
                    onChange={handleChange}
                ></textarea>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="meal_buttons">

                    <Link
                        to="/dashboard/mealplan"
                        className="cancel_btn"
                    >
                        Cancel
                    </Link>

                    <button className="save_btn" onClick={handleSubmit} disabled={loading}>
                        {loading ? "Saving..." : "Save Template"}
                    </button>

                </div>

            </div>

        </div>

    );

};

export default MealPlanNextPg;
