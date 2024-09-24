/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Cliente (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Nome NVARCHAR(255) NOT NULL,
            CPF BIGINT NOT NULL,
            Email NVARCHAR(255) NOT NULL,
            Telefone BIGINT NOT NULL,
            Situacao NVARCHAR(10) NOT NULL CHECK (Situacao IN ('ativo', 'inativo')),
            Criado_em DATETIME2 DEFAULT GETDATE(),
            Atualizado_em DATETIME2 DEFAULT GETDATE()
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Cliente`);
};
