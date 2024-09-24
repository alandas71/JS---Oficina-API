import db from "../../db/conn";
import { Documentos } from "../types/Models/DocumentosModel";

class DocumentosRepository {
  async getDocumentosById(id: number): Promise<Documentos | undefined> {
    return await db.table("Documentos").select("*").where("id", id).first();
  }

  async createDocumentos(data: Documentos): Promise<Documentos> {
    const result  = await db.table("Documentos").insert(data).returning('*');
    return result[0];
  }

  async updateDocumentos(data: Partial<Documentos>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Documentos").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteDocumentos(id: number): Promise<boolean> {
    const deletedRows = await db.table("Documentos").where("id", id).del();
    return !!deletedRows;
  }
}

export default DocumentosRepository;
