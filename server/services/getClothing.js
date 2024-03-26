const knex = require("knex")(require("../knexfile"));

/**
 * Retrieves the clothing item based on the given temperature.
 * @param {number} temperature - The temperature to compare against for clothing retrieval.
 * @returns {Object | undefined} - The clothing item found based on the temperature.
 */
const getClothingFromTemperature = async (temperature) => {
  try {
    const foundClothing = await knex('clothings')
      .where('temperature', '<=', temperature)      
      .select(
        'image',
        'top',
        'bottom',
        'jacket',
        'footwear',
        'description'
      )
      .first();

    return foundClothing;
  } catch (error) {
    throw new Error('Error finding items: ' + error.message);
  }
}

module.exports = {
  getClothingFromTemperature
};
