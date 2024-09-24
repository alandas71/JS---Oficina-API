import db from "../../db/conn";
import { Veiculo } from "../types/Models/VeiculoModel";

class VeiculoRepository {
  async getVeiculos(): Promise<Veiculo[]> {
    return await db("Veiculo").select("*");
  }

  async getVeiculo(id: number): Promise<Veiculo | undefined> {
    return await db("Veiculo").select("*").where("id", id).first();
  }

  async createVeiculo(data: Veiculo): Promise<Veiculo> {
    const [id] = await db("Veiculo").insert(data);
    return await this.getVeiculo(id);
  }

  async updateVeiculo(data: Partial<Veiculo>, id: number): Promise<boolean> {
    const updatedRows = await db("Veiculo").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteVeiculo(id: number): Promise<boolean> {
    const deletedRows = await db("Veiculo").where("id", id).del();
    return !!deletedRows;
  }
}

export default VeiculoRepository;
