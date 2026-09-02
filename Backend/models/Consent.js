const mongoose = require("mongoose");

const consentSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        answers: {
            type: Map,
            of: String,
        },
        signedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Consent", consentSchema);
