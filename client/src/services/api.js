// import axios from "axios";

// const api = axios.create({
//   baseURL: "http://localhost:5000/api",
//   // baseURL: process.env.REACT_APP_BASE_URL,
// });

// export const registerUser = (data) => api.post("/auth/register", data);
// export const loginUser = (data) => api.post("/auth/login", data);
// export const fetchQuestions = () => api.get("/questions/");
// export const createQuestion = (data, token) =>
//   api.post("/questions/create", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// export const submitAppraisal = (data, token) =>
//   api.post("/appraisals/submit", data, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
// export const fetchAppraisals = (token) =>
//   api.get("/appraisals/", {
//     headers: { Authorization: `Bearer ${token}` },
//   });

//   // Fetch managers
// export const fetchManagers = () => {
//   return api.get("/users/managers");
// };



// export default api;


import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  // baseURL: process.env.REACT_APP_BASE_URL,
});

// Add an interceptor to add the token to the headers for every request
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage (or other storage)
    const token = localStorage.getItem("token");
    if (token) {
      // If the token exists, add it to the Authorization header
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const registerUser = (data) => api.post("/auth/register", data);
export const loginUser = (data) => api.post("/auth/login", data);
export const fetchQuestions = () => api.get("/questions/");
export const createQuestion = (data) => api.post("/questions/create", data);
export const submitAppraisal = (data) => api.post("/appraisals/submit", data);
export const fetchAppraisals = () => api.get("/appraisals/");
export const fetchManagers = () => api.get("/users/managers");
export const fetchUsers = () => api.get("/users/employee");


export default api;
