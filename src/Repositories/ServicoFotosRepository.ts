import db from "../../db/conn";
import { Servico_Fotos } from "../types/Models/ServicoFotosModel";

class ServicoFotosRepository {
  async getServicoFotoss(): Promise<Servico_Fotos[]> {
    return await db("Servico_Fotos").select("*");
  }

  async getServicoFotos(id: number): Promise<Servico_Fotos | undefined> {
    return await db("Servico_Fotos").select("*").where("id", id).first();
  }

  async createServicoFotos(data: Servico_Fotos): Promise<Servico_Fotos> {
    const [id] = await db("Servico_Fotos").insert(data);
    return await this.getServicoFotos(id);
  }

  async updateServicoFotos(data: Partial<Servico_Fotos>, id: number): Promise<boolean> {
    const updatedRows = await db("Servico_Fotos").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteServicoFotos(id: number): Promise<boolean> {
    const deletedRows = await db("Servico_Fotos").where("id", id).del();
    return !!deletedRows;
  }
}

export default ServicoFotosRepository;
