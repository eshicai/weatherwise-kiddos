const express = require('express');
const fs = require('fs');
const crypto = require('crypto');
const router = express.Router();

const JSON_FILE_PATH = './data/recommendations.json';

const getRecommendations = () => {
  const recommendationsJson = fs.readFileSync(JSON_FILE_PATH);
  return JSON.parse(recommendationsJson);
}

router
  .route('/')
  .get((_req, res) => {
    console.log('get recommendations...');
    const recommendations = getRecommendations();
    // console.log(recommendations);
    res.status(200).json(recommendations);
  })

module.exports = router;