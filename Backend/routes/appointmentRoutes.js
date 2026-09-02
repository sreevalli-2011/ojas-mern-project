const express = require("express");
const Appointment = require("../models/Appointment");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", protect, async (req, res) => {
    try {
        const filter =
            req.user.role === "nutritionist"
                ? { nutritionist: req.user.id }
                : {};
        const appointments = await Appointment.find(filter)
            .populate({
                path: "patient",
                populate: { path: "user", select: "fullName email" },
            })
            .populate("nutritionist", "fullName email");
        res.json(appointments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post("/", protect, async (req, res) => {
    try {
        const appointment = await Appointment.create({
            ...req.body,
            nutritionist: req.user.id,
        });
        res.status(201).json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", protect, async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(appointment);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try {
        await Appointment.findByIdAndDelete(req.params.id);
        res.json({ message: "Appointment deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
