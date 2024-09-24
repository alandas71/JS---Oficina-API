/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Servico_Adicional (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Tipo NVARCHAR(50) NOT NULL CHECK (Tipo IN ('oleo', 'alinhamento/balanceamento', 'revisao', 'freio', 'bateria'))
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Servico_Adicional`);
};
