const csv = require("csv-parser");
const fs = require("fs");
const { Parser } = require("json2csv");
const { failure, success } = require("../utilities/common");

// Helper function to reformat CSV data
const reformatData = (data) => {
  return data.map((row) => ({
    numeric_column: isNaN(Number(row.numeric_column))
      ? null
      : Number(row.numeric_column),
    text_column: row.text_column.toString(),
    currency_column:
      parseFloat(row.currency_column.replace(/[^0-9.-]+/g, "")) || null,
  }));
};

// Endpoint to handle CSV upload and reformatting
const uploadCsv = async (req, res) => {
  const results = [];
  const filePath = req.file.path;

  // Read and parse the uploaded CSV
  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      // Reformat the parsed CSV data
      const reformattedData = reformatData(results);

      // Convert reformatted data back to CSV
      const fields = ["numeric_column", "text_column", "currency_column"];
      const json2csvParser = new Parser({ fields });
      const csv = json2csvParser.parse(reformattedData);

      // Delete the temporary uploaded file
      fs.unlinkSync(filePath);

      // Send the reformatted CSV as a downloadable response
      res.header("Content-Type", "text/csv");
      res.attachment("reformatted_data.csv");
      res.send(csv);
      console.log(csv);
    });
};

module.exports = {
  uploadCsv,
};
