const express = require('express');
const router = express.Router();
const authLayer = require('../middlewares/authlayer');

router.use('/convert', require('../components/convert/convert.route'));

module.exports = router;