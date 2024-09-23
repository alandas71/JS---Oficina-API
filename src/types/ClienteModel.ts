export interface Cliente {
  id?: number;
  Nome: string;
  CPF: number;
  Email: string;
  Telefone: number;
  Situacao: "ativo" | "inativo";
  Criado_em: Date;
  Atualizado_em: Date;
}
