import React, { useState, useEffect } from "react";
import { fetchAppraisals } from "../services/api";

const ManagerDashboard = () => {
  const [appraisals, setAppraisals] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadAppraisals = async () => {
      const response = await fetchAppraisals(token);
      setAppraisals(response.data);
    };
    loadAppraisals();
  }, [token]);

  return (
    <div className="container mt-5">
      <h2>Manager Dashboard</h2>

      {/* View Appraisals */}
      <div className="mt-4">
        <h3>My Appraisals & Team Appraisals</h3>
        {appraisals.length === 0 ? (
          <p>No appraisals available.</p>
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

export default ManagerDashboard;
