const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const auth = require("../middleware/auth");

// All routes are protected with auth middleware
router.get("/", auth, profileController.getProfile);
router.put("/", auth, profileController.updateProfile);
router.delete("/", auth, profileController.deleteProfile);

module.exports = router; 