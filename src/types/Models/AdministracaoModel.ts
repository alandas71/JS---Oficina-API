export interface Administracao {
  id?: number;
  Usuario: string;
  Senha: number;
  Tipo: string; // administrador / colaborador / mecanico
  Situacao: string;
  Criado_em?: Date;
  Atualizado_em?: Date;
}
