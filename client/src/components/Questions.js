import React, { useState } from 'react';
import axios from 'axios';

function AddQuestions() {
  const [question, setQuestion] = useState('');

  const handleAddQuestion = async () => {
    try {
      await axios.post('/api/admin/questions', { text: question });
      alert('Question added successfully!');
      setQuestion('');
    } catch (err) {
      alert('Failed to add question.');
    }
  };

  return (
    <div>
      <h4>Add Questions</h4>
      <input
        type="text"
        className="form-control"
        placeholder="Enter Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button className="btn btn-primary mt-3" onClick={handleAddQuestion}>
        Add Question
      </button>
    </div>
  );
}

export default AddQuestions;
