import React from "react";
import "./Features.css";
import features from "../../../utility/FeaturesData";
import Footer from "../Footer/Footer";

const Features = () => {
    return (
        <div className="features_page">

            <h1 className="features_title">Our Features</h1>

            <p className="features_para">
                Discover the tools that make OJAS a simple and efficient platform
                for nutritionists and patients.
            </p>

            {features.map((item, index) => (

                <div className="feature_card" key={index}>

                    <h2>{item.title}</h2>

                    <p>{item.description}</p>

                </div>

            ))}
        <Footer />
        </div>
    );
};

export default Features;