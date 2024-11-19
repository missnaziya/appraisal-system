const Question = require('../models/Question');

exports.createQuestion = async (req, res) => {
  try {
    const { text } = req.body;

    const question = new Question({ text, createdBy: req.user.id });
    await question.save();

    res.status(201).json({ message: 'Question created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestions = async (req, res) => {
  console.log("hello naziya");
  
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
