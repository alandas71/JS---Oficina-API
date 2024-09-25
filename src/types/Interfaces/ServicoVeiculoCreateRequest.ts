import { Request } from "express";
import { Files } from "formidable";
import { Veiculo } from "Models/VeiculoModel";
import { Cliente } from "Models/ClienteModel";
import { Servico_Veiculo } from "Models/ServicoVeiculoModel";

export interface ServicoVeiculoCreateRequest extends Request {
    files: Files;
    body: {
      Servico_Veiculo: Servico_Veiculo;
      Veiculo: Veiculo;
      Cliente: Cliente;
      [key: string]: any;
    };
  }
  