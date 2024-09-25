import { Response, Request, NextFunction } from "express";
import { AvaliacaoClienteBody } from "Interfaces/AvaliacaoClienteBody";

function ValidateAvaliacaoClienteCreation(req: Request, res: Response, next: NextFunction) {
    const { Cliente_id, Agendamento_id, Tempo_espera, Servico, Atendimento, Satatisfacao, Recomendaria }: AvaliacaoClienteBody = req.body;

    const errors: string[] = [];

    if (!Cliente_id) {
      errors.push("Cliente_id é obrigatório.");
    } else if (typeof Cliente_id !== "number") {
      errors.push("Cliente_id deve ser um number.");
    }

    if (!Agendamento_id) {
      errors.push("Agendamento_id é obrigatório.");
    } else if (typeof Agendamento_id !== "number") {
      errors.push("Agendamento_id deve ser um number.");
    }

    if (!Tempo_espera) {
      errors.push("Tempo_espera é obrigatório.");
    } else if (typeof Tempo_espera !== "number") {
      errors.push("Tempo_espera deve ser um number.");
    }

    if (!Servico) {
      errors.push("Servico é obrigatório.");
    } else if (typeof Servico !== "number") {
      errors.push("Servico deve ser um number.");
    }

    if (!Atendimento) {
      errors.push("Atendimento é obrigatório.");
    } else if (typeof Atendimento !== "number") {
      errors.push("Atendimento deve ser um number.");
    }

    if (!Satatisfacao) {
      errors.push("Satatisfacao é obrigatório.");
    } else if (typeof Satatisfacao !== "number") {
      errors.push("Satatisfacao deve ser um number.");
    }

    if (!Recomendaria) {
      errors.push("Recomendaria é obrigatório.");
    } else if (typeof Recomendaria !== "string") {
      errors.push("Recomendaria deve ser uma string.");
    }

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

    next();
}

export default ValidateAvaliacaoClienteCreation;
