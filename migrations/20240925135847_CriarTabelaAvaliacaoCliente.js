/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Avaliacao_Cliente (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Cliente_id INT NOT NULL,
            Agendamento_id INT NOT NULL,
            Nota_Avaliacao_id INT NOT NULL,
            Criado_em DATETIME2 DEFAULT GETDATE(),
            Atualizado_em DATETIME2 DEFAULT GETDATE(),
            FOREIGN KEY (Cliente_id) REFERENCES Cliente(id),
            FOREIGN KEY (Nota_Avaliacao_id) REFERENCES Nota_Avaliacao(id)
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Avaliacao_Cliente`);
};
