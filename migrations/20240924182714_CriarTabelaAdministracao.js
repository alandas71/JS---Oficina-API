/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Administracao (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Usuario NVARCHAR(255) NOT NULL,
            Email NVARCHAR(255) NOT NULL,
            Telefone BIGINT NOT NULL,
            Senha VARCHAR(255) NOT NULL,
            Tipo NVARCHAR(255) NOT NULL CHECK (Tipo IN ('administrador', 'colaborador', 'mecanico')),
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
    await knex.raw(`DROP TABLE Administracao`);
};
