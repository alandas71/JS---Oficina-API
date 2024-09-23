import { Servico, Servico_Adicional } from "./ServicoModel";

export interface Agendamento {
  id?: number;
  Oficina_id: number;
  Servico_id: number;
  Servico_Adicional_id?: number;
  Servicos?: Servico[];
  Adicionais?: Servico_Adicional[];
  Descricao: string;
  Endereco_entrega: string;
  Observacao: string;
  Criado_em: Date;
  Atualizado_em: Date;
}
