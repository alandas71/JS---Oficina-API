import AgendamentoRepository from "../Repositories/AgendamentoRepository";
import { Agendamento } from "Models/AgendamentoModel";
import { Request, Response } from "express";
import AgendamentoServicoAdicionalRepository from "../Repositories/AgendamentoServicoAdicionalRepository";
import MarcaVeiculoRepository from "../Repositories/MarcaVeiculoRepository";
import ClienteRepository from "../Repositories/ClienteRepository";
import VeiculoRepository from "../Repositories/VeiculoRepository";
import VeiculoFotosRepository from "../Repositories/VeiculoFotosRepository";
import ServicoVeiculoRepository from "../Repositories/ServicoVeiculoRepository";
import { AgendamentoCreateRequest } from "Interfaces/AgendamentoCreateRequest";
import { AgendamentoBody } from "Interfaces/AgendamentoBody";
import { Resumo, Servico } from "Interfaces/agendamentoStatusType";
import { Servico_Adicional } from "Models/ServicoAdicionalModel";
import { Veiculo_Fotos } from "Models/VeiculoFotosModel";
import { Veiculo } from "Models/VeiculoModel";
import { Cliente } from "Models/ClienteModel";
import uploadImagens from "../helpers/uploadImagens";
import { Servico_Veiculo } from "Models/ServicoVeiculoModel";

class AgendamentoController {
  private agendamentoRepository: AgendamentoRepository;
  private clienteRepository: ClienteRepository;
  private agendamentoServicoAdicionalRepository: AgendamentoServicoAdicionalRepository;
  private veiculoRepository: VeiculoRepository;
  private veiculoFotosRepository: VeiculoFotosRepository;
  private servicoVeiculoRepository: ServicoVeiculoRepository;
  private marcaVeiculoRepository: MarcaVeiculoRepository;

  constructor() {
    this.agendamentoRepository = new AgendamentoRepository();
    this.clienteRepository = new ClienteRepository();
    this.veiculoRepository = new VeiculoRepository();
    this.veiculoFotosRepository = new VeiculoFotosRepository();
    this.servicoVeiculoRepository = new ServicoVeiculoRepository();
    this.agendamentoServicoAdicionalRepository = new AgendamentoServicoAdicionalRepository();
    this.marcaVeiculoRepository = new MarcaVeiculoRepository();
  }

  async getAgendamentos(req: Request, res: Response): Promise<void> {
    try {
      const agendamentos: { id: number; ServicoId: number; Foto_url: string; Nome: string; Placa: string; Modelo: string; Situacao: string; }[] = await this.agendamentoRepository.getAgendamentos();
      res.status(200).json(agendamentos);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getAgendamentosStatus(req: Request, res: Response): Promise<void> {
    try {
      const { cpf, placa } = req.params;
      const { situacao } = req.query;

      const agendamentos: { id: number; Nome: string; Placa: string; Modelo: string; Situacao: string; Previsao_entrega: string;  }[] | [] = await this.agendamentoRepository.getAgendamentosStatus(Number(cpf), placa, situacao?.toString());
      
      if (!agendamentos) {
        res.status(404).json({ message: "Agendamentos não encontrados." });
        return;
      }

      res.status(200).json(agendamentos);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getAgendamento(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const agendamento: AgendamentoBody | undefined = await this.agendamentoRepository.getAgendamento(id);
      
      if (!agendamento) {
        res.status(404).json({ message: "Agendamento não encontrado." });
        return;
      }

      res.status(200).json(agendamento);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async getAgendamentoResumo(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const agendamento: {servico: Servico; resumo: Resumo;} | undefined = await this.agendamentoRepository.getAgendamentoResumo(id);
      
      if (!agendamento) {
        res.status(404).json({ message: "Agendamento não encontrado." });
        return;
      }

      res.status(200).json(agendamento);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async createAgendamento(req: AgendamentoCreateRequest, res: Response): Promise<void> {
    let data: AgendamentoBody = req.body;

    let fotos: Veiculo_Fotos[] = [];
    let servicoVeiculo: Servico_Veiculo = null;
    let adicionais: Servico_Adicional[] = [];

    try {
      const newCliente: Cliente = await this.clienteRepository.createCliente({
        Nome: data.Cliente.Nome,
        CPF: data.Cliente.CPF,
        Email: data.Cliente.Email,
        Telefone: data.Cliente.Telefone,
        Situacao: "ativo",

      });
      if (newCliente) data.Veiculo.Cliente_id = newCliente.id;
      if (typeof +data.Veiculo.Marca === "number") {
        const info = await this.marcaVeiculoRepository.getMarcaInfo(+data.Veiculo.Marca);
        const modeloEncontrado = info.data.modelos.find((modelo: any) => modelo.codigo === +data.Veiculo.Modelo);
        data.Veiculo.Modelo = modeloEncontrado.nome;
      } 
      const newVeiculo: Veiculo = await this.veiculoRepository.createVeiculo({
        Placa: data.Veiculo.Placa,
        Marca: data.Veiculo.Marca,
        Modelo: data.Veiculo.Modelo,
        Caracteristicas: data.Veiculo.Caracteristicas,
        Ano_Modelo: data.Veiculo.Ano_Modelo,
        Cor: data.Veiculo.Cor,
        Chassi: data.Veiculo.Chassi,
        Quilometragem: data.Veiculo.Quilometragem,
        Cliente_id: data.Veiculo.Cliente_id
      })
      if (newVeiculo) {
        data.Agendamento.Veiculo_id = newVeiculo.id;
        data.Agendamento.Data_Hora = new Date(data.Agendamento.Data_Hora).toISOString();
        servicoVeiculo = await this.servicoVeiculoRepository.createServicoVeiculo({
          Veiculo_id: newVeiculo.id,
          Servico_id: data.Agendamento.Servico_id,
          Situacao: "pendente"
        }) 
      }

      const newAgendamento: Agendamento = await this.agendamentoRepository.createAgendamento(data.Agendamento);

      if (!newVeiculo || !newAgendamento || !newCliente) {
        res.status(500).json({ message: "Erro interno ao realizar agendamento." });
        return;
      }

      adicionais = await Promise.all(
          data.Adicionais.map((adicional: Servico_Adicional) => 
              this.agendamentoServicoAdicionalRepository.createAgendamentoServicoAdicional({
                  Agendamento_id: newAgendamento.id,
                  Servico_Adicional_id: adicional.id,
                  Situacao: "fazendo"
              })
          )
      );

      if (req.files && Object.keys(req.files).length > 0) {
          const fotosArchives = req.files.Fotos || req.files['Fotos[0]'];
          const uploadedImages: any = await uploadImagens(fotosArchives);
          const images: string[] = uploadedImages.fileContents.filter((image: string, index: number) => index < 8); // Limite 8 imagens
          
          fotos = await Promise.all(images.map(async (image: string) => {
              if (image) { 
                  const dataImages: Veiculo_Fotos = {
                      Veiculo_id: newVeiculo.id,
                      Foto_url: image,
                      Situacao: "checar"
                  };
                  return await this.veiculoFotosRepository.createVeiculoFotos(dataImages);
              }
              return null;
          }));

          fotos = fotos.filter(foto => foto !== null) as Veiculo_Fotos[];
      }

      const responseData: AgendamentoBody = {
          Veiculo: newVeiculo,
          Cliente: newCliente,
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
      
      res.sendStatus(200);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor." });
    }
  }

  async updatePrazoAgendamento(req: Request, res: Response): Promise<void> {
    try {
      const id: number = Number(req.params.id);
      const data = req.body;
      const updatedRow: boolean = await this.agendamentoRepository.updatePrazoAgendamento(data.Previsao_entrega, id);

      if (!updatedRow) {
        res.status(404).json({ message: "Agendamento não encontrado." });
        return;
      }
      
      res.sendStatus(200);
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
