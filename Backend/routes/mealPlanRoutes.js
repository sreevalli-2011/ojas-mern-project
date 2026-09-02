const express = require("express");
const MealPlan = require("../models/MealPlan");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/patient/:patientId", protect, async (req, res) => {
    try {
        const plans = await MealPlan.find({ patient: req.params.patientId });
        res.json(plans);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post("/", protect, upload.single("file"), async (req, res) => {
    try {
        const planData = {
            patient: req.body.patient,
            title: req.body.title,
            createdBy: req.user.id,
            notes: req.body.notes,
        };
        if (req.body.meals) {
            planData.meals = JSON.parse(req.body.meals);
        }
        if (req.file) {
            planData.pdfUrl = `/uploads/${req.file.filename}`;
        }
        const plan = await MealPlan.create(planData);
        res.status(201).json(plan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", protect, async (req, res) => {
    try {
        const plan = await MealPlan.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(plan);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try {
        await MealPlan.findByIdAndDelete(req.params.id);
        res.json({ message: "Meal plan deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
