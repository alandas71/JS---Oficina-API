import db from "../../db/conn";
import { Servico } from "../types/Models/ServicosModel";

class ServicoRepository {
  async getServicos(): Promise<Servico[]> {
    return await db.table("Servico").select("*");
  }

  async getServico(id: number): Promise<Servico | undefined> {
    return await db.table("Servico").select("*").where("id", id).first();
  }

  async createServico(data: Servico): Promise<Servico> {
    const [id] = await db.table("Servico").insert(data);
    return await this.getServico(id);
  }

  async updateServico(data: Partial<Servico>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Servico").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteServico(id: number): Promise<boolean> {
    const deletedRows = await db.table("Servico").where("id", id).del();
    return !!deletedRows;
  }
}

export default ServicoRepository;
