/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Nota_Avaliacao (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Tempo_espera INT NOT NULL,
            Servico INT NOT NULL,
            Atendimento INT NOT NULL,
            Satatisfacao INT NOT NULL,
            Recomendaria NVARCHAR(10) NOT NULL,  -- "sim" ou "não"
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
    await knex.raw(`DROP TABLE Nota_Avaliacao`);
};
