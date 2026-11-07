import React from "react";
import "./HomePage.css";
import Footer from "../Footer/Footer";

const Homepage = () => {
return (
<div className="homepage">

    <div className="hero">

        <div className="left">

            <p className="tag"> Made for Nutritionists</p>

            <h1>
                Less paperwork.
                <br />
                More patient care.
            </h1>

            <p>
                Manage patients, blood reports, meal plans,
                supplements and appointments — all in one place.
            </p>

            <button>Get Started</button>
            <button className="learn">Learn More</button>

        </div>


        <div className="right">

            <div className="box">
                <h2>42</h2>
                <p>Patients</p>
            </div>

            <div className="box">
                <h2>6</h2>
                <p>Reports Pending</p>
            </div>

            <div className="box">
                <h2>18</h2>
                <p>Meal Plans</p>
            </div>

            <div className="box">
                <h2>12</h2>
                <p>Supplements</p>
            </div>

        </div>

    </div>



    <div className="features">

        <h2>Everything you need.</h2>

        <div className="cards">

            <div className="card">
                <h3> Patients</h3>
                <p>Add and manage patient records.</p>
            </div>

            <div className="card">
                <h3> Blood Reports</h3>
                <p>Upload and organize reports.</p>
            </div>

            <div className="card">
                <h3> Meal Plans</h3>
                <p>Create personalized meal plans.</p>
            </div>

            <div className="card">
                <h3> Supplements</h3>
                <p>Assign supplements with dosage.</p>
            </div>

            <div className="card">
                <h3> Appointments</h3>
                <p>Schedule and manage follow-ups.</p>
            </div>

            <div className="card">
                <h3> Notes</h3>
                <p>Store patient history safely.</p>
            </div>

        </div>

    </div>
    
    <Footer />

</div>
);
};

export default Homepage;