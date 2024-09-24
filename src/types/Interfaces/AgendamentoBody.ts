import { Servico_Adicional } from "Models/ServicoAdicionalModel";
import { Veiculo_Fotos } from "Models/VeiculoFotosModel";
import { Agendamento } from "Models/AgendamentoModel";

export interface AgendamentoBody {
  Agendamento: Agendamento;
  Fotos?: Veiculo_Fotos[];
  Adicionais?: Servico_Adicional[];
}