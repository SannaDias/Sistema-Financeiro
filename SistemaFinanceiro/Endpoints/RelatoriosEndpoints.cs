using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using SistemaFinanceiro.Data;
using SistemaFinanceiro.Models;

namespace SistemaFinanceiro.Endpoints
{
    public static class RelatoriosEndpoints
    {
        public static void MapRelatoriosEndpoints(this WebApplication app)
        {
              app.MapGet("/relatorios/totais-por-pessoa", async (AppDbContext db) =>
            {
                var pessoas = await db.Pessoas
                    .Include(p => p.Transacoes)
                    .ToListAsync();

                // Lista com o resultado individual por pessoa
                var resultadoPorPessoa = pessoas.Select(pessoa =>
                {
                    var totalReceitas = pessoa.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Receita)
                        .Sum(t => t.Valor);

                    var totalDespesas = pessoa.Transacoes
                        .Where(t => t.Tipo == TipoTransacao.Despesa)
                        .Sum(t => t.Valor);

                    return new
                    {
                        PessoaId = pessoa.Id,
                        Nome = pessoa.Nome,
                        TotalReceitas = totalReceitas,
                        TotalDespesas = totalDespesas,
                        Saldo = totalReceitas - totalDespesas
                    };
                }).ToList();

                // Totais gerais
                var totalGeralReceitas = resultadoPorPessoa.Sum(p => p.TotalReceitas);
                var totalGeralDespesas = resultadoPorPessoa.Sum(p => p.TotalDespesas);

                return Results.Ok(new
                {
                    Pessoas = resultadoPorPessoa,
                    TotaisGerais = new
                    {
                        TotalReceitas = totalGeralReceitas,
                        TotalDespesas = totalGeralDespesas,
                        SaldoGeral = totalGeralReceitas - totalGeralDespesas
                    }
                });
            }); 
        }
    }
}