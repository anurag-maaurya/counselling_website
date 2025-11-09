import express from "express";
import Student from "../models/studentModel.js";

const router = express.Router();

// ➕ Add new student
router.post("/", async (req, res) => {
  try {
    const { name, mobile, counselingType } = req.body;

    if (!name || !mobile || !counselingType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const student = await Student.create({ name, mobile, counselingType });
    res.status(201).json(student);
  } catch (err) {
    console.error("Error adding student:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// 📄 Get all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
