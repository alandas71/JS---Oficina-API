export interface Agendamento {
  id?: number;
  Oficina_id: number;
  Servico_id: number;
  Servico_Situacao: string; // feito / fazendo 
  Tipo_servico?: string;
  Veiculo_id?: number;
  Descricao: string;
  Endereco_entrega: string;
  Observacao: string;
  Data_Hora: Date | string;
  Previsao_entrega?: string;
  Foi_entregue?: string; // sim / nao
  Criado_em?: Date;
  Atualizado_em?: Date;
}
