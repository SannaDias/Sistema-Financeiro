import { useEffect, useState } from "react";
import { apiGet, apiPost, apiDelete } from "../api/api";
import type { Pessoa } from "../models/Pessoa";


import "./PessoasPage.css";

export default function PessoasPage() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState<number>(0);
  const [toastVisivel, setToastVisivel] = useState(false);
  const [toastErro, setToastErro] = useState<string | null> (null);


  useEffect(() => {
    const carregar = async () => {
      const dados = await apiGet<Pessoa[]>("/pessoas");
      setPessoas(dados);
    };
    carregar();
  }, []);

  const cadastrarPessoa = async () => {     
    if (!nome){
      setToastErro("Nome é obrigatorio");
      setTimeout(()=> setToastErro(null), 3000)
        return;
    };

    if(idade <= 0){
      setToastErro("Idade deve ser maior que zero");
      setTimeout(()=> setToastErro(null),3000);
      return;
    }

    await apiPost("/pessoas", { nome, idade });

    setNome("");
    setIdade(0);

    const dados = await apiGet<Pessoa[]>("/pessoas");
    setPessoas(dados);

    //Exibe o toast de sucesso
     setToastVisivel(true);
     console.log("TOAST TRUE");
     
    setTimeout(() => {
      setToastVisivel(false);
      console.log("TOAST FALSE");
    }, 3000);
  };

       const deletarPessoa = async (id: number) =>{
      await apiDelete(`/pessoas/${id}`);

      const dados = await apiGet<Pessoa[]>("/pessoas");
      setPessoas(dados);
    }

  return (
    <div className="pessoas-container">
      <div className="pessoas-card">
        
        <h1 className="pessoas-title">
        Detalhes do usuário
        </h1>

        <div className="pessoas-form">

            {/*Campo Nome */}
            <div className="input-group">
                <label>Nome</label>
                <input
                className="pessoas-input"
                type="text"
                placeholder="Digite o nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                />
            </div>

           
            <div className="input-group">
                <label>Idade</label>
                <input
                className="pessoas-input"
                type="number"
                placeholder="Ex: 25"
                value={idade}
                onChange={(e) => setIdade(Number(e.target.value))}
                />
            </div>

           <button className="btn-primary" onClick={cadastrarPessoa}>
  Cadastrar
</button>
        </div>


        <ul className="pessoas-list">
          {pessoas.map((p) => (
            <li key={p.id} className="pessoas-item">
              <span>{p.nome} ({p.idade})</span>

              
              <button
                className="btn-delete"
                onClick={() => deletarPessoa(p.id)}
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </div>
       {toastVisivel && (
      <div className="toast-success">
        Pessoa cadastrada com sucesso ✅
      </div>
    )}
        {toastErro && (
      <div className="toast-error">
        {toastErro} ❌
      </div>
    )}
    </div>
  );
}
