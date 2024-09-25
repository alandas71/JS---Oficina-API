import { Request, Response } from "express";
import ClienteRepository from "../Repositories/ClienteRepository";
import VeiculoRepository from "../Repositories/VeiculoRepository";
import ServicoVeiculoRepository from "../Repositories/ServicoVeiculoRepository";
import { Veiculo } from "Models/VeiculoModel";
import { Cliente } from "Models/ClienteModel";
import { Servico_Veiculo } from "Models/ServicoVeiculoModel";
import { ServicoVeiculoCreateRequest } from "Interfaces/ServicoVeiculoCreateRequest";
import { ServicoVeiculoBody } from "Interfaces/ServicoVeiculoBody";

class ServicoVeiculoController {
    private clienteRepository: ClienteRepository;
    private veiculoRepository: VeiculoRepository;
    private servicoVeiculoRepository: ServicoVeiculoRepository;
  
    constructor() {
      this.clienteRepository = new ClienteRepository();
      this.veiculoRepository = new VeiculoRepository();
      this.servicoVeiculoRepository = new ServicoVeiculoRepository();
    }
  

  async getServicoVeiculos(req: Request, res: Response): Promise<void> {
    try {
      const servicoVeiculos = await this.servicoVeiculoRepository.getServicoVeiculos();
      res.status(200).json(servicoVeiculos);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getServicoVeiculo(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const servicoVeiculo = await this.servicoVeiculoRepository.getServicoVeiculo(Number(id));
      res.status(200).json(servicoVeiculo);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createServicoVeiculo(req: ServicoVeiculoCreateRequest, res: Response): Promise<void> {
    let data: ServicoVeiculoBody = req.body;

    try {
        const newCliente: Cliente = await this.clienteRepository.createCliente(data.Cliente);
        if (newCliente) data.Veiculo.Cliente_id = newCliente.id;
        const newVeiculo: Veiculo = await this.veiculoRepository.createVeiculo(data.Veiculo)
        if (newVeiculo) {
            const newServicoVeiculo: Servico_Veiculo = await this.servicoVeiculoRepository.createServicoVeiculo({
                Veiculo_id: newVeiculo.id,
                Tempo_servico: data.Servico_Veiculo.Tempo_servico,
                Servico_id: data.Servico_Veiculo.Servico_id,
                Situacao: "pendente"
            }) 
            res.status(201).json(newServicoVeiculo);
        }
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }


  async updateUserServicoVeiculo(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const data = req.body;
      const updateUserServicoVeiculo = await this.servicoVeiculoRepository.updateServicoVeiculo(data, Number(id));
      res.status(200).json(updateUserServicoVeiculo);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async deleteServicoVeiculo(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await this.servicoVeiculoRepository.deleteServicoVeiculo(Number(id));
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default ServicoVeiculoController;
