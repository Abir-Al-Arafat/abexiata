const Professional = require("../model/professional.model");

const searchProfessionals = async (req, res) => {
  const { input } = req.body;
  if (!input || typeof input !== "string") {
    return res.status(400).json({ message: "Invalid or missing input string" });
  }
  const keywords = input.toLowerCase().split(" ");
  const query = {};

  // Map keywords to database fields
  if (keywords.includes("doctor") || keywords.includes("doc")) {
    query.type = "Practitioner";
  }
  if (keywords.includes("hospital") || keywords.includes("hospetal")) {
    query.type = "Organization";
  }

  if (keywords.includes("uttara") || keywords.includes("uttora")) {
    query.zone = ["Uttara", "Dhaka"];
  }

  if (
    keywords.includes("banani") ||
    keywords.includes("bonani") ||
    keywords.includes("bonane")
  ) {
    query.zone = ["Banani", "Dhaka"];
  }

  if (
    keywords.includes("dhanmondi") ||
    keywords.includes("dhanmonde") ||
    keywords.includes("danmondi") ||
    keywords.includes("danmonde")
  ) {
    query.zone = ["Dhanmondi", "Dhaka"];
  }

  if (
    keywords.includes("gulshan") ||
    keywords.includes("gulsan") ||
    keywords.includes("gulsun") ||
    keywords.includes("gulshun") ||
    keywords.includes("golshan") ||
    keywords.includes("golsan")
  ) {
    query.zone = ["Gulshan", "Dhaka"];
  }
  if (
    keywords.includes("mirpur") ||
    keywords.includes("mirpor") ||
    keywords.includes("mirpour") ||
    keywords.includes("merpor") ||
    keywords.includes("merpur")
  ) {
    query.zone = ["Mirpur", "Dhaka"];
  }
  if (
    keywords.includes("mohammadpur") ||
    keywords.includes("mohammedpur") ||
    keywords.includes("muhammadpur") ||
    keywords.includes("muhammedpur")
  ) {
    query.zone = ["Mohammadpur", "Dhaka"];
  }
  if (keywords.includes("baridhara")) {
    query.zone = ["Baridhara", "Dhaka"];
  }
  if (
    keywords.includes("bashundhara") ||
    keywords.includes("bashundara") ||
    keywords.includes("bashundhar") ||
    keywords.includes("bashundharah") ||
    keywords.includes("bashundhora") ||
    keywords.includes("bashundharah") ||
    keywords.includes("bashundharaa") ||
    keywords.includes("bashundharaah") ||
    keywords.includes("boshundhora") ||
    keywords.includes("boshundharah") ||
    keywords.includes("boshundharaa") ||
    keywords.includes("boshundhora")
  ) {
    query.zone = ["Bashundhara", "Dhaka"];
  }

  const results = await Professional.find(query).sort({ rating: -1 }).limit(5);
  if (!results.length) {
    return res
      .status(404)
      .json({ message: "No professionals found matching the criteria" });
  }
  res.json(results);
};

const getAllProfessionals = async (req, res) => {
  const professionals = await Professional.find();
  console.log(professionals);
  res.json(professionals);
};

module.exports = {
  searchProfessionals,
  getAllProfessionals,
};
