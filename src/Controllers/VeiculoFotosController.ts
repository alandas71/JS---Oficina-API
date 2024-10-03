import VeiculoFotosRepository from "../Repositories/VeiculoFotosRepository";
import { Veiculo_Fotos } from "Models/VeiculoFotosModel";
import { Request, Response } from "express";

class VeiculoFotosController {
  private veiculoFotosRepository: VeiculoFotosRepository;

  constructor() {
    this.veiculoFotosRepository = new VeiculoFotosRepository();
  }

  async getVeiculosFotos(req: Request, res: Response): Promise<void> {
    try {
      const veiculoFotoss: Veiculo_Fotos[] = await this.veiculoFotosRepository.getVeiculosFotos();
      res.status(200).json(veiculoFotoss);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getVeiculoFotos(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const veiculoFotos: Veiculo_Fotos | undefined = await this.veiculoFotosRepository.getVeiculoFotos(id);
      
      if (!veiculoFotos) {
        res.status(404).json({ message: "VeiculoFotos não encontrado." });
        return;
      }

      res.status(200).json(veiculoFotos);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createVeiculoFotos(req: Request, res: Response): Promise<void> {
    const data: Veiculo_Fotos = req.body;
    try {
      const newVeiculoFotos: Veiculo_Fotos = await this.veiculoFotosRepository.createVeiculoFotos(data);
      res.status(201).json(newVeiculoFotos);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async updateVeiculoFotos(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const data: Partial<Veiculo_Fotos> = req.body;
      const updatedRow: boolean = await this.veiculoFotosRepository.updateVeiculoFotos(data, id);
      
      if (!updatedRow) {
        res.status(404).json({ message: "VeiculoFotos não encontrado." });
        return;
      }
      
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async deleteVeiculoFotos(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const deleted: boolean = await this.veiculoFotosRepository.deleteVeiculoFotos(id);

      if (!deleted) {
        res.status(404).json({ message: "VeiculoFotos não encontrado." });
        return;
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default VeiculoFotosController;
