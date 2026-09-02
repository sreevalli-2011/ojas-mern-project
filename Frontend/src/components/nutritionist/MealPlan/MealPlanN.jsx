import React, { useEffect, useState } from "react";
import "./MealPlanN.css";
import { Link } from "react-router-dom";
import { apiFetch, getFileUrl } from "../../../utility/api";

const MealPlanN = () => {

    const [plansByPatient, setPlansByPatient] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAll = async () => {
            try {
                const myPatients = await apiFetch("/patients");

                // The backend only supports fetching meal plans per-patient,
                // so we pull each patient's plans and merge them here.
                const results = await Promise.all(
                    myPatients.map((p) =>
                        apiFetch(`/mealplans/patient/${p._id}`)
                            .then((plans) => plans.map((plan) => ({ ...plan, patient: p })))
                            .catch(() => [])
                    )
                );
                setPlansByPatient(results.flat());
            } catch (err) {
                // leave lists empty on failure
            } finally {
                setLoading(false);
            }
        };
        loadAll();
    }, []);

    return (

        <div className="mealplan_page">

            <div className="mealplan_header">

                <div>

                    <h1>
                        Therapeutic Meal Blueprints
                    </h1>

                    <p>
                        Create clinical nutrition templates and assign them to active patient profiles.
                    </p>

                </div>

                <Link
                    to="/dashboard/mealplan/new"
                    className="create_meal"
                >
                    + Create Meal Blueprint
                </Link>

            </div>

            {loading ? (
                <div className="meal_empty">
                    <p>Loading meal plans...</p>
                </div>
            ) : plansByPatient.length === 0 ? (
                <div className="meal_empty">

                    <div className="meal_icon">
                        🍽️
                    </div>

                    <h2>
                        No Meal Templates Yet
                    </h2>

                    <p>
                        Click <b>Create Meal Blueprint</b> to build your first therapeutic meal plan template.
                    </p>

                </div>
            ) : (
                <div className="meal_empty" style={{ textAlign: "left" }}>
                    {plansByPatient.map((plan) => (
                        <div key={plan._id} style={{ marginBottom: "1rem" }}>
                            <h3>{plan.title}</h3>
                            <p>Patient: {plan.patient?.user?.fullName || plan.patient?.fullName || "Unknown"}</p>
                            {plan.notes && <p>{plan.notes}</p>}
                            {plan.pdfUrl && (
                                <p>
                                    <a href={getFileUrl(plan.pdfUrl)} target="_blank" rel="noreferrer">
                                        📎 View attached PDF
                                    </a>
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}

        </div>

    );

};

export default MealPlanN;
