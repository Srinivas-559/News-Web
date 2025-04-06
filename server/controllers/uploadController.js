const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const multer = require("multer");
require("dotenv").config();

// AWS S3 Configuration
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Multer Configuration (Store in Memory)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Upload Image Function
const uploadImage = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const fileKey = `uploads/${Date.now()}-${req.file.originalname}`;

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype
    };

    await s3.send(new PutObjectCommand(params));

    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    res.json({ imageUrl });
  } catch (error) {
    console.error("S3 Upload Error:", error);
    res.status(500).json({ message: "Failed to upload image" });
  }
};

module.exports = { upload, uploadImage };
