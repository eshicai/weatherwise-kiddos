const knex = require("knex")(require("../knexfile"));

/**
 * Retrieves the essential item based on weather conditions.
 * @param {boolean} rain - Indicates if it's raining.
 * @param {boolean} snow - Indicates if it's snowing.
 * @returns {Object | undefined} - The essential item found based on weather conditions.
 */
const getEssentials = async (rain, snow) => {
  let foundEssential = '';

  try {
    if (snow) {
      foundEssential = await knex('essentials')
        .where('condition', 'snow')
        .select(
          'jacket',
          'jacket_image',
          'pants',
          'pants_image',
          'footware',
          'footware_image'
        )
        .first();
    } else if (rain) {
      foundEssential = await knex('essentials')
        .where('condition', 'rain')
        .select(
          'jacket',
          'jacket_image',
          'pants',
          'pants_image',
          'footware',
          'footware_image'
        )
        .first();
    }

    return foundEssential;
  } catch (error) {
    throw new Error('Error finding items: ' + error.message);
  }
}

module.exports = {
  getEssentials
};
