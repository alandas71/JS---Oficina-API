import { Response, Request, NextFunction } from "express";
import { Agendamento_Servico_Adicional } from "Models/AgendamentoServicoAdicionalModel";

function ValidateAgendamentoServicoAdicionalCreation(req: Request, res: Response, next: NextFunction) {
    const { Agendamento_id, Servico_Adicional_id }: Agendamento_Servico_Adicional = req.body;

    const errors: string[] = [];

    if (!Servico_Adicional_id) {
      errors.push("Servico_Adicional_id é obrigatório.");
    } else if (typeof Servico_Adicional_id !== "number") {
      errors.push("Servico_Adicional_id deve ser um number.");
    }

    if (!Agendamento_id) {
      errors.push("Agendamento_id é obrigatório.");
    } else if (typeof Agendamento_id !== "number") {
      errors.push("Agendamento_id deve ser um number.");
    }

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

    next();
}

export default ValidateAgendamentoServicoAdicionalCreation;
