import { Veiculo } from "Models/VeiculoModel";
import { Cliente } from "Models/ClienteModel";
import { Servico_Veiculo } from "Models/ServicoVeiculoModel";

export interface ServicoVeiculoBody {
  Servico_Veiculo: Servico_Veiculo;
  Veiculo: Veiculo;
  Cliente: Cliente;
}