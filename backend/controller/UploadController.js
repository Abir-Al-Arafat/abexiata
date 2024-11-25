const fs = require("fs");
const path = require("path");
const Video = require("../model/Video");

// Upload function for handling video file upload and streaming
const uploadVideoControllerStream = (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Define the destination path
  const destinationDir = path.join(__dirname, "..", "uploads/videos");

  // Ensure the directory exists
  if (!fs.existsSync(destinationDir)) {
    fs.mkdirSync(destinationDir, { recursive: true });
  }

  const destinationPath = path.join(destinationDir, req.file.filename);

  // Create a writable stream for the destination
  const writeStream = fs.createWriteStream(destinationPath);

  // Read the uploaded file in chunks using a readable stream
  const readStream = fs.createReadStream(req.file.path);

  // Pipe the read stream to the write stream
  readStream.pipe(writeStream);

  // Handle the 'finish' event when the writing process is completed
  writeStream.on("finish", () => {
    console.log("File uploaded and saved in chunks successfully.");
    console.log("Video metadata saved to database.");
    saveVideoPath(req.file.filename, req.body.title, req.body.description)
      .then(() => {
        res.status(200).send({
          message: "File uploaded and saved in chunks successfully.",
          filename: req.file.filename,
        });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error saving video metadata.",
          error: err,
        });
      });
  });
  writeStream.on("error", (err) => {
    console.error("Error writing video file:", err);
    res.status(500).send({
      message: "Error writing video file.",
      error: err,
    });
  });
};
// Full video upload controller (no streaming, upload at once)
const fullUploadController = (req, res) => {
  console.log("fullUploadController file", req.file);
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Since multer already handled the file upload to the destination folder, you can directly send the response
  res.status(200).send({
    message: "File uploaded successfully.",
    filename: req.file.filename,
  });
};

// Inside your upload function after saving the video to the server
const saveVideoPath = async (filename, title, description) => {
  try {
    const video = new Video({
      title: title || "Untitled", // Optionally use a title from frontend
      description: description || "",
      videoPath: `/uploads/videos/${filename}`, // Assuming this is the upload folder structure
    });
    await video.save();
    console.log("Video metadata saved to database.");
  } catch (error) {
    console.error("Error saving video metadata:", error);
  }
};

// Example use in a controller
const uploadVideoController = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  // Save video path in the database
  try {
    await saveVideoPath(
      req.file.filename,
      req.body.title,
      req.body.description
    );
    res.status(200).send({
      message: "File uploaded successfully!",
      filename: req.file.filename,
    });
  } catch (error) {
    res.status(500).send("Error uploading and saving video.");
  }
};

const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all videos
    res.status(200).json(videos);
  } catch (error) {
    res.status(500).send("Error fetching videos");
  }
};

// Export the upload function for use in your routes
module.exports = {
  uploadVideoControllerStream,
  fullUploadController,
  uploadVideoController,
  getAllVideos,
};
