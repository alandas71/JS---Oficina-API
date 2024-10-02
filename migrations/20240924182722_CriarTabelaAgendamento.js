/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Agendamento (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Oficina_id INT NOT NULL,
            Servico_id INT NOT NULL,
            Veiculo_id INT NOT NULL,
            Servico_Situacao NVARCHAR(50),
            Descricao NVARCHAR(255) NOT NULL,
            Endereco_entrega NVARCHAR(255) NOT NULL,
            Observacao NVARCHAR(255),
            Foi_entregue VARCHAR(3),
            Arquivado VARCHAR(3),
            Previsao_entrega DATETIME,
            Data_Hora DATETIME,
            Criado_em DATETIME2 DEFAULT GETDATE(),
            Atualizado_em DATETIME2 DEFAULT GETDATE(),
            FOREIGN KEY (Servico_id) REFERENCES Servico(id)
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Agendamento`);
};
