import db from "../../db/conn";
import { Avaliacao_Cliente } from "../types/Models/AvaliacaoClienteModel";

class AvaliacaoClienteRepository {
  async getAvaliacaoClientes(): Promise<Avaliacao_Cliente[]> {
    return await db.table("Avaliacao_Cliente").select("*");
  }

  async getAvaliacaoCliente(id: number): Promise<Avaliacao_Cliente | undefined> {
    return await db.table("Avaliacao_Cliente").select("*").where("id", id).first();
  }

  async createAvaliacaoCliente(data: Avaliacao_Cliente): Promise<Avaliacao_Cliente> {
    const result = await db.table("Avaliacao_Cliente").insert(data).returning('*');
    return result[0];
  }

  async updateAvaliacaoCliente(data: Partial<Avaliacao_Cliente>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Avaliacao_Cliente").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteAvaliacaoCliente(id: number): Promise<boolean> {
    const deletedRows = await db.table("Avaliacao_Cliente").where("id", id).del();
    return !!deletedRows;
  }
}

export default AvaliacaoClienteRepository;
