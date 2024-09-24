import VeiculoRepository from "../Repositories/VeiculoRepository";
import { Veiculo } from "Models/VeiculoModel";
import { Request, Response } from "express";

class VeiculoController {
  private veiculoRepository: VeiculoRepository;

  constructor() {
    this.veiculoRepository = new VeiculoRepository();
  }

  async getVeiculos(req: Request, res: Response): Promise<void> {
    try {
      const veiculos: Veiculo[] = await this.veiculoRepository.getVeiculos();
      res.status(200).json(veiculos);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getVeiculo(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const veiculo: Veiculo | undefined = await this.veiculoRepository.getVeiculo(id);
      
      if (!veiculo) {
        res.status(404).json({ message: "Veiculo não encontrado." });
        return;
      }

      res.status(200).json(veiculo);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createVeiculo(req: Request, res: Response): Promise<void> {
    const data: Veiculo = req.body;
    try {
      const newVeiculo: Veiculo = await this.veiculoRepository.createVeiculo(data);
      res.status(201).json(newVeiculo);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async updateVeiculo(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const data: Partial<Veiculo> = req.body;
      const updatedRow: boolean = await this.veiculoRepository.updateVeiculo(data, id);
      
      if (!updatedRow) {
        res.status(404).json({ message: "Veiculo não encontrado." });
        return;
      }
      
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async deleteVeiculo(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const deleted: boolean = await this.veiculoRepository.deleteVeiculo(id);

      if (!deleted) {
        res.status(404).json({ message: "Veiculo não encontrado." });
        return;
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default VeiculoController;
