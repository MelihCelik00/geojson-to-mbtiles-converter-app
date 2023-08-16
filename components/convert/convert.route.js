const express = require('express');
const router = express.Router();
const convertController = require('./convert.controller');
const convertSchema = require('./convert.schema');
const multer = require('multer');
const path = require('path');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('geojsonFile'), convertController.convert);

module.exports = router;