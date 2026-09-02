const express = require("express");
const Consent = require("../models/Consent");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/:patientId", protect, async (req, res) => {
    try {
        const consent = await Consent.findOne({ patient: req.params.patientId });
        res.json(consent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post("/", protect, async (req, res) => {
    try {
        const consent = await Consent.create(req.body);
        res.status(201).json(consent);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
