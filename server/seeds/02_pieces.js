/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const clothingsData = require('../seed-data/pieces');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('pieces').del()
  await knex('pieces').insert(clothingsData);
};