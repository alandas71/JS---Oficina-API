export interface Servico {
  id?: number;
  Tipo: "eletrico" | "carroceria" | "mecanico";
}

export interface Servico_Adicional {
  id?: number;
  Tipo: "oleo" | "alinhamento/balanceamento" | "revisao" | "freio" | "bateria";
}
