// backend/routes/uploadRoute.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary-config');
const fs = require('fs');

const upload = multer({ dest: 'temp/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = req.file.path;

    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'products',
    });

    fs.unlinkSync(filePath);

    res.status(200).json({ url: result.secure_url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
