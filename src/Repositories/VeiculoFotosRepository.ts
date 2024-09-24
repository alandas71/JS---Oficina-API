import db from "../../db/conn";
import { Veiculo_Fotos } from "../types/Models/VeiculoFotosModel";

class VeiculoFotosRepository {
  async getVeiculoFotoss(): Promise<Veiculo_Fotos[]> {
    return await db.table("Veiculo_Fotos").select("*");
  }

  async getVeiculoFotos(id: number): Promise<Veiculo_Fotos | undefined> {
    return await db.table("Veiculo_Fotos").select("*").where("id", id).first();
  }

  async createVeiculoFotos(data: Veiculo_Fotos): Promise<Veiculo_Fotos> {
    const result = await db.table("Veiculo_Fotos").insert(data).returning('*');
    return result[0];
  }

  async updateVeiculoFotos(data: Partial<Veiculo_Fotos>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Veiculo_Fotos").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteVeiculoFotos(id: number): Promise<boolean> {
    const deletedRows = await db.table("Veiculo_Fotos").where("id", id).del();
    return !!deletedRows;
  }
}

export default VeiculoFotosRepository;
