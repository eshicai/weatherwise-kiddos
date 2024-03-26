/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const clothingsData = require('../seed-data/essentials');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('essentials').del()
  await knex('essentials').insert(clothingsData);
};
