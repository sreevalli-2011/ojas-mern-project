const mongoose = require("mongoose");

const bloodReportSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        reportDate: {
            type: Date,
            default: Date.now,
        },
        fileUrl: String,
        parameters: {
            type: Map,
            of: String,
        },
        reviewed: {
            type: Boolean,
            default: false,
        },
        reviewNotes: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("BloodReport", bloodReportSchema);
