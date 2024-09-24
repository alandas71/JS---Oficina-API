import { Request } from "express";
import { Files } from "formidable";
import { Agendamento } from "../Models/AgendamentoModel";
import { Servico_Adicional } from "../Models/ServicoAdicionalModel";
import { Veiculo } from "Models/VeiculoModel";
import { Cliente } from "Models/ClienteModel";

export interface AgendamentoRequest extends Request {
    files: Files;
    body: {
      Agendamento: Agendamento;
      Veiculo: Veiculo;
      Cliente: Cliente;
      Adicionais?: Servico_Adicional[];
      [key: string]: any;
    };
  }
  