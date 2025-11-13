import express from "express";
import Student from "../models/studentModel.js";

const router = express.Router();

// ✅ Create student
router.post("/", async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

// ✅ Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

export default router;
