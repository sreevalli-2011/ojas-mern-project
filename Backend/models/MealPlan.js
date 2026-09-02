const mongoose = require("mongoose");

const mealPlanSchema = new mongoose.Schema(
    {
        patient: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient",
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        meals: [
            {
                day: String,
                breakfast: String,
                lunch: String,
                dinner: String,
                snacks: String,
            },
        ],
        notes: String,
        pdfUrl: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model("MealPlan", mealPlanSchema);
