import { Response, NextFunction } from "express";
import { ServicoVeiculoCreateRequest } from "Interfaces/ServicoVeiculoCreateRequest";
import { Servico_Veiculo } from "Models/ServicoVeiculoModel";
import { ServicoVeiculoBody } from "Interfaces/ServicoVeiculoBody";
import { Veiculo } from "../types/Models/VeiculoModel";
import { Cliente } from "../types/Models/ClienteModel";


function ValidateServicoVeiculoCreation(req: ServicoVeiculoCreateRequest, res: Response, next: NextFunction) {
    const { Cliente, Veiculo, Servico_Veiculo }: ServicoVeiculoBody = req.body;

    const errors: string[] = [];

    if (!Servico_Veiculo || typeof Servico_Veiculo !== 'object') {
      errors.push("Servico_Veiculo é obrigatório e deve ser um objeto.");
    } else {
      const { Tempo_servico, Servico_id }: Servico_Veiculo = Servico_Veiculo;
      if (!Tempo_servico) {
        errors.push("Tempo_servico é obrigatório.");
      } else if (typeof Tempo_servico !== "string") {
        errors.push("O Tempo_servico deve ser uma string.");
      }
      if (!Servico_id) {
        errors.push("Servico_id é obrigatório.");
      } else if (typeof Servico_id !== "number") {
        errors.push("O Servico_id deve ser um número.");
      }
    }

    if (!Cliente || typeof Cliente !== 'object') {
      errors.push("Cliente é obrigatório e deve ser um objeto.");
    } else {
      const { Nome }: Cliente = Cliente;
      if (!Nome) {
        errors.push("Nome é obrigatório.");
      } else if (typeof Nome !== "string") {
        errors.push("O Nome deve ser uma string.");
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

    if (errors.length > 0) {
      return res.status(422).json({ errors });
    }

    next();
}

export default ValidateServicoVeiculoCreation;
