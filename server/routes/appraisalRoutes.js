const express = require('express');
const { submitAppraisal, getAppraisals } = require('../controllers/appraisalController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/submit', authMiddleware, submitAppraisal);
router.get('/', authMiddleware, getAppraisals);
// router.post('/submit', submitAppraisal);
// router.get('/', getAppraisals);

module.exports = router;
