const express = require("express");
const router = express.Router();
const {
  searchProfessionals,
  getAllProfessionals,
} = require("../controller/professional.controller");

router.post("/professional/search", searchProfessionals);
router.get("/professional/getAllProfessionals", getAllProfessionals);

module.exports = router;
