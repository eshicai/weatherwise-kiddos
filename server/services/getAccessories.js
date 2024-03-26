const knex = require("knex")(require("../knexfile"));

/**
 * Retrieves the clothing item based on the given temperature.
 * @param {number} temperature - The temperature to compare against for clothing retrieval.
 * @returns {Object | undefined} - The clothing item found based on the temperature.
 */
const getAccessoriesFromTemperature = async (temperature) => {
  try {
    const foundAccessory = await knex('accessories')
      .where('temperature', '<=', temperature)      
      .select(
        'accessories'
      )
      .first();

    return foundAccessory;
  } catch (error) {
    throw new Error('Error finding items: ' + error.message);
  }
}

module.exports = {
  getAccessoriesFromTemperature
};
