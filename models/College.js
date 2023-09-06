// models/College.js
const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: String,
  description: String,
  website: String,
  accreditationStatus: String,
  programs: [
    {
      name: String,
      description: String,
      duration: String,
      tuitionFee: Number,
    },
  ],
  faculty: [
    {
      name: String,
      department: String,
      email: String,
    },
  ],
  admissionRequirements: [
    {
      title: String,
      description: String,
    },
  ],
});

module.exports = mongoose.model('College', collegeSchema);
