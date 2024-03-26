/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const clothingsData = require('../seed-data/clothings');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('clothings').del()
  await knex('clothings').insert(clothingsData);
};
