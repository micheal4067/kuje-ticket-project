const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.array("images"), (req, res) => {
    const files = req.files.map((file) => ({
        originalName: file.originalname,
        filePath: file.path,
    }));
    res.json({ success: true, files });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
