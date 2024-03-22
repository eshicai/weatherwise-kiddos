const fs = require('fs');
const JSON_FILE_PATH = './data/clothings.json';

/**
 * Retrieves the clothing item based on the given temperature.
 * @param {number} temperature - The temperature to compare against for clothing retrieval.
 * @returns {Object | undefined} - The clothing item found based on the temperature, or undefined if not found.
 */
const getClothingFromTemperature = (temperature) => {
  const clothings = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));
  // Find the first clothing item whose temperature requirement is equal to or higher than the given temperature
  const foundClothing = clothings.find(item => temperature >= item.temperature);
  // Return the found clothing item or undefined if not found
  return foundClothing;
}

module.exports = {
  getClothingFromTemperature
};
