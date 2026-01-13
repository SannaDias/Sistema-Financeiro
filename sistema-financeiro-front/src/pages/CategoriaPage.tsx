import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api/api";
import type { Categoria } from "../models/Categoria";
import "./CategoriaPage.css";


export default function CategoriaPage(){
    //lista de categorias 
    const [categorias, setCategorias] = useState<Categoria[]>([]);

    //estados do form 
    const [descricao, setDescricao] =useState("");
    const [finalidade, setFinalidade] =useState<"Despesa"  | "Receita" | "Ambas">(
        "Despesa"
    );

   useEffect(() => {
  // Função async criada DENTRO do effect
  // Motivo: evita warnings de setState em Strict Mode
  const carregarCategorias = async () => {
    const dados = await apiGet<Categoria[]>("/categorias");
    setCategorias(dados);
  };

  carregarCategorias();
}, []);

   
    async function cadastrarCategoria() {
        if (!descricao) return;

        await apiPost("/categorias", {
        descricao,
        finalidade,
    });

    //limpa o forms 
    setDescricao("");
    setFinalidade("Despesa");

    //Atualiza a lista 
    const dados = await apiGet<Categoria[]>("/categorias");
    setCategorias(dados);
    }

    return(
         <div className="categorias-container">
      <div className="categorias-card">
        <h1 className="categorias-title">Categorias</h1>

        {/* 🔹 Formulário */}
        <div className="categorias-form">
          <div className="input-group">
            <label>Descrição</label>
            <input
              type="text"
              value={descricao}
              placeholder="Ex: Alimentação"
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>Finalidade</label>
            <select
              value={finalidade}
              onChange={(e) =>
                setFinalidade(e.target.value as "Despesa" | "Receita" | "Ambas")
              }
            >
              <option value="Despesa">Despesa</option>
              <option value="Receita">Receita</option>
              <option value="Ambas">Ambas</option>
            </select>
          </div>

          <button className="btn-primary" onClick={cadastrarCategoria}>
            Cadastrar
          </button>
        </div>

        {/* 🔹 Listagem */}
        <ul className="categorias-list">
          {categorias.map((c) => (
            <li key={c.id} className="categorias-item">
              <span className="categoria-desc">{c.descricao}</span>
              <span className="categoria-tag">{c.finalidade}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    );
}