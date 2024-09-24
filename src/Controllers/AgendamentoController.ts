import AgendamentoRepository from "../Repositories/AgendamentoRepository";
import { Agendamento } from "Models/AgendamentoModel";
import { Request, Response } from "express";

class AgendamentoController {
  private agendamentoRepository: AgendamentoRepository;

  constructor() {
    this.agendamentoRepository = new AgendamentoRepository();
  }

  async getAgendamentos(req: Request, res: Response): Promise<void> {
    try {
      const agendamentos: Agendamento[] = await this.agendamentoRepository.getAgendamentos();
      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getAgendamento(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const agendamento: Agendamento | undefined = await this.agendamentoRepository.getAgendamento(id);
      
      if (!agendamento) {
        res.status(404).json({ message: "Agendamento não encontrado." });
        return;
      }

      res.status(200).json(agendamento);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createAgendamento(req: Request, res: Response): Promise<void> {
    const data: Agendamento = req.body;
    try {
      const newAgendamento: Agendamento = await this.agendamentoRepository.createAgendamento(data);
      res.status(201).json(newAgendamento);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async updateAgendamento(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const data: Partial<Agendamento> = req.body;
      const updatedRow: boolean = await this.agendamentoRepository.updateAgendamento(data, id);
      
      if (!updatedRow) {
        res.status(404).json({ message: "Agendamento não encontrado." });
        return;
      }
      
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async deleteAgendamento(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const deleted: boolean = await this.agendamentoRepository.deleteAgendamento(id);

      if (!deleted) {
        res.status(404).json({ message: "Agendamento não encontrado." });
        return;
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default AgendamentoController;
