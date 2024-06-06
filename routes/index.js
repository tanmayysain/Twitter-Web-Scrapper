const express = require('express');
const { login } = require('../Controllers/Scrape');
const router = express.Router();

router.get('/scrape', login);
  
module.exports = router;