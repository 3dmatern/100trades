const express = require("express");
const imageController = require("../controllers/imageController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

const router = express.Router();

router.use(authMiddleware);

router.post("/upload", imageController.uploadImage);
router.delete("/:fileName", imageController.deleteImage);

module.exports = router;
