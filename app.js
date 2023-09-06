const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const College = require("./models/College");

const app = express();
require("dotenv").config();

app.use(bodyParser.json());

// Create a new college
app.post("/api/colleges", async (req, res) => {
  try {
    const college = await College.create(req.body);
    res.json(college);
  } catch (error) {
    res.status(400).json({ error: "Invalid data" });
  }
});

// Add this route to your Express app
app.get('/api/colleges', async (req, res) => {
  try {
    const colleges = await College.find(); // Use the Mongoose model to fetch all colleges
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});


// Read college by ID
app.get("/api/colleges/:id", async (req, res) => {
  const collegeId = req.params.id;
  try {
    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update college by ID
app.put("/api/colleges/:id", async (req, res) => {
  const collegeId = req.params.id;
  try {
    const college = await College.findById(collegeId);
    if (!college) {
      return res.status(404).json({ error: "College not found" });
    }
    res.json(college);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete college by ID
app.delete('/api/colleges/:id', async (req, res) => {
  const collegeId = req.params.id;
  try {
    const deletedCollege = await College.findByIdAndRemove(collegeId);
    if (!deletedCollege) {
      return res.status(404).json({ error: 'College not found' });
    }
    res.json({ message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
