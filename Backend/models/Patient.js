const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
    {
        // user is set when the patient has their own account (they signed
        // up themselves). It's optional because a nutritionist can also
        // add a patient's clinical record directly, before that patient
        // has created a login of their own.
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        // Used as a fallback display name/email when there's no linked
        // user account yet (i.e. the nutritionist added this patient
        // manually).
        fullName: String,
        email: String,
        nutritionist: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        age: Number,
        gender: String,
        phone: String,
        healthGoals: String,
        medicalHistory: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
