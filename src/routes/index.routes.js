const express = require('express');
const router = express.Router();

router.use('/correo', require('./envioPDF.routes'));

module.exports = router;
