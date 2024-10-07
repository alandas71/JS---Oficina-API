/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Oficina (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Nome NVARCHAR(255) NOT NULL,
            Email NVARCHAR(255) NOT NULL,
            Endereco NVARCHAR(255) NOT NULL,
            CNPJ VARCHAR(255),
            Telefone BIGINT NOT NULL,
            Situacao NVARCHAR(10) NOT NULL CHECK (Situacao IN ('ativo', 'inativo')),
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Oficina`);
};
