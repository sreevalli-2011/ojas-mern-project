const multer = require("multer");
const path = require("path");

// Files are stored locally in /uploads and served statically by server.js.
// For production this would ideally point at cloud storage (S3, etc.)
// instead, but local disk storage is enough to make uploads actually work
// for development.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

module.exports = upload;
