import { useEffect, useState } from "react";
import { apiGet, apiPost } from "../api/api";
import "./TransacoesPage.css";
import type { Transacao } from "../models/Transacao";
import type { Pessoa } from "../models/Pessoa";
import type { Categoria } from "../models/Categoria";



import "./TransacoesPage.css";

export default function TransacoesPage() {
  // Listagem
  const [transacoes, setTransacoes] = useState<Transacao[]>([]);

  //  Dados auxiliares 
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  //  Formulário
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState<number>(0);
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState<"Receita" | "Despesa">("Despesa");
  const [pessoaId, setPessoaId] = useState<number>(0);
  const [categoriaId, setCategoriaId] = useState<number>(0);

  //  Carrega tudo ao abrir a tela
  useEffect(() => {
    const carregarDados = async () => {
      const [t, p, c] = await Promise.all([
        apiGet<Transacao[]>("/transacoes"),
        apiGet<Pessoa[]>("/pessoas"),
        apiGet<Categoria[]>("/categorias"),
      ]);

      setTransacoes(t);
      setPessoas(p);
      setCategorias(c);
    };

    carregarDados();
  }, []);
  async function cadastrarTransacao() {
    // 🔒 Validação básica
    if (!descricao || valor <= 0 || !data || pessoaId === 0 || categoriaId === 0) {
      return;
    }

    await apiPost("/transacoes", {
      descricao,
      valor,
      data,
      tipo,
      pessoaId,
      categoriaId,
    });

    // Recarrega lista
    const dados = await apiGet<Transacao[]>("/transacoes");
    setTransacoes(dados);

    // 🧹 Limpa formulário
    setDescricao("");
    setValor(0);
    setData("");
    setTipo("Despesa");
    setPessoaId(0);
    setCategoriaId(0);
  }
  return (
    <div className="transacoes-container">
      <div className="transacoes-card">
        <h1 className="transacoes-title">Transações</h1>

        {/* 🔹 Formulário */}
        <div className="transacoes-form">
          <input
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <input
            type="number"
            placeholder="Valor"
            value={valor}
            onChange={(e) => setValor(Number(e.target.value))}
          />

          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />

          <select
            value={tipo}
            onChange={(e) =>setTipo(e.target.value as "Receita" | "Despesa")}>
            <option value="Despesa">Despesa</option>
            <option value="Receita">Receita</option>
            </select>

          <select value={pessoaId} onChange={(e) => setPessoaId(Number(e.target.value))}>
            <option value={0}>Pessoa</option>
            {pessoas.map((p) => (
              <option key={p.id} value={p.id}>{p.nome}</option>
            ))}
          </select>

          <select value={categoriaId} onChange={(e) => setCategoriaId(Number(e.target.value))}>
            <option value={0}>Categoria</option>
            {categorias.map((c) => (
              <option key={c.id} value={c.id}>{c.descricao}</option>
            ))}
          </select>

          <button className="btn-primary" onClick={cadastrarTransacao}>
            Cadastrar
          </button>
        </div>

        {/* 🔹 Listagem */}
        <ul className="transacoes-list">
          {transacoes.map((t) => (
            <li key={t.id} className={`transacao-item ${t.tipo.toLowerCase()}`}>
              <span>{t.descricao}</span>
              <span>R$ {t.valor.toFixed(2)}</span>
              <span>{t.tipo}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
