const express = require('express');
const Appraisal = require('../models/Appraisal');
const Question = require('../models/Question');
const router = express.Router();

// Fetch questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch questions', error });
  }
});

// Submit appraisal
router.post('/appraisals', async (req, res) => {
  const { participantId, evaluatorId, responses } = req.body;
  try {
    const appraisal = new Appraisal({
      participant: participantId,
      evaluator: evaluatorId,
      responses,
    });
    await appraisal.save();
    res.status(201).json({ message: 'Appraisal submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to submit appraisal', error });
  }
});

// View own appraisals
router.get('/appraisals/:evaluatorId', async (req, res) => {
  try {
    const appraisals = await Appraisal.find({ evaluator: req.params.evaluatorId }).populate('participant responses.question');
    res.json(appraisals);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch appraisals', error });
  }
});

module.exports = router;
