export interface Servico_Veiculo {
  id?: number;
  Veiculo_id?: number;
  Servico_id: number;
  Situacao: "pendente" | "em andamento" | "finalizado";
  Criado_em?: Date;
  Atualizado_em?: Date;
}
