
const mongoose = require('mongoose');
const FormLinkSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  linkId: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});
const FormLink = mongoose.model('FormLink', FormLinkSchema);
module.exports = FormLink;

