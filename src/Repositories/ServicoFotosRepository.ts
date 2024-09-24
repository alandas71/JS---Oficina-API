import db from "../../db/conn";
import { Servico_Fotos } from "../types/Models/ServicoFotosModel";

class ServicoFotosRepository {
  async getServicoFotoss(): Promise<Servico_Fotos[]> {
    return await db.table("Servico_Fotos").select("*");
  }

  async getServicoFotos(id: number): Promise<Servico_Fotos | undefined> {
    return await db.table("Servico_Fotos").select("*").where("id", id).first();
  }

  async createServicoFotos(data: Servico_Fotos): Promise<Servico_Fotos> {
    const result = await db.table("Servico_Fotos").insert(data).returning('*');
    return result[0];
  }

  async updateServicoFotos(data: Partial<Servico_Fotos>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Servico_Fotos").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteServicoFotos(id: number): Promise<boolean> {
    const deletedRows = await db.table("Servico_Fotos").where("id", id).del();
    return !!deletedRows;
  }
}

export default ServicoFotosRepository;
