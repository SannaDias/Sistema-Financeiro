// total de uma pessoa no relatório
export interface RelatorioPessoa {
  pessoaId: number;
  nome: string;
  totalReceitas: number;
  totalDespesas: number;
  saldo: number;
}

// resposta da API
export interface RelatorioPessoaResponse {
  pessoas: RelatorioPessoa[];
  totalReceitasGeral: number;
  totalDespesasGeral: number;
  saldoGeral: number;
}
