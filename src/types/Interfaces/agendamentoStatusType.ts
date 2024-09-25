export type Servico = {
    Tipo: string;
    Adicionais: string;
};
  
export type Resumo = {
    Nome: string;
    CPF: string;
    Email: string;
    Telefone: string;
    Placa: string;
    Modelo: string;
    Cor: string;
    Chassi: string;
    Quilometragem: number;
    Criado_em: Date;
    Observacao?: string;
    Endereco_entrega: string;
};