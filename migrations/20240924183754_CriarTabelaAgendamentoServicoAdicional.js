/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Agendamento_Servico_Adicional (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Agendamento_id INT NOT NULL,
            Servico_Adicional_id INT NOT NULL,
            Situacao NVARCHAR(50),
            FOREIGN KEY (Agendamento_id) REFERENCES Agendamento(id) ON DELETE CASCADE,
            FOREIGN KEY (Servico_Adicional_id) REFERENCES Servico_Adicional(id)
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Agendamento_Servico_Adicional`);
};
