const { number } = require("joi");
const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  
  //meka hadaganna
  student_id: {
    type: String,
    required: true,
    unique: true,
  },
  address: String,
  
  degree: String,
  intake: Number,
  semester: Number,
});

const StudentModel = mongoose.model("student", StudentSchema);

module.exports = { StudentModel };
