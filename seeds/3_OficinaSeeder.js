/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Oficina').del();
  await knex('Oficina').insert([
    {Nome: 'LimpCar', Endereco: "Endereco1"},
    {Nome: 'MB BAhia', Endereco: "Endereco2"},
    {Nome: 'Top Auto', Endereco: "Endereco3"},
  ]);
};
