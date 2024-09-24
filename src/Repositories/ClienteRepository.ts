import db from "../../db/conn";
import { Cliente } from "../types/Models/ClienteModel";

class ClienteRepository {
  async getClientes(): Promise<Cliente[]> {
    return await db("Cliente").select("*");
  }

  async getCliente(id: number): Promise<Cliente | undefined> {
    return await db("Cliente").select("*").where("id", id).first();
  }

  async createCliente(data: Cliente): Promise<Cliente> {
    const [id] = await db("Cliente").insert(data);
    return await this.getCliente(id);
  }

  async updateCliente(data: Partial<Cliente>, id: number): Promise<boolean> {
    const updatedRows = await db("Cliente").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteCliente(id: number): Promise<boolean> {
    const deletedRows = await db("Cliente").where("id", id).del();
    return !!deletedRows;
  }
}

export default ClienteRepository;
