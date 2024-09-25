import db from "../../db/conn";
import { Nota_Avaliacao } from "../types/Models/NotaAvaliacaoModel";

class NotaAvaliacaoRepository {
  async getNotaAvaliacaos(): Promise<Nota_Avaliacao[]> {
    return await db.table("Nota_Avaliacao").select("*");
  }

  async getNotaAvaliacao(id: number): Promise<Nota_Avaliacao | undefined> {
    return await db.table("Nota_Avaliacao").select("*").where("id", id).first();
  }

  async createNotaAvaliacao(data: Nota_Avaliacao): Promise<Nota_Avaliacao> {
    const result = await db.table("Nota_Avaliacao").insert(data).returning('*');
    return result[0];
  }

  async updateNotaAvaliacao(data: Partial<Nota_Avaliacao>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Nota_Avaliacao").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteNotaAvaliacao(id: number): Promise<boolean> {
    const deletedRows = await db.table("Nota_Avaliacao").where("id", id).del();
    return !!deletedRows;
  }
}

export default NotaAvaliacaoRepository;
