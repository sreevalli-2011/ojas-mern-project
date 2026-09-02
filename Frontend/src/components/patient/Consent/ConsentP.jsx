import React, { useState } from "react";
import "./ConsentP.css";
import { consentQuestions } from "../../../utility/data";
import { apiFetch, ensurePatientProfile } from "../../../utility/api";

function ConsentP() {

    const [answers, setAnswers] = useState({});
    const [notes, setNotes] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleAnswer = (question, value) => {
        setAnswers({ ...answers, [question]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!agreed) {
            setError("Please agree to share your medical information to continue");
            return;
        }

        setLoading(true);
        try {
            const patientId = await ensurePatientProfile();

            await apiFetch("/consent", {
                method: "POST",
                body: JSON.stringify({
                    patient: patientId,
                    answers: {
                        ...answers,
                        allergiesOrConditions: notes,
                    },
                }),
            });

            setSubmitted(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="consent">
                <div className="heading">
                    <h1>Thank you!</h1>
                    <p>Your intake and consent form has been submitted.</p>
                </div>
            </div>
        );
    }

    return (

        <div className="consent">

            <div className="heading">

                <h1>Clinical Intake & Consent</h1>

                <p>
                    Please answer the following questions before your first consultation.
                </p>

            </div>

            <div className="form">

                {consentQuestions.map((item) => (

                    <div className="questioncard" key={item.question}>

                        <p>

                            <b>{item.question}</b>

                        </p>

                        <input
                            type="radio"
                            name={item.question}
                            checked={answers[item.question] === "Yes"}
                            onChange={() => handleAnswer(item.question, "Yes")}
                        /> Yes

                        <input
                            type="radio"
                            name={item.question}
                            checked={answers[item.question] === "No"}
                            onChange={() => handleAnswer(item.question, "No")}
                        /> No

                    </div>

                ))}

                <div className="questioncard">

                    <p>

                        <b>Please mention any allergies or medical conditions.</b>

                    </p>

                    <textarea
                        placeholder="Type your answer..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    ></textarea>

                </div>

                <div className="questioncard">

                    <p>

                        <b>I agree to share my medical information with my nutritionist.</b>

                    </p>

                    <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                    /> I Agree

                </div>

                {error && <p style={{ color: "red" }}>{error}</p>}

                <button className="submitbtn" onClick={handleSubmit} disabled={loading}>

                    {loading ? "Submitting..." : "Submit Form"}

                </button>

            </div>

        </div>

    );

}

export default ConsentP;
