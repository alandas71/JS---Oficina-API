/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Oficina').del();
  await knex('Oficina').insert([
    {Nome: 'LimpCar', Endereco: "Endereco1", Situacao: "ativo"},
    {Nome: 'MB BAhia', Endereco: "Endereco2", Situacao: "ativo"},
    {Nome: 'Top Auto', Endereco: "Endereco3", Situacao: "ativo"},
  ]);
};
