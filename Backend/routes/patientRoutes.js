const express = require("express");
const Patient = require("../models/Patient");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/patients
// @desc    Get all patients (for a nutritionist) or own profile (for a patient)
router.get("/", protect, async (req, res) => {
    try {
        const filter =
            req.user.role === "nutritionist"
                ? { nutritionist: req.user.id }
                : { user: req.user.id };

        const patients = await Patient.find(filter).populate("user", "fullName email");
        res.json(patients);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/patients/:id
router.get("/:id", protect, async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id).populate(
            "user",
            "fullName email"
        );
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// @route   POST /api/patients
// @desc    Create a patient profile. A patient creates their own profile
//          (user = themselves). A nutritionist can also add a patient's
//          clinical record directly, before that patient has an account
//          (nutritionist = themselves, fullName/email stored directly).
router.post("/", protect, async (req, res) => {
    try {
        const patientData = { ...req.body };

        if (req.user.role === "patient") {
            patientData.user = req.user.id;
        } else if (req.user.role === "nutritionist") {
            patientData.nutritionist = req.user.id;
        }

        const patient = await Patient.create(patientData);
        res.status(201).json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/patients/:id
router.put("/:id", protect, async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!patient) return res.status(404).json({ message: "Patient not found" });
        res.json(patient);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// @route   DELETE /api/patients/:id
router.delete("/:id", protect, async (req, res) => {
    try {
        await Patient.findByIdAndDelete(req.params.id);
        res.json({ message: "Patient deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
