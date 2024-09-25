export interface AvaliacaoClienteBody {
  Cliente_id: number;
  Agendamento_id: number;
  Tempo_espera: number;
  Servico: number;
  Atendimento: number;
  Satatisfacao: number;
  Recomendaria: "sim" | "não";
}