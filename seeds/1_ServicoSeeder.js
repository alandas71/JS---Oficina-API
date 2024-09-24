/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Servico').del();
  await knex('Servico').insert([
    {Tipo: 'eletrico'},
    {Tipo: 'carroceria'},
    {Tipo: 'mecanico'},
  ]);
};
