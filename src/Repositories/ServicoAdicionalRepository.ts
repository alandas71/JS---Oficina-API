import db from "../../db/conn";
import { Servico_Adicional } from "../types/Models/ServicoAdicionalModel";

class ServicoAdicionalRepository {
  async getServicosAdicionais(): Promise<Servico_Adicional[]> {
    return await db.table("Servico_Adicional").select("*");
  }

  async getServicoAdicional(id: number): Promise<Servico_Adicional | undefined> {
    return await db.table("Servico_Adicional").select("*").where("id", id).first();
  }

  async createServicoAdicional(data: Servico_Adicional): Promise<Servico_Adicional> {
    const result = await db.table("Servico_Adicional").insert(data).returning('*');
    return result[0];
  }

  async updateServicoAdicional(data: Partial<Servico_Adicional>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Servico_Adicional").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteServicoAdicional(id: number): Promise<boolean> {
    const deletedRows = await db.table("Servico_Adicional").where("id", id).del();
    return !!deletedRows;
  }
}

export default ServicoAdicionalRepository;
