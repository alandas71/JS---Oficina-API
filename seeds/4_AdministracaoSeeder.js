/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('Administracao').del();
  await knex('Administracao').insert([
    {Usuario: "softline", Senha: "1234", Tipo: 'administrador', Situacao: "ativo", Telefone: "9999999999", Email: "email.test@gmail.com",},
    {Usuario: "oficina", Senha: "1234", Tipo: 'colaborador', Situacao: "ativo", Telefone: "9999999999", Email: "email.test@gmail.com",},
    {Usuario: "mecanico", Senha: "1234", Tipo: 'mecanico', Situacao: "ativo", Telefone: "9999999999", Email: "email.test@gmail.com",},
  ]);
};
