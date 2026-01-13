export interface Categoria {
    id : number ;
    descricao: string;
    finalidade: "Despesa"  | "Receita" | "Ambas";
}