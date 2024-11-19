const express = require('express');
const { createQuestion, getQuestions } = require('../controllers/questionController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

// router.post('/create', authenticate, createQuestion);
// router.get('/', authenticate, getQuestions);

router.post('/create', createQuestion);
router.get('/', getQuestions);


module.exports = router;
