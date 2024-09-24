/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Servico (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Tipo NVARCHAR(50) NOT NULL CHECK (Tipo IN ('eletrico', 'carroceria', 'mecanico'))
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Servico`);
};
