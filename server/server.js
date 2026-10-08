const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require("./models/Student");

require("dotenv").config();
const app = express();
app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

app.get("/", (req, res) => {
    res.send("Server is running!");
});

app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post("/students", async (req, res) => {
    const newStudent = new Student({
        name: req.body.name,
        course: req.body.course,
        age: req.body.age,
    });

    await newStudent.save();
    res.status(201).json(newStudent);
});

app.put("/students/:id", async (req, res) => {
    const studentId = req.params.id;
    const updatedStudent = await Student.findByIdAndUpdate(
        studentId,
        {
            name: req.body.name,
            course: req.body.course,
            age: req.body.age,
        },
        { new: true }
    );
    res.json(updatedStudent);
});

app.delete("/students/:id", async (req, res) => {
    const studentId = req.params.id;
    await Student.findByIdAndDelete(studentId);
    res.json({ message: "Student deleted successfully" });
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});