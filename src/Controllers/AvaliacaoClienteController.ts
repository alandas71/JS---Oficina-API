import AvaliacaoClienteRepository from "../Repositories/AvaliacaoClienteRepository";
import NotaAvaliacaoRepository from "../Repositories/NotaAvaliacaoRepository";
import { AvaliacaoClienteBody } from "Interfaces/AvaliacaoClienteBody";
import { Nota_Avaliacao } from "Models/NotaAvaliacaoModel";
import { Avaliacao_Cliente } from "Models/AvaliacaoClienteModel";
import { Request, Response } from "express";

class AvaliacaoClienteController {
  private avaliacaoClienteRepository: AvaliacaoClienteRepository;
  private notaAvaliacaoRepository: NotaAvaliacaoRepository;

  constructor() {
    this.avaliacaoClienteRepository = new AvaliacaoClienteRepository();
    this.notaAvaliacaoRepository = new NotaAvaliacaoRepository();
  }

  async getAvaliacaoClientes(req: Request, res: Response): Promise<void> {
    try {
      const avaliacaoClientes = await this.avaliacaoClienteRepository.getAvaliacaoClientes();
      res.status(200).json(avaliacaoClientes);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getAvaliacaoCliente(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const avaliacaoCliente = await this.avaliacaoClienteRepository.getAvaliacaoCliente(Number(id));
      res.status(200).json(avaliacaoCliente);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createAvaliacaoCliente(req: Request, res: Response): Promise<void> {
    const { Cliente_id, Agendamento_id, Tempo_espera, Servico, Atendimento, Satatisfacao, Recomendaria }: AvaliacaoClienteBody = req.body;
    try {
      const newNotaAvaliacao: Nota_Avaliacao = await this.notaAvaliacaoRepository.createNotaAvaliacao({
        Tempo_espera: Tempo_espera,
        Servico: Servico,
        Atendimento: Atendimento,
        Satatisfacao: Satatisfacao,
        Recomendaria: Recomendaria,
      })
      const newAvaliacaoCliente: Avaliacao_Cliente = await this.avaliacaoClienteRepository.createAvaliacaoCliente({
        Cliente_id: Cliente_id,
        Agendamento_id: Agendamento_id,
        Nota_Avaliacao_id: newNotaAvaliacao.id,
      });
      res.status(201).json({...newAvaliacaoCliente, ...newNotaAvaliacao});
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async updateUserAvaliacaoCliente(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const data = req.body;
      const updateUserAvaliacaoCliente = await this.avaliacaoClienteRepository.updateAvaliacaoCliente(data, Number(id));
      res.status(200).json(updateUserAvaliacaoCliente);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async deleteAvaliacaoCliente(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await this.avaliacaoClienteRepository.deleteAvaliacaoCliente(Number(id));
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }
}

export default AvaliacaoClienteController;
