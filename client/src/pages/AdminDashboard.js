import React, { useState, useEffect } from "react";
import { fetchQuestions, createQuestion, fetchAppraisals } from "../services/api";

const AdminDashboard = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [appraisals, setAppraisals] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadData = async () => {
      const questionsResponse = await fetchQuestions();
      setQuestions(questionsResponse.data);

      const appraisalsResponse = await fetchAppraisals(token);
      setAppraisals(appraisalsResponse.data);
    };
    loadData();
  }, [token]);

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    try {
      await createQuestion({ text: newQuestion }, token);
      setNewQuestion("");
      const updatedQuestions = await fetchQuestions();
      setQuestions(updatedQuestions.data);
      alert("Question added successfully!");
    } catch (error) {
      alert("Failed to add question: " + error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {/* Add Questions */}
      <div className="mt-4">
        <h3>Create Appraisal Questions</h3>
        <form onSubmit={handleAddQuestion}>
          <div className="mb-3">
            <label>Question Text</label>
            <input
              type="text"
              className="form-control"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Question
          </button>
        </form>
      </div>

      {/* View Appraisals */}
      <div className="mt-5">
        <h3>All Appraisals</h3>
        {appraisals.length === 0 ? (
          <p>No appraisals submitted yet.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Submitted By</th>
                <th>Submitted For</th>
                <th>Responses</th>
              </tr>
            </thead>
            <tbody>
              {appraisals.map((appraisal, index) => (
                <tr key={index}>
                  <td>{appraisal.submitted_by}</td>
                  <td>{appraisal.submitted_for}</td>
                  <td>
                    {appraisal.responses.map((response, i) => (
                      <p key={i}>
                        <strong>{response.question.text}:</strong> {response.response}
                      </p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
