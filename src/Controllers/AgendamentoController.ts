import AgendamentoRepository from "../Repositories/AgendamentoRepository";
import { Agendamento } from "Models/AgendamentoModel";
import { Request, Response } from "express";
import { AgendamentoRequest } from "Interfaces/AgendamentoRequest";
import { AgendamentoBody } from "Interfaces/AgendamentoBody";
import { Servico_Adicional } from "Models/ServicoAdicionalModel";
import AgendamentoServicoAdicionalRepository from "../Repositories/AgendamentoServicoAdicionalRepository";
import { Veiculo_Fotos } from "Models/VeiculoFotosModel";
import VeiculoFotosRepository from "../Repositories/VeiculoFotosRepository";
import uploadImagens from "../helpers/uploadImagens";

class AgendamentoController {
  private agendamentoRepository: AgendamentoRepository;
  private agendamentoServicoAdicionalRepository: AgendamentoServicoAdicionalRepository;
  private veiculoFotosRepository: VeiculoFotosRepository;

  constructor() {
    this.agendamentoRepository = new AgendamentoRepository();
    this.veiculoFotosRepository = new VeiculoFotosRepository();
    this.agendamentoServicoAdicionalRepository = new AgendamentoServicoAdicionalRepository();
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

  async createAgendamento(req: AgendamentoRequest, res: Response): Promise<void> {
    const data: AgendamentoBody = req.body;
    let fotos: Veiculo_Fotos[] = [];
    let adicionais: Servico_Adicional[] = [];

      try {
          const newAgendamento: Agendamento = await this.agendamentoRepository.createAgendamento(data.Agendamento);
          
          adicionais = await Promise.all(
              data.Adicionais.map((adicional: Servico_Adicional) => 
                  this.agendamentoServicoAdicionalRepository.createAgendamentoServicoAdicional({
                      Agendamento_id: newAgendamento.id,
                      Servico_Adicional_id: adicional.id,
                  })
              )
          );

          if (req.files && Object.keys(req.files).length > 0) {
              const uploadedImages: any = await uploadImagens(req.files.images);
              
              const images: string[] = uploadedImages.fileContents.filter((image: string, index: number) => index < 8); // Limite 8 imagens

              fotos = await Promise.all(images.map(async (image: string) => {
                  if (image) { 
                      const dataImages: Veiculo_Fotos = {
                          Veiculo_id: data.Agendamento.Servico_id,
                          Foto_url: image
                      };
                      return await this.veiculoFotosRepository.createVeiculoFotos(dataImages);
                  }
                  return null;
              }));

              fotos = fotos.filter(foto => foto !== null) as Veiculo_Fotos[];
          }

          const responseData: AgendamentoBody = {
              Agendamento: newAgendamento,
              Fotos: fotos,
              Adicionais: adicionais,
          };
          
          res.status(201).json(responseData);
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
