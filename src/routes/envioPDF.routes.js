const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/multer');
const { enviarPDF } = require('../helpers/nodemailer');

router.post('/email', upload.single('pdf'), enviarPDF);

module.exports = router;
