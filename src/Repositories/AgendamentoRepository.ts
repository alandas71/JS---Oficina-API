import db from "../../db/conn";
import { Agendamento } from "Models/AgendamentoModel";
import { Veiculo_Fotos } from "Models/VeiculoFotosModel";
import { Servico_Adicional } from "Models/ServicoAdicionalModel";
import { AgendamentoBody } from "Interfaces/AgendamentoBody";
import { Veiculo } from "Models/VeiculoModel";
import { Cliente } from "Models/ClienteModel";

class AgendamentoRepository {
  async getAgendamentos(): Promise<Agendamento[]> {
    return await db.table("Agendamento").select("*");
  }

  async getAgendamento(id: number): Promise<AgendamentoBody> {
    const agendamento: Agendamento = await db.table("Agendamento").select("*").where("id", id).first();
  
    if (!agendamento) {
      return undefined;
    }
  
    const veiculo: Veiculo = await db.table("Veiculo").select("*").where("id", agendamento.Veiculo_id).first();
    const cliente: Cliente = await db.table("Cliente").select("*").where("id", veiculo.Cliente_id).first();
    const fotos: Veiculo_Fotos[] = await db.table("Veiculo_Fotos").select("*").where("Veiculo_id", veiculo.id);

    const adicionais: Servico_Adicional[] = await db.table("Servico_Adicional")
      .select("Servico_Adicional.id", "Servico_Adicional.Tipo")
      .join("Agendamento_Servico_Adicional", "Servico_Adicional.id", "Agendamento_Servico_Adicional.Servico_Adicional_id")
      .where("Agendamento_Servico_Adicional.Agendamento_id", agendamento.id);
  
    return {
      Veiculo: {
        id: veiculo.id,
        Cliente_id: veiculo.Cliente_id,
        Placa: veiculo.Placa,
        Marca: veiculo.Marca,
        Modelo: veiculo.Modelo,
        Caracteristicas: veiculo.Caracteristicas,
        Ano_Modelo: veiculo.Ano_Modelo,
        Cor: veiculo.Cor,
        Chassi: veiculo.Chassi,
        Quilometragem: veiculo.Quilometragem,
        Criado_em: veiculo.Criado_em,
        Atualizado_em: veiculo.Atualizado_em
      },
      Cliente: {
        id: cliente.id,
        Nome: cliente.Nome,
        CPF: cliente.CPF,
        Email: cliente.Email,
        Telefone: cliente.Telefone,
        Situacao: cliente.Situacao,
        Criado_em: cliente.Criado_em,
        Atualizado_em: cliente.Atualizado_em
      },
      Agendamento: {
        id: agendamento.id,
        Oficina_id: agendamento.Oficina_id,
        Servico_id: agendamento.Servico_id,
        Veiculo_id: agendamento.Veiculo_id,
        Descricao: agendamento.Descricao,
        Endereco_entrega: agendamento.Endereco_entrega,
        Observacao: agendamento.Observacao,
        Criado_em: agendamento.Criado_em,
        Atualizado_em: agendamento.Atualizado_em
      },
      Fotos: fotos.map((foto: Veiculo_Fotos) => ({
        id: foto.id,
        Veiculo_id: foto.Veiculo_id,
        Foto_url: foto.Foto_url,
        Criado_em: foto.Criado_em,
        Atualizado_em: foto.Atualizado_em
      })),
      Adicionais: adicionais.map((adicional: Servico_Adicional) => ({
        id: adicional.id,
        Tipo: adicional.Tipo
      }))
    };
  }
  

  async createAgendamento(data: Agendamento): Promise<Agendamento> {
    const result  = await db.table("Agendamento").insert(data).returning('*');
    return result[0];
  }

  async updateAgendamento(data: Partial<Agendamento>, id: number): Promise<boolean> {
    const updatedRows = await db.table("Agendamento").where("id", id).update(data);
    return !!updatedRows;
  }  

  async deleteAgendamento(id: number): Promise<boolean> {
    const deletedRows = await db.table("Agendamento").where("id", id).del();
    return !!deletedRows;
  }
}

export default AgendamentoRepository;
