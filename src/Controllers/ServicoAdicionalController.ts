import ServicoAdicionalRepository from "../Repositories/ServicoAdicionalRepository";
import { Servico_Adicional } from "Models/ServicoAdicionalModel";
import { Request, Response } from "express";

class ServicoAdicionalController {
  private servicoAdicionalRepository: ServicoAdicionalRepository;

  constructor() {
    this.servicoAdicionalRepository = new ServicoAdicionalRepository();
  }

  async getServicosAdicionais(req: Request, res: Response): Promise<void> {
    try {
      const servicosAdicionais: Servico_Adicional[] = await this.servicoAdicionalRepository.getServicosAdicionais();
      res.status(200).json(servicosAdicionais);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getServicoAdicional(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const servicoAdicional: Servico_Adicional | undefined = await this.servicoAdicionalRepository.getServicoAdicional(id);
      
      if (!servicoAdicional) {
        res.status(404).json({ message: "ServicoAdicional não encontrado." });
        return;
      }

      res.status(200).json(servicoAdicional);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createServicoAdicional(req: Request, res: Response): Promise<void> {
    const data: Servico_Adicional = req.body;
    try {
      const newServicoAdicional: Servico_Adicional = await this.servicoAdicionalRepository.createServicoAdicional(data);
      res.status(201).json(newServicoAdicional);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async updateServicoAdicional(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const data: Partial<Servico_Adicional> = req.body;
      const updatedRow: boolean = await this.servicoAdicionalRepository.updateServicoAdicional(data, id);
      
      if (!updatedRow) {
        res.status(404).json({ message: "ServicoAdicional não encontrado." });
        return;
      }
      
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async deleteServicoAdicional(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const deleted: boolean = await this.servicoAdicionalRepository.deleteServicoAdicional(id);

      if (!deleted) {
        res.status(404).json({ message: "ServicoAdicional não encontrado." });
        return;
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default ServicoAdicionalController;
