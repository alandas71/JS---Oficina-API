import db from "../../db/conn";
import { Agendamento } from "../types/Models/AgendamentoModel";

class AgendamentoRepository {
  async getAgendamentos(): Promise<Agendamento[]> {
    return await db.table("Agendamento").select("*");
  }

  async getAgendamento(id: number): Promise<Agendamento | undefined> {
    return await db.table("Agendamento").select("*").where("id", id).first();
  }

  async createAgendamento(data: Agendamento): Promise<Agendamento> {
    const result  = await db.table("Agendamento").insert(data).returning('*');
    return result[0];
  }

  async updateAgendamento(data: Partial<Agendamento>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Agendamento").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteAgendamento(id: number): Promise<boolean> {
    const deletedRows = await db.table("Agendamento").where("id", id).del();
    return !!deletedRows;
  }
}

export default AgendamentoRepository;
