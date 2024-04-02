const express = require("express");

const {
  fetchStudent,
  registerUser,
  getAllStudents,
  deleteStudent,
  updateStudent,

} = require("../Controllers/studentControllers");

const router = express.Router();

// Get all students
router.route("/").get(getAllStudents);

// Get a student by ID
router.route("/:student_id").get(fetchStudent);

// Register a new student
router.route("/").post(registerUser);

// Delete a student by ID
router.route("/:student_id").delete(deleteStudent);

// Update a student by ID
router.route("/:student_id").patch(updateStudent);


module.exports = router;
