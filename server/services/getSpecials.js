const fs = require('fs');

const JSON_FILE_PATH = './data/specials.json';

/**
 * Retrieves special event data based on the given date.
 * @param {Date} date - The date to check for special events.
 * @returns {Object | undefined} - The special event object found based on the provided date, or undefined if not found.
 */
const getSpecials = (date) => {
  const specials = JSON.parse(fs.readFileSync(JSON_FILE_PATH, 'utf8'));

  // Get the month and date from the provided date
  const targetMonth = date.getMonth() + 1; // month starts from 0, so add 1
  const targetDateOfMonth = date.getDate();

  // Find a special event matching the provided date
  const foundSpecial = specials.find(event => 
    event.month === targetMonth && event.date === targetDateOfMonth
  );

  // Return the found special or undefined if not found
  return foundSpecial;
};

module.exports = {
  getSpecials
};
