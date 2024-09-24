import db from "../../db/conn";
import { Agendamento } from "../types/Models/AgendamentoModel";

class AgendamentoRepository {
  async getAgendamentos(): Promise<Agendamento[]> {
    return await db("Agendamento").select("*");
  }

  async getAgendamento(id: number): Promise<Agendamento | undefined> {
    return await db("Agendamento").select("*").where("id", id).first();
  }

  async createAgendamento(data: Agendamento): Promise<Agendamento> {
    const [id] = await db("Agendamento").insert(data);
    return await this.getAgendamento(id);
  }

  async updateAgendamento(data: Partial<Agendamento>, id: number): Promise<boolean> {
    const updatedRows = await db("Agendamento").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteAgendamento(id: number): Promise<boolean> {
    const deletedRows = await db("Agendamento").where("id", id).del();
    return !!deletedRows;
  }
}

export default AgendamentoRepository;
