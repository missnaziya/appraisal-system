// In routes/userRoutes.js
const express = require("express");
const { getManagers } = require("../controllers/userController");
const { getEmployee } = require("../controllers/userController");
const router = express.Router();

router.get("/managers", getManagers); // Fetch all managers
router.get("/employee", getEmployee); // Fetch all managers

module.exports = router;
