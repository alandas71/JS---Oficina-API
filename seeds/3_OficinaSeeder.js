/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Oficina').del();
  await knex('Oficina').insert([
    {Nome: 'LimpCar'},
    {Nome: 'MB BAhia'},
    {Nome: 'Top Auto'},
  ]);
};
