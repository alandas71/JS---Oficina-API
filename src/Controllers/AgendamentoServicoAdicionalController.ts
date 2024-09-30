import AgendamentoServicoAdicionalRepository from "../Repositories/AgendamentoServicoAdicionalRepository";
import { Agendamento_Servico_Adicional } from "/Models/AgendamentoServicoAdicionalModel";
import { Servico_Adicional } from "Models/ServicoAdicionalModel";
import { Request, Response } from "express";

class AgendamentoServicoAdicionalController {
  private servicoRepository: AgendamentoServicoAdicionalRepository;

  constructor() {
    this.servicoRepository = new AgendamentoServicoAdicionalRepository();
  }

  async getAgendamentoServicoAdicionals(req: Request, res: Response): Promise<void> {
    try {
      const servicos: Agendamento_Servico_Adicional[] = await this.servicoRepository.getAgendamentoServicoAdicionais();
      res.status(200).json(servicos);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getAgendamentoServicoAdicional(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const servico: Agendamento_Servico_Adicional | undefined = await this.servicoRepository.getAgendamentoServicoAdicional(id);
      
      if (!servico) {
        res.status(404).json({ message: "AgendamentoServicoAdicional não encontrado." });
        return;
      }

      res.status(200).json(servico);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createAgendamentoServicoAdicional(req: Request, res: Response): Promise<void> {
    const data: Agendamento_Servico_Adicional = req.body;
    try {
      const newAgendamentoServicoAdicional: Servico_Adicional = await this.servicoRepository.createAgendamentoServicoAdicional(data);
      res.status(201).json(newAgendamentoServicoAdicional);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async updateAgendamentoServicoAdicional(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const data: Partial<Agendamento_Servico_Adicional> = req.body;
      const updatedRow: boolean = await this.servicoRepository.updateAgendamentoServicoAdicional(data, id);
      
      if (!updatedRow) {
        res.status(404).json({ message: "AgendamentoServicoAdicional não encontrado." });
        return;
      }
      
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async deleteAgendamentoServicoAdicional(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const deleted: boolean = await this.servicoRepository.deleteAgendamentoServicoAdicional(id);

      if (!deleted) {
        res.status(404).json({ message: "AgendamentoServicoAdicional não encontrado." });
        return;
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default AgendamentoServicoAdicionalController;
