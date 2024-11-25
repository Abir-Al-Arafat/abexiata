const express = require("express");
const routes = express();
const uploadVideo = require("../config/uploadVideo");
const fs = require("fs");

// const ProductController = require("../controller/ProductController")
const {
  uploadVideoControllerStream,
  fullUploadController,
  uploadVideoController,
  getAllVideos,
} = require("../controller/UploadController");
// const { productValidator } = require("../middleware/validation")

// const createValidation = require("../middleware/validation");
// const createValidationPartial = require("../middleware/validationPartial");

// const { isAuthorized } = require("../middleware/authValidationJWT");

// routes.get("/getall", ProductController.getAllProducts);

// // requirement
// gets all data
// routes.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// // get one data
// routes.get("/:id", productValidator.delete, ProductController.getOne);

// // deletes
// routes.delete("/:id", isAuthorized, productValidator.delete, ProductController.delete);

// // add
// routes.post('/add',
// isAuthorized,
// productValidator.create,
// ProductController.add)

// partial update
// routes.patch('/:id', isAuthorized, productValidator.update, ProductController.update)

// Route for video upload
// routes.post('/upload', uploadVideo, (req, res) => {
//     if (!req.file) {
//       return res.status(400).send('No file uploaded.');
//     }

//     // File stream operation
//     const fileStream = fs.createReadStream(req.file.path);

//     fileStream.on('open', () => {
//       console.log('File stream opened successfully.');
//       res.status(200).send({
//         message: 'File uploaded and stream opened.',
//         filename: req.file.filename
//       });
//     });

//     fileStream.on('error', (err) => {
//       console.error('File stream error:', err);
//       res.status(500).send('Error processing the file.');
//     });
//   });
routes.post("/upload", uploadVideo, uploadVideoControllerStream);
routes.post("/upload/fullupload", uploadVideo, fullUploadController);

routes.get("/", getAllVideos);

// update
// routes.put('/:id', createValidation, ProductController.update)

module.exports = routes;
