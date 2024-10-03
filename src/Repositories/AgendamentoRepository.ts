import db from "../../db/conn";
import { Agendamento } from "Models/AgendamentoModel";
import { Veiculo_Fotos } from "Models/VeiculoFotosModel";
import { Servico_Adicional } from "Models/ServicoAdicionalModel";
import { AgendamentoBody } from "Interfaces/AgendamentoBody";
import { Veiculo } from "Models/VeiculoModel";
import { Cliente } from "Models/ClienteModel";
import { Resumo, Servico } from "Interfaces/agendamentoStatusType";

class AgendamentoRepository {
  async getAgendamentos(): Promise<{
    id: number;
    ServicoId: number;
    Nome: string;
    Tipo: string;
    Placa: string;
    Modelo: string;
    Situacao: string;
    ServicosAdicionais: {ServicoAdicionalId: number, ServicoAdicionalAgendamentoId: number, ServicoAdicionalTipo: string, ServicoAdicionalSituacao: string}[];
  }[]> { 
    const agendamentos = await db('Agendamento')
      .join('Veiculo', 'Agendamento.Veiculo_id', 'Veiculo.id')
      .join('Cliente', 'Veiculo.Cliente_id', 'Cliente.id')
      .join('Servico_Veiculo', 'Veiculo.id', 'Servico_Veiculo.Veiculo_id')
      .join('Servico', 'Servico.id', 'Servico_Veiculo.Servico_id')
      .leftJoin('Agendamento_Servico_Adicional', 'Agendamento.id', 'Agendamento_Servico_Adicional.Agendamento_id')
      .leftJoin('Servico_Adicional', 'Agendamento_Servico_Adicional.Servico_Adicional_id', 'Servico_Adicional.id')
      .select(
        'Agendamento.id',
        'Cliente.Nome',
        'Servico.Tipo',
        'Veiculo.Placa',
        'Veiculo.Modelo',
        'Servico_Veiculo.Situacao',
        'Servico_Veiculo.id as ServicoId',
        'Servico_Adicional.Tipo as ServicoAdicionalTipo',
        'Servico_Adicional.Id as ServicoAdicionalId',
        'Agendamento_Servico_Adicional.Situacao as ServicoAdicionalSituacao',
        'Agendamento_Servico_Adicional.Id as ServicoAdicionalAgendamentoId'
      ).where("Servico_Veiculo.Arquivado", "nao");
  
    const agendamentosMap = new Map<number, {
      id: number;
      ServicoId: number;
      Nome: string;
      Tipo: string;
      Placa: string;
      Modelo: string;
      Situacao: string;
      ServicosAdicionais: {ServicoAdicionalId: number, ServicoAdicionalAgendamentoId: number, ServicoAdicionalTipo: string, ServicoAdicionalSituacao: string}[];
    }>();
  
    agendamentos.forEach(agendamento => {
      if (!agendamentosMap.has(agendamento.id)) {
        agendamentosMap.set(agendamento.id, {
          id: agendamento.id,
          ServicoId: agendamento.ServicoId,
          Nome: agendamento.Nome,
          Tipo: agendamento.Tipo,
          Placa: agendamento.Placa,
          Modelo: agendamento.Modelo,
          Situacao: agendamento.Situacao,
          ServicosAdicionais: []
        });
      }
  
      if (agendamento.ServicoAdicionalTipo) {
        agendamentosMap.get(agendamento.id)?.ServicosAdicionais.push({
          ServicoAdicionalTipo: agendamento.ServicoAdicionalTipo, 
          ServicoAdicionalId: agendamento.ServicoAdicionalId, 
          ServicoAdicionalAgendamentoId: agendamento.ServicoAdicionalAgendamentoId, 
          ServicoAdicionalSituacao: agendamento.ServicoAdicionalSituacao
        });
      }
    });
  
    return Array.from(agendamentosMap.values());
  }

  async getClienteAgendamentos(cpf: number, placa: string): Promise<Agendamento[]> {
    return await db.table("Agendamento").select("*").where({CPF: cpf, placa: placa});
  }
  
  async getAgendamentoResumo(id: number): Promise<{servico: Servico; resumo: Resumo;}> {
      const agendamento = await db('Agendamento')
      .join('Veiculo', 'Agendamento.Veiculo_id', 'Veiculo.id')
      .join('Cliente', 'Veiculo.Cliente_id', 'Cliente.id')
      .select(
        'Cliente.Nome',
        'Cliente.CPF',
        'Cliente.Email',
        'Cliente.Telefone',
        'Veiculo.Placa',
        'Veiculo.Modelo',
        'Veiculo.Cor',
        'Veiculo.Chassi',
        'Veiculo.Quilometragem',
        'Agendamento.Descricao as Descricao',
        'Agendamento.id',
        'Agendamento.Criado_em',
        'Agendamento.Endereco_entrega',
        'Agendamento.Observacao'
      )
      .where('Agendamento.id', id)
      .first();

    if (!agendamento) {
      return undefined;
    }

    const adicionais: Servico_Adicional[] = await db('Servico_Adicional')
      .select('Servico_Adicional.Tipo')
      .join('Agendamento_Servico_Adicional', 'Servico_Adicional.id', 'Agendamento_Servico_Adicional.Servico_Adicional_id')
      .where('Agendamento_Servico_Adicional.Agendamento_id', agendamento.id);

    return {
    servico: {
        Tipo: agendamento.Descricao,
        Adicionais: adicionais.map((adicional: Servico_Adicional) => adicional.Tipo).join(', ')
      },
      resumo: {
        Nome: agendamento.Nome,
        CPF: agendamento.CPF,
        Email: agendamento.Email,
        Telefone: agendamento.Telefone,
        Placa: agendamento.Placa,
        Modelo: agendamento.Modelo,
        Cor: agendamento.Cor,
        Chassi: agendamento.Chassi,
        Quilometragem: agendamento.Quilometragem,
        Criado_em: agendamento.Criado_em,
        Observacao: agendamento.Observacao,
        Endereco_entrega: agendamento.Endereco_entrega
      }
    };
  }
  
  async getAgendamentosStatus(cpf: number, placa: string, situacao: string): Promise<{ id: number; Nome: string; Placa: string; Modelo: string; Situacao: string; }[]> {
      const query = db('Agendamento')
          .join('Veiculo', 'Agendamento.Veiculo_id', 'Veiculo.id')
          .join('Cliente', 'Veiculo.Cliente_id', 'Cliente.id')
          .join('Servico_Veiculo', 'Veiculo.id', 'Servico_Veiculo.Veiculo_id')
          .select(
              'Servico_Veiculo.Situacao',
              'Cliente.Nome',
              'Veiculo.Placa',
              'Veiculo.Modelo',
              'Agendamento.id',
              'Agendamento.Servico_Situacao'
          )
          .where('Cliente.CPF', cpf)
          .andWhere('Veiculo.Placa', placa);
    
      if (situacao) {
          query.andWhere('Servico_Veiculo.Situacao', situacao);
      }

      const agendamentos = await query;

      if (!agendamentos.length) {
          return [];
      }

      return agendamentos.map(agendamento => ({
          id: agendamento.id,
          Nome: agendamento.Nome,
          Placa: agendamento.Placa,
          Modelo: agendamento.Modelo,
          Situacao: agendamento.Situacao,
          Servico_Situacao: agendamento.Servico_Situacao
      }));
  }

  
  async getAgendamento(id: number): Promise<AgendamentoBody> {
    const agendamento: Agendamento = await db.table("Agendamento")
        .select("Agendamento.*", "Servico.Tipo as Tipo_servico")
        .where("id", id)
        .leftJoin("Servico", "Agendamneto.Servico_id", "Servico.id")
        .first();
                                            
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
        Servico_Situacao: agendamento.Servico_Situacao,
        Oficina_id: agendamento.Oficina_id,
        Servico_id: agendamento.Servico_id,
        Tipo_servico: agendamento.Tipo_servico,
        Veiculo_id: agendamento.Veiculo_id,
        Descricao: agendamento.Descricao,
        Endereco_entrega: agendamento.Endereco_entrega,
        Data_Hora: agendamento.Data_Hora,
        Observacao: agendamento.Observacao,
        Criado_em: agendamento.Criado_em,
        Atualizado_em: agendamento.Atualizado_em
      },
      Fotos: fotos.map((foto: Veiculo_Fotos) => ({
        id: foto.id,
        Veiculo_id: foto.Veiculo_id,
        Foto_url: foto.Foto_url,
        Situacao: foto.Situacao,
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
  
  async updatePrazoAgendamento(previsao: Date | string, id: number): Promise<boolean> {
    const updatedRows = await db.table("Agendamento").where("id", id).update({Previsao_entrega: previsao});
    return !!updatedRows;
  }  

  async deleteAgendamento(id: number): Promise<boolean> {
    const deletedRows = await db.table("Agendamento").where("id", id).del();
    return !!deletedRows;
  }
}

export default AgendamentoRepository;
