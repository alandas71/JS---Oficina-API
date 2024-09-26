import ServicoRepository from "../Repositories/ServicoRepository";
import { Servico } from "Models/ServicosModel";
import { Request, Response } from "express";

class ServicoController {
  private servicoRepository: ServicoRepository;

  constructor() {
    this.servicoRepository = new ServicoRepository();
  }

  async getServicos(req: Request, res: Response): Promise<void> {
    try {
      const servicos: Servico[] = await this.servicoRepository.getServicos();
      res.status(200).json(servicos);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getServico(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const servico: Servico | undefined = await this.servicoRepository.getServico(id);
      
      if (!servico) {
        res.status(404).json({ message: "Servico não encontrado." });
        return;
      }

      res.status(200).json(servico);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createServico(req: Request, res: Response): Promise<void> {
    const data: Servico = req.body;
    try {
      const newServico: Servico = await this.servicoRepository.createServico(data);
      res.status(201).json(newServico);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async updateServico(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const data: Partial<Servico> = req.body;
      const updatedRow: boolean = await this.servicoRepository.updateServico(data, id);
      
      if (!updatedRow) {
        res.status(404).json({ message: "Servico não encontrado." });
        return;
      }
      
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async deleteServico(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const deleted: boolean = await this.servicoRepository.deleteServico(id);

      if (!deleted) {
        res.status(404).json({ message: "Servico não encontrado." });
        return;
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default ServicoController;
