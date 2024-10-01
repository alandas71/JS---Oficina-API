import { Request, Response, NextFunction } from "express";
import { IncomingForm } from "formidable";
import { Agendamento } from "../types/Models/AgendamentoModel";
import { AgendamentoCreateRequest } from "Interfaces/AgendamentoCreateRequest";
import { AgendamentoBody } from "Interfaces/AgendamentoBody";
import { Veiculo } from "../types/Models/VeiculoModel";
import { Cliente } from "../types/Models/ClienteModel";
import { formatarFieldsAgendamento } from "../helpers/formatarFieldsAgendamento";

function ValidateAgendamentoCreation(req: AgendamentoCreateRequest, res: Response, next: NextFunction) {
  const form = new IncomingForm({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err);
    }

    const parsedFields = formatarFieldsAgendamento(fields);
    
    const body = {
      Agendamento: parsedFields.Agendamento || {},
      Veiculo: parsedFields.Veiculo || {},
      Cliente: parsedFields.Cliente || {},
      Adicionais: parsedFields.Adicionais || [],
    };

    req.body = body;
    req.files = files;
    const { Agendamento, Adicionais, Veiculo, Cliente }: AgendamentoBody = req.body;

    const Fotos = req.files?.Fotos;
    const Documentos = req.files?.Documentos;

    const errors: string[] = [];

    if (!Cliente || typeof Cliente !== 'object') {
      errors.push("Cliente é obrigatório e deve ser um objeto.");
    } else {
      const { Nome, CPF, Telefone, Email }: Cliente = Cliente;
      if (!Nome) {
        errors.push("Nome é obrigatório.");
      } else if (typeof Nome !== "string") {
        errors.push("O Nome deve ser uma string.");
      }

      if (!Telefone) {
        errors.push("Telefone é obrigatório.");
      } else if (typeof +Telefone !== "number") {
        errors.push("O Telefone deve ser um number.");
      }

      if (!Email) {
        errors.push("Email é obrigatório.");
      } else if (typeof Email !== "string") {
        errors.push("O Email deve ser uma string.");
      }

      const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      if (!emailRegex.test(Email)) {
        errors.push("O email deve ser válido.");
      }

      if (!CPF) {
        errors.push("CPF é obrigatório.");
      } else if (typeof  +CPF !== "number") {
        errors.push("O CPF deve ser um number.");
      }
    }

    // Validação de campos do Agendamento
    if (!Agendamento || typeof Agendamento !== 'object') {
      errors.push("Agendamento é obrigatório e deve ser um objeto.");
    } else {
      const { Endereco_entrega, Observacao, Descricao, Oficina_id, Servico_id, Data_Hora }: Agendamento = Agendamento;

      if (!Data_Hora) {
        errors.push("Data_Hora é obrigatório.");
      }

      if (!Oficina_id) {
        errors.push("Oficina_id é obrigatório.");
      } else if (typeof +Oficina_id !== "number") {
        errors.push("Oficina_id deve ser um number.");
      }

      if (!Servico_id) {
        errors.push("Servico_id é obrigatório.");
      } else if (typeof +Servico_id !== "number") {
        errors.push("Servico_id deve ser um number.");
      }

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
    }

    if (!Veiculo || typeof Veiculo !== 'object') {
      errors.push("Veiculo é obrigatório e deve ser um objeto.");
    } else {
      const { Placa, Marca, Modelo, Caracteristicas, Ano_Modelo, Cor, Chassi, Quilometragem }: Veiculo = Veiculo;

      if (!Placa) {
        errors.push("Placa é obrigatória.");
      } else if (typeof Placa !== "string") {
          errors.push("A placa deve ser uma string.");
      }
      
      if (!Marca) {
        errors.push("Marca é obrigatória.");
      } else if (typeof Marca !== "string") {
        errors.push("A marca deve ser uma string.");
      }
      
      if (!Modelo) {
        errors.push("Modelo é obrigatório.");
      } else if (typeof Modelo !== "string") {
        errors.push("O modelo deve ser uma string.");
      }
      
      if (!Cor) {
        errors.push("Cor é obrigatório.");
      } else if (typeof Cor !== 'string') {
        errors.push("A cor deve ser uma string.");
      }
      
      if (Chassi && Chassi.trim().length !== 17) {
        errors.push("O número do chassi deve ter 17 caracteres.");
      }
      
      if (!Quilometragem) {
        errors.push("Quilometragem é obrigatório.");
      } else if (typeof +Quilometragem !== 'number') {
        errors.push("Quilometragem deve ser um número.");
      }  
    }      

    // Validação de Serviços Adicionais
    if (Adicionais && !Array.isArray(Adicionais)) {
      errors.push("Adicionais deve ser um array.");
    }

    // Validação das Fotos
    if (Fotos) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 20 * 1024 * 1024; // 20 MB
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

    // Validação das Documentos
    if (Documentos) {
      const allowedTypes = ["image/jpeg", "image/png"];
      const maxSize = 20 * 1024 * 1024; // 20 MB
      const maxPhotos = 8;

      if (Array.isArray(Documentos)) {
        if (Documentos.length > maxPhotos) {
          errors.push(`Você pode enviar no máximo ${maxPhotos} fotos.`);
        }
        for (const file of Documentos) {
          if (!allowedTypes.includes(file.mimetype)) {
            errors.push("Tipo de arquivo não permitido. Use apenas JPEG e PNG.");
          }
          if (file.size > maxSize) {
            errors.push("Tamanho máximo da foto é 2 MB.");
          }
        }
      } else {
        const singleFile: any = Documentos;
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

function ValidateAgendamentoUpdate(req: Request, res: Response, next: NextFunction) {
  const { Agendamento, Adicionais, Veiculo, Cliente }: AgendamentoBody = req.body;
  if (Veiculo || Cliente) {
    res.status(422).json({ message: "Não é possível atualizar dados de veículo e cliente por essa rota." });
    return;
  }

  const errors: string[] = [];

  // Validação de campos do Agendamento
  if (!Agendamento || typeof Agendamento !== 'object') {
    errors.push("Agendamento é obrigatório e deve ser um objeto.");
  } else {
    const { Endereco_entrega, Observacao, Descricao, Oficina_id, Servico_id, Data_Hora }: Agendamento = Agendamento;

    if (!Data_Hora) {
      errors.push("Data_Hora é obrigatório.");
    }

    if (!Oficina_id) {
      errors.push("Oficina_id é obrigatório.");
    } else if (typeof +Oficina_id !== "number") {
      errors.push("Oficina_id deve ser um number.");
    }

    if (!Servico_id) {
      errors.push("Servico_id é obrigatório.");
    } else if (typeof +Servico_id !== "number") {
      errors.push("Servico_id deve ser um number.");
    }

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
  }

  // Validação de Serviços Adicionais
  if (Adicionais && !Array.isArray(Adicionais)) {
    errors.push("Adicionais deve ser um array.");
  }

  if (errors.length > 0) {
    return res.status(422).json({ errors });
  }

  next();
}


export {ValidateAgendamentoCreation, ValidateAgendamentoUpdate};
