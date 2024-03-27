const knex = require("knex")(require("../knexfile"));

/**
 * Retrieves the pieces data based on the given temperature.
 * @param {number} temperature - The temperature to compare against for piece retrieval.
 * @returns {Object | undefined} - The piece object found based on the temperature.
 */
const getPiecesFromTemperature = async (temperature) => {
  try {
    const foundPiece = await knex('pieces')
      .where('temperature', '<=', temperature)      
      .select(
        'top',
        'bottom',
        'jacket',
        'footware'
      )
      .first();

    return foundPiece;
  } catch (error) {
    throw new Error('Error finding items: ' + error.message);
  }
}

module.exports = {
  getPiecesFromTemperature
};
