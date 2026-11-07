require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/patients", require("./routes/patientRoutes"));
app.use("/api/consent", require("./routes/consentRoutes"));
app.use("/api/mealplans", require("./routes/mealPlanRoutes"));
app.use("/api/supplements", require("./routes/supplementRoutes"));
app.use("/api/bloodreports", require("./routes/bloodReportRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));

app.get("/", (req, res) => {
    res.send("OJAS API is running");
});

const PORT = process.env.PORT || 3000;

const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();
