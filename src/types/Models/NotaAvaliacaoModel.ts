export interface Nota_Avaliacao {
  id?: number;
  Tempo_espera: number;
  Servico: number;
  Atendimento: number;
  Satatisfacao: number;
  Recomendaria: "sim" | "não";
  Criado_em?: Date;
  Atualizado_em?: Date;
}
