import db from "../../db/conn";
import { Agendamento_Servico_Adicional } from "../types/Models/AgendamentoServicoAdicionalModel";
import { Servico_Adicional } from "Models/ServicoAdicionalModel";
import ServicoAdicionalRepository from "./ServicoAdicionalRepository";

class AgendamentoServicoAdicionalRepository {
  private servicoAdicionalRepository: ServicoAdicionalRepository;

  constructor() {
    this.servicoAdicionalRepository = new ServicoAdicionalRepository();
  }

  async getAgendamentoServicoAdicionais(): Promise<Agendamento_Servico_Adicional[]> {
    return await db.table("Agendamento_Servico_Adicional").select("*");
  }

  async getAgendamentoServicoAdicional(id: number): Promise<Agendamento_Servico_Adicional | undefined> {
    return await db.table("Agendamento_Servico_Adicional").select("*").where("id", id).first();
  }

  async createAgendamentoServicoAdicional(data: Agendamento_Servico_Adicional): Promise<Servico_Adicional> {
    const [Servico_Adicional_id] = await db.table("Agendamento_Servico_Adicional").insert(data);
    return await this.servicoAdicionalRepository.getServicoAdicional(Servico_Adicional_id);
  }

  async updateAgendamentoServicoAdicional(data: Partial<Agendamento_Servico_Adicional>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Agendamento_Servico_Adicional").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteAgendamentoServicoAdicional(id: number): Promise<boolean> {
    const deletedRows = await db.table("Agendamento_Servico_Adicional").where("id", id).del();
    return !!deletedRows;
  }
}

export default AgendamentoServicoAdicionalRepository;
