import { Response, NextFunction } from "express";
import { IncomingForm } from "formidable";
import { Agendamento } from "../types/Models/AgendamentoModel";
import { AgendamentoRequest } from "Interfaces/AgendamentoRequest";
import { AgendamentoBody } from "Interfaces/AgendamentoBody";

function ValidateAgendamentoCreation(req: AgendamentoRequest, res: Response, next: NextFunction) {
  const form = new IncomingForm({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err);
    }

    const body: AgendamentoRequest['body'] = {
      Agendamento: fields.Agendamento ? JSON.parse(fields.Agendamento[0]) : {},
      Adicionais: fields.Adicionais ? JSON.parse(fields.Adicionais[0]) : undefined,
    };

    req.body = body;
    req.files = files;

    const { Agendamento, Adicionais }: AgendamentoBody = req.body;
    const Fotos = req.files?.Fotos;

    const errors: string[] = [];

    // Validação de campos do Agendamento
    if (!Agendamento || typeof Agendamento !== 'object') {
      errors.push("Agendamento é obrigatório e deve ser um objeto.");
    } else {
      const { Endereco_entrega, Observacao, Descricao, Servico_id }: Agendamento = Agendamento;

      if (!Endereco_entrega) {
        errors.push("Endereco_entrega é obrigatório.");
      } else if (typeof Endereco_entrega !== "string") {
        errors.push("Endereco_entrega deve ser uma string.");
      }

      if (Descricao && typeof Descricao !== "string") {
        errors.push("Descricao deve ser uma string.");
      }

      if (Observacao && typeof Observacao !== "string") {
        errors.push("Observacao deve ser uma string.");
      }

      if (Servico_id && typeof Servico_id !== "number") {
        errors.push("Servico_id deve ser um número.");
      }
    }

    // Validação de Serviços Adicionais
    if (Adicionais && !Array.isArray(Adicionais)) {
      errors.push("Adicionais deve ser um array.");
    }

    // Validação das Fotos
    if (Fotos) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 2 * 1024 * 1024; // 2 MB
      const maxPhotos = 8;

      if (Array.isArray(Fotos)) {
        if (Fotos.length > maxPhotos) {
          errors.push(`Você pode enviar no máximo ${maxPhotos} fotos.`);
        }
        for (const file of Fotos) {
          if (!allowedTypes.includes(file.mimetype)) {
            errors.push("Tipo de arquivo não permitido. Use apenas JPEG e PNG.");
          }
          if (file.size > maxSize) {
            errors.push("Tamanho máximo da foto é 2 MB.");
          }
        }
      } else {
        const singleFile: any = Fotos;
        if (singleFile) {
          if (!allowedTypes.includes(singleFile.mimetype)) {
            errors.push("Tipo de arquivo não permitido. Use apenas JPEG e PNG.");
          }
          if (singleFile.size > maxSize) {
            errors.push("Tamanho máximo da foto é 2 MB.");
          }
        }
      }
    }

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

    next();
  });
}

export default ValidateAgendamentoCreation;
