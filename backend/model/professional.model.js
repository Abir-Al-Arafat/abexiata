const mongoose = require("mongoose");
const ProfessionalSchema = new mongoose.Schema({
  type: String,
  orgOrPracId: String,
  username: String,
  name: String,
  ranking: Number,
  photo: String,
  category: String,
  subCategory: [String],
  rating: Number,
  totalAppointment: Number,
  zone: [String],
  branch: [String],
  areaOfPractice: String,
});

module.exports = mongoose.model("Professional", ProfessionalSchema);
