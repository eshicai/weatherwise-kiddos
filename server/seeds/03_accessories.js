/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
// import seed data files, arrays of objects
const clothingsData = require('../seed-data/accessories');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('accessories').del()
  await knex('accessories').insert(clothingsData);
};
