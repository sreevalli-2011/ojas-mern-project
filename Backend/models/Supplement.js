const mongoose = require("mongoose");

const supplementSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        prescribedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        dosage: String,
        frequency: String,
        duration: String,
        notes: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Supplement", supplementSchema);
