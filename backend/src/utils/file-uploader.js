const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadPath = path.join(__dirname, "../../public/uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const fileFilter = (req, file, cb) => {
  // Allow images for product image and certificates
  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
  // Allow PDFs for certificates
  const allowedDocTypes = ["application/pdf"];

  const allAllowedTypes = [...allowedImageTypes, ...allowedDocTypes];

  if (allAllowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only jpg, png, webp, and pdf are allowed."),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

// Configuration for multiple files
const uploadFields = upload.fields([
  { name: "file", maxCount: 1 }, // Main product image
  { name: "certificate", maxCount: 1 }, // Certificate file
  { name: "hplc", maxCount: 1 }, // HPLC file
  { name: "massSpectrometry", maxCount: 1 }, // Mass Spectrometry file
]);

module.exports = { upload, uploadFields };

/* 
// -- AWS S3 Upload --
const multer = require("multer");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
  const allowedDocTypes = ["application/pdf"];
  const allAllowedTypes = [...allowedImageTypes, ...allowedDocTypes];

  if (allAllowedTypes.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Invalid file type. Only jpg, png, webp, and pdf are allowed."), false);
};

async function uploadToS3(fileBuffer, fileName, mimetype, folder = "uploads") {
  const s3Key = `${folder}/${uuidv4()}${path.extname(fileName)}`;

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: s3Key,
    Body: fileBuffer,
    ContentType: mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${s3Key}`;
}

const upload = multer({ storage, fileFilter });

const uploadFields = upload.fields([
  { name: "file", maxCount: 1 },
  { name: "certificate", maxCount: 1 },
  { name: "hplc", maxCount: 1 },
  { name: "massSpectrometry", maxCount: 1 },
]);

module.exports = { upload, uploadFields, uploadToS3 };
*/