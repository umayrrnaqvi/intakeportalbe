const express = require("express");
const UserForm = require("../models/formScheema");
const FormLink = require("../models/formLinkScheema")
const app = express.Router();
// Route to submit form data
// app.post("/submitform", async (req, res) => {
//   try {
//     const formData = new UserForm(req.body);
//     await formData.save();
//     res.status(201).json({ message: "Form submitted successfully", data: formData });
//   } catch (error) {
//     res.status(400).json({ message: "Error submitting form", error: error.message });
//   }
// });

app.post("/submitform", async (req, res) => {
  try {
    const token = req.headers.authorization;

    // Optional: validate token here if needed
    const isLoggedIn = token && token !== "null";

    if (!isLoggedIn) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const formData = new UserForm(req.body);
    await formData.save();

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully (logged-in user)",
      isLoggedIn: true
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    res.status(500).json({ success: false, message: "Error submitting form", error: error.message });
  }
});





app.post("/submitform/:linkId", async (req, res) => {
  const { linkId } = req.params;

  try {
    // 1. Fetch the form link from the database using linkId
    const formLink = await FormLink.findOne({ linkId });

    // 2. Check if the form link exists
    if (!formLink) {
      return res.status(404).json({ success: false, message: "Invalid link" });
    }

    // 3. Check if the link has expired
    if (formLink.expiresAt < new Date()) {
      return res.status(400).json({ success: false, expired: true, message: "Link expired" });
    }

    // 4. Check if the form has already been submitted
    if (formLink.isSubmitted) {
      return res.status(400).json({ success: false, submitted: true, message: "Form already submitted" });
    }

    // 5. Save the form data
    const formData = new UserForm(req.body);
    await formData.save();

    // 6. Mark the form link as submitted
    formLink.isSubmitted = true;
    await formLink.save();

    // 7. Send response based on user login status
    const token = req.headers.authorization;
    const isLoggedIn = token && token !== "null";

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      isLoggedIn
    });

  } catch (error) {
    // Handle errors
    console.error("Error submitting form:", error);
    res.status(500).json({ success: false, message: "Error submitting form", error: error.message });
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