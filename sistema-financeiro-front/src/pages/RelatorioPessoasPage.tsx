import { useEffect, useState } from "react";
import { apiGet } from "../api/api";
import type { RelatorioPessoaResponse } from "../models/RelatorioPessoa";
import "./RelatorioPessoasPage.css";

export default function RelatorioPessoasPage() {
  // Guarda os dados do relatório inteiro
  const [relatorio, setRelatorio] = useState<RelatorioPessoaResponse | null>(null);

  // Busca os dados ao abrir a tela
  useEffect(() => {
    const carregarRelatorio = async () => {
      const dados = await apiGet<RelatorioPessoaResponse>(
        "/relatorios/totais-por-pessoa"
      );
      setRelatorio(dados);
    };

    carregarRelatorio();
  }, []);

  // Enquanto carrega
  if (!relatorio) {
    return <p>Carregando relatório...</p>;
  }

  return (
    <div className="relatorio-container">
      <div className="relatorio-card">
        <h1>Totais por Pessoa</h1>

        {/*Lista por pessoa */}
        <table>
          <thead>
            <tr>
              <th>Pessoa</th>
              <th>Receitas</th>
              <th>Despesas</th>
              <th>Saldo</th>
            </tr>
          </thead>
          <tbody>
            {relatorio.pessoas.map((p) => (
              <tr key={p.pessoaId}>
                <td>{p.nome}</td>
                <td className="receita">R$ {p.totalReceitas.toFixed(2)}</td>
                <td className="despesa">R$ {p.totalDespesas.toFixed(2)}</td>
                <td
                  className={p.saldo >= 0 ? "saldo-positivo" : "saldo-negativo"}
                >
                  R$ {p.saldo.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/*Totais gerais */}
        <div className="totais-gerais">
          <p><strong>Total Receitas:</strong> R$ {relatorio.totalReceitasGeral.toFixed(2)}</p>
          <p><strong>Total Despesas:</strong> R$ {relatorio.totalDespesasGeral.toFixed(2)}</p>
          <p><strong>Saldo Geral:</strong> R$ {relatorio.saldoGeral.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
