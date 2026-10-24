
const express = require("express");
const router = express.Router();

const authRoute = require("./api/authRoute.js");
const dashboardRoute = require("./api/dashboardRoute.js");

router.use("/auth", authRoute);
router.use("/dashboard", dashboardRoute);

module.exports = router;
