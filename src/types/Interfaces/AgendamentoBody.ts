import { Servico_Adicional } from "Models/ServicoAdicionalModel";
import { Veiculo_Fotos } from "Models/VeiculoFotosModel";
import { Agendamento } from "Models/AgendamentoModel";
import { Veiculo } from "Models/VeiculoModel";
import { Cliente } from "Models/ClienteModel";

export interface AgendamentoBody {
  Agendamento: Agendamento;
  Veiculo: Veiculo;
  Cliente: Cliente;
  Fotos?: Veiculo_Fotos[];
  Adicionais?: Servico_Adicional[];
}