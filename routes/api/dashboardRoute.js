const express = require("express");
const router = express.Router();
const { protect, requiredAdmin} = require("../../middleware/authMiddleware");
const dashboardController = require("../../controllers/dashboardController")

router.use(protect)
router.get("/allusers",requiredAdmin, dashboardController.getAllUserController);

module.exports = router