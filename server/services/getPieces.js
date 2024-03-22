const fs = require('fs');
const JSON_FILE_PATH = './data/pieces.json';

/**
 * Retrieves the pieces data based on the given temperature.
 * @param {number} temperature - The temperature to compare against for piece retrieval.
 * @returns {Object | undefined} - The piece object found based on the temperature, or undefined if not found.
 */
const getPiecesFromTemperature = (temperature) => {
  const pieces = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));
  // Find the first piece whose temperature requirement is equal to or higher than the given temperature
  const foundPiece = pieces.find(item => temperature >= item.temperature);
  // Return the found piece or undefined if not found
  return foundPiece;
}

module.exports = {
  getPiecesFromTemperature
};
