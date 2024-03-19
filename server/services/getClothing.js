
const fs = require('fs');
const JSON_FILE_PATH = './data/clothings.json';

const getClothingFromTemperature = (temperature) => {
  const clothing = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));
  const foundClothing = clothing.find(item => temperature > item.temperature);
  return foundClothing;
}

module.exports = {
  getClothingFromTemperature
};