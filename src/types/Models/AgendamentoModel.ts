export interface Agendamento {
  id?: number;
  Oficina_id: number;
  Servico_id: number;
  Veiculo_id: number;
  Descricao: string;
  Endereco_entrega: string;
  Observacao: string;
  Criado_em?: Date;
  Atualizado_em?: Date;
}
