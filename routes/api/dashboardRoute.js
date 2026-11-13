const express = require("express");
const router = express.Router();
const { protect, requiredAdmin} = require("../../middleware/authMiddleware");
const dashboardController = require("../../controllers/dashboardController")

router.use(protect)
router.get("/allusers",requiredAdmin, dashboardController.getAllUserController);
router.get("/approved-users",requiredAdmin, dashboardController.approvedUserController);
router.get("/deactive-users",requiredAdmin, dashboardController.deactiveUserController);
router.get("/delete-users",requiredAdmin, dashboardController.UserDeleteController);

module.exports = router