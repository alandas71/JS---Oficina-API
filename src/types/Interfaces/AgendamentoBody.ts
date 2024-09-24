import { Servico_Adicional } from "Models/ServicoAdicionalModel";
import { Veiculo_Fotos } from "Models/VeiculoFotosModel";
import { Documentos } from "Models/DocumentosModel";
import { Agendamento } from "Models/AgendamentoModel";
import { Veiculo } from "Models/VeiculoModel";
import { Cliente } from "Models/ClienteModel";

export interface AgendamentoBody {
  Agendamento: Agendamento;
  Veiculo: Veiculo;
  Cliente: Cliente;
  Fotos?: Veiculo_Fotos[];
  Documentos?: Documentos[];
  Adicionais?: Servico_Adicional[];
}