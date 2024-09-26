import { Response, Request, NextFunction } from "express";
import { IncomingForm, Files } from "formidable";
import { Veiculo } from "../types/Models/VeiculoModel";
import { Veiculo_Fotos } from "../types/Models/VeiculoFotosModel";

export interface VeiculoRequest {
  Veiculo: Veiculo;
  Fotos?: Veiculo_Fotos[];
}

interface CustomRequest extends Request {
  files: Files;
  body: {
    Veiculo: Veiculo;
    Fotos?: Veiculo_Fotos[];
    [key: string]: any;
  };
}

function ValidateVeiculoCreation(req: CustomRequest, res: Response, next: NextFunction) {
  const form = new IncomingForm({ keepExtensions: true });
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return next(err);
    }

    const body: CustomRequest['body'] = {
      Veiculo: fields.Veiculo ? JSON.parse(fields.Veiculo[0]) : {},
    };

    req.body = body;
    req.files = files;

    const { Veiculo }: VeiculoRequest = req.body;
    const Fotos = req.files?.Fotos;

    const errors: string[] = [];

    // Validação de campos do Veiculo
    if (!Veiculo || typeof Veiculo !== 'object') {
      errors.push("Veiculo é obrigatório e deve ser um objeto.");
    } else {
      const { Placa, Marca, Modelo, Caracteristicas, Ano_Modelo, Cor, Chassi, Quilometragem }: Veiculo = Veiculo;

      if (!Placa) {
        errors.push("Placa é obrigatória.");
      } else if (typeof Placa !== "string") {
        errors.push("A placa deve ser uma string.");
      } else if (!/^[A-Z]{3}-\d{4}$/i.test(Placa)) {
        errors.push("A placa deve seguir o formato correto (ex: AAA-0A00 ou AAA-0000).");
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
      
      if (!Ano_Modelo) {
        errors.push("Ano_Modelo é obrigatório.");
      } else if (typeof Ano_Modelo !== "number") {
        errors.push("O Ano_Modelo deve ser um número.");
      } else if (Ano_Modelo > new Date().getFullYear()) {
        errors.push("O Ano_Modelo é inválido.");
      }
      
      if (!Cor) {
        errors.push("Cor é obrigatório.");
      } else if (typeof Cor !== 'string') {
        errors.push("A cor deve ser uma string.");
      }
      
      if (!Chassi) {
        errors.push("Chassi é obrigatório.");
      } else if (typeof Chassi !== 'string') {
        errors.push("Chassi deve ser uma string.");
      } else if (Chassi.trim().length !== 17) {
        errors.push("O número do chassi deve ter 17 caracteres.");
      }
      
      if (!Quilometragem) {
        errors.push("Quilometragem é obrigatório.");
      } else if (typeof Quilometragem !== 'number') {
        errors.push("Quilometragem deve ser um número.");
      }  
      
      if (!Caracteristicas) {
        errors.push("Quilometragem é obrigatório.");
      } else if (typeof Caracteristicas !== "string") {
        errors.push("Caracteristicas deve ser uma string.");
      }
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

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

    next();
  });
}

export default ValidateVeiculoCreation;
