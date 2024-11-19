import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewAppraisals() {
  const [appraisals, setAppraisals] = useState([]);

  useEffect(() => {
    const fetchAppraisals = async () => {
      try {
        const { data } = await axios.get('/api/admin/appraisals');
        setAppraisals(data);
      } catch (err) {
        alert('Failed to fetch appraisals.');
      }
    };

    fetchAppraisals();
  }, []);

  return (
    <div>
      <h4>View Appraisals</h4>
      {appraisals.map((appraisal, idx) => (
        <div key={idx} className="card mb-2">
          <div className="card-body">
            <h5>Participant: {appraisal.participant.name}</h5>
            <p>Evaluator: {appraisal.evaluator.name}</p>
            <ul>
              {appraisal.responses.map((response, i) => (
                <li key={i}>
                  <strong>{response.question.text}:</strong> {response.answer}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ViewAppraisals;
