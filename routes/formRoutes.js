const express = require("express");
const UserForm = require("../models/formScheema");
const app = express.Router();
// Route to submit form data
app.post("/submitform", async (req, res) => {
  try {
    const formData = new UserForm(req.body);
    await formData.save();
    res.status(201).json({ message: "Form submitted successfully", data: formData });
  } catch (error) {
    res.status(400).json({ message: "Error submitting form", error: error.message });
  }
});
// Route to get all form data
app.get("/getformdata", async (req, res) => {
  try {
    const forms = await UserForm.find();
    res.status(200).json(forms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching forms", error: error.message });
  }
});



// Route to get form data by specific id
app.get("/getformdata/:id", async (req, res) => {
  const { id } = req.params; 
  try {
    const form = await UserForm.findById(id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (error) {
    res.status(500).json({ message: "Error fetching form by id", error: error.message });
  }
});
module.exports = app;