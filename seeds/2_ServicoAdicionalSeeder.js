/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Servico_Adicional').del();
  await knex('Servico_Adicional').insert([
    {Tipo: 'oleo'},
    {Tipo: 'alinhamento/balanceamento'},
    {Tipo: 'revisao'},
    {Tipo: 'freio'},
    {Tipo: 'bateria'},
  ]);
};
