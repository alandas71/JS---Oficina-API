export interface Veiculo_Fotos {
  id?: number;
  Veiculo_id: number;
  Foto_url: string;
  Situacao: string; // checado / checando / checar
  Criado_em?: Date;
  Atualizado_em?: Date;
}
