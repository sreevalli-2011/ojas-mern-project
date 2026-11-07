import React from "react";
import "./Aboutus.css";
import Footer from "../Footer/Footer";
const Aboutus = () => {
  return (
    <div className="about-page">

      <section className="about-hero">
        <h1>About OJAS</h1>
        <p>
          Making nutrition management simpler, more organized,
          and easier for both nutritionists and patients.
        </p>
      </section>

      <section className="about-section">
        <h2>What is OJAS?</h2>

        <p>
          OJAS is a simple platform designed to help nutritionists
          manage their patients, health records, blood reports,
          meal plans, supplements, and follow-ups in one place.
        </p>

        <p>
          Instead of managing information across Excel sheets,
          Word documents, WhatsApp conversations, and different
          folders, OJAS brings everything together into one
          organized platform.
        </p>
      </section>

      <section className="about-section">
        <h2>Why OJAS?</h2>

        <p>
          Nutritionists deal with a lot of information for every
          patient. Keeping track of reports, consultation notes,
          meal plans, supplements, and follow-ups can become
          difficult when everything is stored separately.
        </p>

        <p>
          OJAS is built to make this process simpler, so
          nutritionists can spend less time managing information
          and more time focusing on their patients.
        </p>
      </section>

      <section className="about-section">
        <h2>How We Work</h2>

        <div className="about-cards">

          <div className="about-card">
            <h3>For Nutritionists</h3>
            <p>
              Manage patients, store health information, upload
              blood reports, create meal plans, assign supplements,
              and keep track of follow-ups.
            </p>
          </div>

          <div className="about-card">
            <h3>For Patients</h3>
            <p>
              Access meal plans, view assigned supplements,
              upload blood reports, and stay updated with
              information shared by their nutritionist.
            </p>
          </div>

        </div>
      </section>

      <section className="about-mission">
        <h2>Our Goal</h2>

        <p>
          Our goal is simple: make nutrition management organized,
          accessible, and easy to use.
        </p>
      </section>
      <Footer />
    </div>
  );
};

export default Aboutus;