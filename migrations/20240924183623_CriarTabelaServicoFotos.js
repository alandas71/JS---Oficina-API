/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Servico_Fotos (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Servico_id INT NOT NULL,
            Foto_url NVARCHAR(255) NOT NULL,
            Criado_em DATETIME2 DEFAULT GETDATE(),
            Atualizado_em DATETIME2 DEFAULT GETDATE(),
            FOREIGN KEY (Servico_id) REFERENCES Servico(id) ON DELETE CASCADE
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Servico_Fotos`);
};
