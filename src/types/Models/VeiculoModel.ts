export interface Veiculo {
  id?: number;
  Cliente_id?: number;
  Placa: string;
  Marca: string;
  Modelo: string;
  Caracteristicas: string;
  Ano_Modelo: number;
  Cor: string;
  Chassi: string;
  Quilometragem: number;
  Criado_em?: Date;
  Atualizado_em?: Date;
}
