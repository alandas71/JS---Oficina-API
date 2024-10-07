import AdministracaoRepository from "../Repositories/AdministracaoRepository";
import { Administracao } from "Models/AdministracaoModel";
import { Request, Response } from "express";

class AdministracaoController {
  private administracaoRepository: AdministracaoRepository;

  constructor() {
    this.administracaoRepository = new AdministracaoRepository();
  }

  async getAdministracoes(req: Request, res: Response): Promise<void> {
    try {
      const administracoes: Administracao[] = await this.administracaoRepository.getAdministracoes();
      res.status(200).json(administracoes);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getAdministracao(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const administracao: Administracao | undefined = await this.administracaoRepository.getAdministracao(id);
      
      if (!administracao) {
        res.status(404).json({ message: "Administracao não encontrado." });
        return;
      }

      res.status(200).json(administracao);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createAdministracao(req: Request, res: Response): Promise<void> {
    const data: Administracao = req.body;
    try {
      const newAdministracao: Administracao = await this.administracaoRepository.createAdministracao(data);
      res.status(201).json(newAdministracao);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async updateAdministracao(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const data: Partial<Administracao> = req.body;
      const updatedRow: boolean = await this.administracaoRepository.updateAdministracao(data, id);
      
      if (!updatedRow) {
        res.status(404).json({ message: "Administracao não encontrado." });
        return;
      }
      
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async deleteAdministracao(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const deleted: boolean = await this.administracaoRepository.deleteAdministracao(id);

      if (!deleted) {
        res.status(404).json({ message: "Administracao não encontrado." });
        return;
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default AdministracaoController;
