import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, fetchManagers } from "../services/api";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee",
    manager_id: "",
  });
  const [managers, setManagers] = useState([]);
  const navigate = useNavigate();

  // Fetch the list of managers when the component loads
  useEffect(() => {
    const loadManagers = async () => {
      try {
        const response = await fetchManagers(); // Fetch from backend
        setManagers(response.data); // Assuming response.data contains an array of managers
      } catch (error) {
        console.error("Error fetching managers:", error);
      }
    };
    loadManagers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "manager_id" && value === "self") {
      // If "Self" is selected, set role to "manager"
      setForm({ ...form, manager_id: "", role: "manager" });
    } else {
      // Update other fields
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form); // Call API to register user
      alert("Registration successful!");
      navigate("/login"); // Redirect to login
    } catch (error) {
      alert("Registration failed: " + (error.response?.data?.error || error.message));
    }
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Role</label>
          <select
            className="form-control"
            name="role"
            value={form.role}
            onChange={handleChange}
            disabled={form.manager_id === "self"} // Disable role selection if "Self" is selected
          >
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
          <label>Manager</label>
          <select
            className="form-control"
            name="manager_id"
            value={form.manager_id}
            onChange={handleChange}
          >
            <option value="">Select Manager</option>
            <option value="self">Self (Become Manager)</option>
            {managers.map((manager) => (
              <option key={manager._id} value={manager._id}>
                {manager.name} (ID: {manager._id})
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
