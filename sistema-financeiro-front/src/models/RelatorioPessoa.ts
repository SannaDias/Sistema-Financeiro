// total de uma pessoa no relatório
export interface RelatorioPessoaItem {
  pessoaId: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

// resposta da API
export interface TotaisGerais {
 totalReceitas: number;
 totalDespesas: number;
 saldoGeral: number;
}



export interface RelatorioPessoaResponse {
  pessoas: RelatorioPessoaItem[];
  totaisGerais: TotaisGerais;
}
