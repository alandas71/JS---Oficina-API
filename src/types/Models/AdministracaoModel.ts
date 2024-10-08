export interface Administracao {
  id?: number;
  Usuario: string;
  Email?: string;
  Telefone?: number;
  Senha: string;
  Tipo: string; // administrador / colaborador / mecanico
  Situacao: string;
  Criado_em?: Date;
  Atualizado_em?: Date;
}
