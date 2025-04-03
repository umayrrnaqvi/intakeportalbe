const express = require("express");
const crypto = require("crypto");
const FormLink = require("../models/formLinkScheema");
const authMiddleware = require("../middleware/authmiddleware");
const router = express.Router();
// Generate Form Link (Only for Logged-in Users)

// Generate Form Link (Only for Logged-in Users)
router.post("/generate-link", authMiddleware, async (req, res) => {
    try {
      // Access the userId from req.user (set by the authMiddleware)
      const userId = req.user.userId;
      if (!userId) {
        return res.status(400).json({ message: 'User ID is missing from token' });
      }
      // Generate a unique link ID
      const linkId = crypto.randomBytes(16).toString('hex');
      const expirationTime = 1 * 60 * 1000; // 10 minutes
      const expiresAt = new Date(Date.now() + expirationTime);
      // Store the generated link in the database with userId and expiration time
      await FormLink.create({ userId, linkId, expiresAt });
      const link = `https://intake-ten.vercel.app/shareform/${linkId}`;
      res.json({ success: true, link });
    } catch (error) {
      console.error("Error generating form link:", error);
      res.status(500).json({ message: "Server Error" });
    }
  });
  

// Validate Form Link
router.get("/validate-link/:linkId", async (req, res) => {
  const { linkId } = req.params;
  const formLink = await FormLink.findOne({ linkId });
  if (!formLink || formLink.expiresAt < new Date()) {
    return res.status(400).json({ success: false, message: "Link expired or invalid." });
  }
  res.json({ success: true, message: "Link is valid." });
});
module.exports = router;