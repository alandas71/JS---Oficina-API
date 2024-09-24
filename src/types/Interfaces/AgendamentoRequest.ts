import { Request } from "express";
import { Files } from "formidable";
import { Agendamento } from "../Models/AgendamentoModel";
import { Servico_Adicional } from "../Models/ServicoAdicionalModel";

export interface AgendamentoRequest extends Request {
    files: Files;
    body: {
      Agendamento: Agendamento;
      Adicionais?: Servico_Adicional[];
      [key: string]: any;
    };
  }
  