import db from "../../db/conn";
import { Administracao } from "../types/Models/AdministracaoModel";

class AdministracaoRepository {
  async getAdministracaoLogin(usuario: string, senha: string): Promise<Administracao> {
    return await db.table("Administracao").select("*").where({Usuario: usuario, Senha: senha}).first();
  }

  async getAdministracoes(): Promise<Administracao[]> {
    return await db.table("Administracao")
      .select(
        "id",
        "Usuario",
        "Tipo",
        "Email",
        "Telefone",
        db.raw(`CASE WHEN "Tipo" <> 'administrador' THEN "Senha" ELSE NULL END AS "Senha"`),
        "Situacao"
      );
  }
  
  async getAdministracao(id: number): Promise<Administracao | undefined> {
    return await db.table("Administracao")
      .select(
        "id",
        "Usuario",
        "Tipo",
        "Email",
        "Telefone",
        db.raw(`CASE WHEN "Tipo" <> 'administrador' THEN "Senha" ELSE NULL END AS "Senha"`),
        "Situacao"
      )
      .where("id", id)
      .first();
  }  

  async createAdministracao(data: Administracao): Promise<Administracao> {
    const result = await db.table("Administracao").insert(data).returning('*');
    return result[0];
  }

  async updateAdministracao(data: Partial<Administracao>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Administracao").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteAdministracao(id: number): Promise<boolean> {
    const deletedRows = await db.table("Administracao").where("id", id).del();
    return !!deletedRows;
  }
}

export default AdministracaoRepository;
