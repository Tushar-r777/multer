const express = require("express");
const router = express.Router();
const { protect, requiredAdmin} = require("../../middleware/authMiddleware");
const taskController = require("../../controllers/taskController")

router.use(protect)
router.post("/create",requiredAdmin, taskController.taskCreate);
router.get("/alltask",requiredAdmin, taskController.getTask);

module.exports = router