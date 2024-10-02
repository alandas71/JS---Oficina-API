export interface Servico_Veiculo {
  id?: number;
  Veiculo_id?: number;
  Servico_id: number;
  Situacao: "pendente" | "em andamento" | "finalizado";
  Tempo_servico?: Date;
  Arquivado?: string; // sim / nao
  Criado_em?: Date;
  Atualizado_em?: Date;
}
