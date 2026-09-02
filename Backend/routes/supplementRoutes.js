const express = require("express");
const Supplement = require("../models/Supplement");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/patient/:patientId", protect, async (req, res) => {
    try {
        const supplements = await Supplement.find({ patient: req.params.patientId });
        res.json(supplements);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post("/", protect, async (req, res) => {
    try {
        const supplement = await Supplement.create({
            ...req.body,
            prescribedBy: req.user.id,
        });
        res.status(201).json(supplement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", protect, async (req, res) => {
    try {
        const supplement = await Supplement.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(supplement);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try {
        await Supplement.findByIdAndDelete(req.params.id);
        res.json({ message: "Supplement deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
