import db from "../../db/conn";
import { Servico_Veiculo } from "../types/Models/ServicoVeiculoModel";

class ServicoVeiculoRepository {
  async getServicoVeiculos(): Promise<Servico_Veiculo[]> {
    return await db.table("Servico_Veiculo").select("*");
  }

  async getServicoVeiculo(id: number): Promise<Servico_Veiculo | undefined> {
    return await db.table("Servico_Veiculo").select("*").where("id", id).first();
  }

  async createServicoVeiculo(data: Servico_Veiculo): Promise<Servico_Veiculo> {
    const result = await db.table("Servico_Veiculo").insert(data).returning('*');
    return result[0];
  }

  async updateServicoVeiculo(data: Partial<Servico_Veiculo>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Servico_Veiculo").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteServicoVeiculo(id: number): Promise<boolean> {
    const deletedRows = await db.table("Servico_Veiculo").where("id", id).del();
    return !!deletedRows;
  }
}

export default ServicoVeiculoRepository;
