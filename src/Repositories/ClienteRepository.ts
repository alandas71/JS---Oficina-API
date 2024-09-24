import db from "../../db/conn";
import { Cliente } from "../types/Models/ClienteModel";

class ClienteRepository {
  async getClientes(): Promise<Cliente[]> {
    return await db.table("Cliente").select("*");
  }

  async getCliente(id: number): Promise<Cliente | undefined> {
    return await db.table("Cliente").select("*").where("id", id).first();
  }

  async createCliente(data: Cliente): Promise<Cliente> {
    const result = await db.table("Cliente").insert(data).returning('*');
    return result[0];
  }

  async updateCliente(data: Partial<Cliente>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Cliente").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteCliente(id: number): Promise<boolean> {
    const deletedRows = await db.table("Cliente").where("id", id).del();
    return !!deletedRows;
  }
}

export default ClienteRepository;
