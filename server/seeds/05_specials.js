/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const clothingsData = require('../seed-data/specials');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('specials').del()
  await knex('specials').insert(clothingsData);
};
