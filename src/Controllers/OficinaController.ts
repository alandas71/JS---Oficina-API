import OficinaRepository from "../Repositories/OficinaRepository";
import { Oficina } from "Models/OficinaModel";
import { Request, Response } from "express";

class OficinaController {
  private oficinaRepository: OficinaRepository;

  constructor() {
    this.oficinaRepository = new OficinaRepository();
  }

  async getOficinas(req: Request, res: Response): Promise<void> {
    try {
      const oficinas: Oficina[] = await this.oficinaRepository.getOficinas();
      res.status(200).json(oficinas);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getOficina(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const oficina: Oficina | undefined = await this.oficinaRepository.getOficina(id);
      
      if (!oficina) {
        res.status(404).json({ message: "Oficina não encontrada." });
        return;
      }

      res.status(200).json(oficina);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createOficina(req: Request, res: Response): Promise<void> {
    const data: Oficina = req.body;
    try {
      const newOficina: Oficina = await this.oficinaRepository.createOficina(data);
      res.status(201).json(newOficina);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async updateOficina(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const data: Partial<Oficina> = req.body;
      const updatedRow: boolean = await this.oficinaRepository.updateOficina(data, id);
      
      if (!updatedRow) {
        res.status(404).json({ message: "Oficina não encontrada." });
        return;
      }
      
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async deleteOficina(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const deleted: boolean = await this.oficinaRepository.deleteOficina(id);

      if (!deleted) {
        res.status(404).json({ message: "Oficina não encontrada." });
        return;
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default OficinaController;
