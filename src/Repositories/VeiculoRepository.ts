import db from "../../db/conn";
import { Veiculo } from "../types/Models/VeiculoModel";

class VeiculoRepository {
  async getVeiculos(): Promise<Veiculo[]> {
    return await db.table("Veiculo").select("*");
  }

  async getVeiculo(id: number): Promise<Veiculo | undefined> {
    return await db.table("Veiculo").select("*").where("id", id).first();
  }

  async createVeiculo(data: Veiculo): Promise<Veiculo> {
    const result = await db.table("Veiculo").insert(data).returning('*');
    return result[0];
  }

  async updateVeiculo(data: Partial<Veiculo>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Veiculo").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteVeiculo(id: number): Promise<boolean> {
    const deletedRows = await db.table("Veiculo").where("id", id).del();
    return !!deletedRows;
  }
}

export default VeiculoRepository;
