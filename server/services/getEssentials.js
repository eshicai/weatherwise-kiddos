const fs = require('fs');
const JSON_FILE_PATH = './data/essentials.json';

/**
 * Retrieves the essential item based on weather conditions.
 * @param {boolean} rain - Indicates if it's raining.
 * @param {boolean} snow - Indicates if it's snowing.
 * @returns {Object | undefined} - The essential item found based on weather conditions, or undefined if not found.
 */
const getEssentials = (rain, snow) => {
  const essentials = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));

  let foundEssential = '';

  if (snow) {
    // Find the essential item for snow conditions
    foundEssential = essentials.find(item => item.condition === 'snow');
  } else if (rain) {
    // Find the essential item for rain conditions
    foundEssential = essentials.find(item => item.condition === 'rain');
  }

  // Return the found essential item or an empty string if not found
  return foundEssential;
}

module.exports = {
  getEssentials
};
