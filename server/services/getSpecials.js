const knex = require("knex")(require("../knexfile"));

/**
 * Retrieves special event data based on the given date.
 * @param {Date} date - The date to check for special events.
 * @returns {Object | undefined} - The special event object found based on the provided date.
 */
const getSpecials = async (date) => {
  // Get the month and date from the provided date
  const targetMonth = date.getMonth() + 1; // month starts from 0, so add 1
  const targetDateOfMonth = date.getDate();

  try {
    const foundSpecial = await knex('specials')
      .where('month', targetMonth)
      .where('date', targetDateOfMonth)
      .select(
        'event',
        'color'
      );

    return foundSpecial;
  } catch (error) {
    throw new Error('Error finding items: ' + error.message);
  }
};

module.exports = {
  getSpecials
};
