/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Veiculo_Fotos (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Veiculo_id INT NOT NULL,
            Foto_url NVARCHAR(255) NOT NULL,
            Situacao VARCHAR(50) NOT NULL,
            Criado_em DATETIME2 DEFAULT GETDATE(),
            Atualizado_em DATETIME2 DEFAULT GETDATE(),
            FOREIGN KEY (Veiculo_id) REFERENCES Veiculo(id) ON DELETE CASCADE
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Veiculo_Fotos`);
};
