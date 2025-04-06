const express = require("express");
const crypto = require("crypto");
const FormLink = require("../models/formLinkScheema");
const authMiddleware = require("../middleware/authmiddleware");
const router = express.Router();
// Generate Form Link (Only for Logged-in Users)

// Generate Form Link (Only for Logged-in Users)
// router.post("/generate-link", authMiddleware, async (req, res) => {
//     try {
//       // Access the userId from req.user (set by the authMiddleware)
//       const userId = req.user.userId;
//       if (!userId) {
//         return res.status(400).json({ message: 'User ID is missing from token' });
//       }
//       // Generate a unique link ID
//       const linkId = crypto.randomBytes(16).toString('hex');
//       const expirationTime = 20 * 60 * 1000; // 10 minutes
//       const expiresAt = new Date(Date.now() + expirationTime);
//       // Store the generated link in the database with userId and expiration time
//       await FormLink.create({ userId, linkId, expiresAt });
//       const link = `https://intake-ten.vercel.app/shareform/${linkId}`;
//       res.json({ success: true, link });
//     } catch (error) {
//       console.error("Error generating form link:", error);
//       res.status(500).json({ message: "Server Error" });
//     }
//   });


// // Validate Form Link
// router.get("/validate-link/:linkId", async (req, res) => {
//   const { linkId } = req.params;
//   const formLink = await FormLink.findOne({ linkId });
//   if (!formLink || formLink.expiresAt < new Date()) {
//     return res.status(400).json({ success: false, message: "Link expired or invalid." });
//   }
//   res.json({ success: true, message: "Link is valid." });
// });


router.post("/generate-link", authMiddleware, async (req, res) => {
  try {
    // Access the userId from the authenticated user (set by the authMiddleware)
    const userId = req.user.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is missing from token' });
    }

    // Generate a unique link ID
    const linkId = crypto.randomBytes(16).toString('hex');
    const expirationTime = 60 * 60 * 1000; // Link expires in 20 minutes
    const expiresAt = new Date(Date.now() + expirationTime);

    // Store the generated link in the database with userId and expiration time
    await FormLink.create({ userId, linkId, expiresAt, isSubmitted: false });

    // Generate the link that can be shared
    const link = `https://intake-ten.vercel.app/shareform/${linkId}`;

    // const link = `http://localhost:3000/shareform/${linkId}`;


    // Return the generated link to the client
    res.json({ success: true, link });
  } catch (error) {
    console.error("Error generating form link:", error);
    res.status(500).json({ message: "Server Error" });
  }
});





router.get("/validate-link/:linkId", async (req, res) => {
  try {
    const { linkId } = req.params;

    // Find the form link by ID
    const formLink = await FormLink.findOne({ linkId });

    if (!formLink) {
      return res.status(404).json({ success: false, message: "Link not found" });
    }

    // Check if the form has already been submitted
    if (formLink.isSubmitted) {
      return res.status(400).json({ success: false, message: "Form already submitted" });
    }

    // Check if the link is expired
    if (new Date() > formLink.expiresAt) {
      return res.status(400).json({ success: false, message: "Link expired" });
    }

    // Everything is fine, link is valid
    res.json({ success: true, message: "Valid link" });
  } catch (error) {
    console.error("Error during link validation:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;