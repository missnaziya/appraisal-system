const Appraisal = require("../models/Appraisal");

exports.submitAppraisal = async (req, res) => {
  try {
    const { responses, submitted_for } = req.body;

    // Debugging: Log the user info to ensure `role`, `manager_id`, and `id` are present
    console.log("User info: ", req.user);
    console.log("responses, submitted_for ", responses, submitted_for);

    if (!submitted_for) {
      return res.status(400).json({ error: "submitted_for is required" });
    }

    const appraisals = responses.map((response) => ({
      ...response,
      submitted_by: req.user.id, // Ensure req.user contains `id`
      role: req.user.role, // Ensure req.user contains `role`
      manager_id: req.user.manager_id, // Ensure req.user contains `manager_id`
      submitted_for, // Ensure `submitted_for` is passed in the body
    }));

    await Appraisal.insertMany(appraisals);

    res.status(201).json({ message: "Appraisal submitted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

exports.getAppraisals = async (req, res) => {
  try {
    const { role, id } = req.user;

    let query = { submitted_by: id };
    if (role === "manager")
      query = { $or: [{ submitted_by: id }, { manager_id: id }] };
    if (role === "admin") query = {};
  
    const appraisals = await Appraisal.find(query).populate(
      "submitted_for submitted_by question"
    );
    console.log("Appraisals", appraisals);

    res.status(200).json(appraisals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
