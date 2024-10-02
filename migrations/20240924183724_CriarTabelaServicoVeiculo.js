/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Servico_Veiculo (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Veiculo_id INT,
            Servico_id INT NOT NULL,
            Arquivado VARCHAR(3),
            Situacao NVARCHAR(50) NOT NULL CHECK (Situacao IN ('pendente', 'em andamento', 'finalizado')),
            Criado_em DATETIME2 DEFAULT GETDATE(),
            Atualizado_em DATETIME2 DEFAULT GETDATE(),
            FOREIGN KEY (Veiculo_id) REFERENCES Veiculo(id),
            FOREIGN KEY (Servico_id) REFERENCES Servico(id)
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Servico_Veiculo`);
};
