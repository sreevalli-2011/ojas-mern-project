const express = require("express");
const BloodReport = require("../models/BloodReport");
const { protect } = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();

router.get("/patient/:patientId", protect, async (req, res) => {
    try {
        const reports = await BloodReport.find({ patient: req.params.patientId });
        res.json(reports);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post("/", protect, upload.single("file"), async (req, res) => {
    try {
        const reportData = {
            patient: req.body.patient,
            reportDate: req.body.reportDate || undefined,
            reviewNotes: req.body.reviewNotes,
        };
        if (req.file) {
            reportData.fileUrl = `/uploads/${req.file.filename}`;
        }
        const report = await BloodReport.create(reportData);
        res.status(201).json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.put("/:id", protect, async (req, res) => {
    try {
        const report = await BloodReport.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
