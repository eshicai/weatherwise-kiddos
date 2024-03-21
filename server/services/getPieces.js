
const fs = require('fs');
const JSON_FILE_PATH = './data/pieces.json';

const getPiecesFromTemperature = (temperature) => {
  const pieces = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));
  const foundPieces = pieces.find(item => temperature > item.temperature);
  return foundPieces;
}

module.exports = {
  getPiecesFromTemperature
};