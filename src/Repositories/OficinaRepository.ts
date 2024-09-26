import db from "../../db/conn";
import { Oficina } from "Models/OficinaModel";

class OficinaRepository {
  async getOficinas(): Promise<Oficina[]> {
    return await db.table("Oficina").select("*");
  }

  async getOficina(id: number): Promise<Oficina | undefined> {
    return await db.table("Oficina").select("*").where("id", id).first();
  }

  async createOficina(data: Oficina): Promise<Oficina> {
    const result = await db.table("Oficina").insert(data).returning('*');
    return result[0];
  }

  async updateOficina(data: Partial<Oficina>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Oficina").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteOficina(id: number): Promise<boolean> {
    const deletedRows = await db.table("Oficina").where("id", id).del();
    return !!deletedRows;
  }
}

export default OficinaRepository;
