const express = require("express");
const multer = require("multer");
const imageController = require("../controllers/imageController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(authMiddleware);

router.post("/upload", upload.single("image"), imageController.uploadImage);
router.delete("/:fileName", imageController.deleteImage);

module.exports = router;
