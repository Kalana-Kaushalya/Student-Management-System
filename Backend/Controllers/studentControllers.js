const { StudentModel } = require("../Models/studentModel");
const asyncHandler = require("express-async-handler");



//******************************************* */
//@description     Register a user
//@route           POST /profiles/newProfile
//@access          --
//******************************************* */
const registerUser = async (req, res) => {
  try {
    // Extract student data from request body
    const { firstName, lastName, student_id, address, degree, intake, semester } = req.body;

    

    // Create a new student document
    const newStudent = new StudentModel({
      firstName,
      lastName,
      student_id,
      address,
      degree,
      intake,
      semester,
    });

    // Save the new student to the database
    await newStudent.save();

    // Send success response
    res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    // If there's an error, send an error response
    console.error('Error registering student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

//******************************************* */
//@description     fetch a profile
//@route           GET /profiles/thurunu2001
//@access          --
//******************************************* */
const fetchStudent = async (req, res) => {
  try {
    // Extract the student_id from the request parameters
    const { student_id } = req.params;

    // Find the student with the provided student_id
    const student = await StudentModel.findOne({ student_id });

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // If the student exists, send the student data in the response
    res.status(200).json(student);
  } catch (error) {
    // If there's an error, send an error response
    console.error('Error fetching student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllStudents = async (req, res) => {
  try {
    // Find all students
    const students = await StudentModel.find();

    // Send the array of students in the response
    res.status(200).json(students);
  } catch (error) {
    // If there's an error, send an error response
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const deleteStudent = async (req, res) => {
  try {
    // Extract the student_id from the request parameters
    const { student_id } = req.params;

    // Find and delete the student with the provided student_id
    const deletedStudent = await StudentModel.findOneAndDelete({ student_id });

    // Check if the student was found and deleted
    if (!deletedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // If the student was deleted successfully, send a success response
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    // If there's an error, send an error response
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const updateStudent = async (req, res) => {
  try {
    // Extract the student_id from the request parameters
    const { student_id } = req.params;

    // Extract the updated student data from the request body
    const { firstName, lastName, username, address, email, degree, intake, semester } = req.body;

    // Find and update the student with the provided student_id
    const updatedStudent = await StudentModel.findOneAndUpdate(
      { student_id },
      { firstName, lastName, username, address, email, degree, intake, semester },
      { new: true } // Return the updated document
    );

    // Check if the student exists
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // If the student is updated successfully, send the updated student data in the response
    res.status(200).json(updatedStudent);
  } catch (error) {
    // If there's an error, send an error response
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


module.exports = {
  registerUser,
  fetchStudent,
  getAllStudents,
  deleteStudent,
  updateStudent,

};
