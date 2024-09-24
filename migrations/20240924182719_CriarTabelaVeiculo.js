/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.raw(`
        CREATE TABLE Veiculo (
            id INT IDENTITY(1,1) PRIMARY KEY,
            Cliente_id INT,
            Placa NVARCHAR(10) NOT NULL,
            Marca NVARCHAR(50) NOT NULL,
            Modelo NVARCHAR(50) NOT NULL,
            Caracteristicas NVARCHAR(255),
            Ano_Modelo INT NOT NULL,
            Cor NVARCHAR(50) NOT NULL,
            Chassi NVARCHAR(50) NOT NULL,
            Quilometragem INT NOT NULL,
            Criado_em DATETIME2 DEFAULT GETDATE(),
            Atualizado_em DATETIME2 DEFAULT GETDATE(),
            FOREIGN KEY (Cliente_id) REFERENCES Cliente(id)
        )
    `);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.raw(`DROP TABLE Veiculo`);
};
