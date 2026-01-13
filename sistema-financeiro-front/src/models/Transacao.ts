// Representa uma transação financeira do sistema

export interface Transacao {
  id: number;

  descricao: string;

  valor: number;

  data: string; 

  tipo: "Receita" | "Despesa";

  pessoaId: number;
  pessoaNome?: string; 

  categoriaId: number;
  categoriaDescricao?: string; 
}