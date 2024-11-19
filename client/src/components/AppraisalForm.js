// import React, { useState, useEffect } from "react";
// import { fetchQuestions, submitAppraisal } from "../services/api";

// const AppraisalForm = ({ submittedFor }) => {
//   const [questions, setQuestions] = useState([]);
//   const [responses, setResponses] = useState({});
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const loadQuestions = async () => {
//       const { data } = await fetchQuestions();
//       setQuestions(data);
//     };
//     loadQuestions();
//   }, []);

//   const handleChange = (e, questionId) => {
//     setResponses({ ...responses, [questionId]: e.target.value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   try {
//   //     const data = Object.keys(responses).map((questionId) => ({
//   //       question: questionId,
//   //       response: responses[questionId],
//   //     }));
//   //     await submitAppraisal({ responses: data, submitted_for: submittedFor }, token);
//   //     alert("Appraisal submitted successfully!");
//   //   } catch (error) {
//   //     alert("Failed to submit appraisal: " + error.response.data.message);
//   //   }
//   // };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const data = Object.keys(responses).map((questionId) => ({
//         question: questionId,
//         response: responses[questionId],
//       }));
  
//       // Correctly passing `submitted_for` (ensure this is valid and set)
//       const submittedFor = "1234567890abcdef"; // Replace with actual user ID
  
//       await submitAppraisal({ responses: data, submitted_for: submittedFor }, token);
//       alert("Appraisal submitted successfully!");
//     } catch (error) {
//       alert("Failed to submit appraisal: " + error.response.data.message);
//     }
//   };
  
  
//   return (
//     <div className="container mt-5">
//       <h2>Appraisal Form</h2>
//       <form onSubmit={handleSubmit}>
//         {questions.map((q) => (
//           <div className="mb-3" key={q._id}>
//             <label>{q.text}</label>
//             <textarea
//               className="form-control"
//               onChange={(e) => handleChange(e, q._id)}
//             ></textarea>
//           </div>
//         ))}
//         <button className="btn btn-primary" type="submit">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AppraisalForm;


import React, { useState, useEffect } from "react";
import { fetchQuestions, submitAppraisal, fetchUsers } from "../services/api"; // Import fetchUsers API call

const AppraisalForm = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [users, setUsers] = useState([]); // State for storing users
  const [submittedFor, setSubmittedFor] = useState(""); // State for the selected user
  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadQuestions = async () => {
      const { data } = await fetchQuestions();
      setQuestions(data);
    };

    const loadUsers = async () => {
      const { data } = await fetchUsers(); // Fetch the list of users
      setUsers(data);
    };

    loadQuestions();
    loadUsers();
  }, []);

  const handleChange = (e, questionId) => {
    setResponses({ ...responses, [questionId]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = Object.keys(responses).map((questionId) => ({
        question: questionId,
        response: responses[questionId],
      }));

      // Pass the selected user as `submitted_for`
      await submitAppraisal({ responses: data, submitted_for: submittedFor }, token);
      alert("Appraisal submitted successfully!");
    } catch (error) {
      alert("Failed to submit appraisal: " + error.response.data.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Appraisal Form</h2>
      <form onSubmit={handleSubmit}>
        {/* Submitted For Dropdown */}
        <div className="mb-3">
          <label htmlFor="submittedFor">Submitted For</label>
          <select
            id="submittedFor"
            className="form-control"
            value={submittedFor}
            onChange={(e) => setSubmittedFor(e.target.value)} // Set the selected user
            required
          >
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name} {/* Assuming 'name' is the field for displaying user's name */}
              </option>
            ))}
          </select>
        </div>

        {/* Render the questions */}
        {questions.map((q) => (
          <div className="mb-3" key={q._id}>
            <label>{q.text}</label>
            <textarea
              className="form-control"
              onChange={(e) => handleChange(e, q._id)}
            ></textarea>
          </div>
        ))}

        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AppraisalForm;
