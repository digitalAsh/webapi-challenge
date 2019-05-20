const express = require('express');

const Projects = require('./projectModel.js');

const router = express.Router();

router.use((req, res, next) => {
    console.log('Hubs Router, whoo!')
    next();
  })

module.exports = router;