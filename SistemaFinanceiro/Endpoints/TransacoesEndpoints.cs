using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SistemaFinanceiro.DTO;
using SistemaFinanceiro.Data;
using SistemaFinanceiro.Models;
using Microsoft.EntityFrameworkCore;


namespace SistemaFinanceiro.Endpoints
{
    public static class TransacoesEndpoints
    {
         public static void MapTransacoesEndpoints(this WebApplication app)
    {
        // Criar transação
        app.MapPost("/transacoes", async (CriarTransacaoDto dto, AppDbContext db) =>
        {
            var pessoa = await db.Pessoas.FindAsync(dto.PessoaId);
            if (pessoa == null)
                return Results.NotFound("Pessoa não encontrada");

            var categoria = await db.Categorias.FindAsync(dto.CategoriaId);
            if (categoria == null)
                return Results.NotFound("Categoria não encontrada");

            // REGRA 1: menor de idade não pode ter receita
            if (pessoa.Idade < 18 && dto.Tipo == TipoTransacao.Receita)
                return Results.BadRequest("Pessoa menor de idade não pode ter receita");

            // REGRA 2: validar finalidade da categoria
            if (categoria.Finalidade == Finalidade.Receita && dto.Tipo == TipoTransacao.Despesa)
                return Results.BadRequest("Categoria não aceita despesa");

            if (categoria.Finalidade == Finalidade.Despesa && dto.Tipo == TipoTransacao.Receita)
                return Results.BadRequest("Categoria não aceita receita");

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId,
                CategoriaId = dto.CategoriaId
            };

            db.Transacoes.Add(transacao);
            await db.SaveChangesAsync();

             var response = new TransacaoResponseDto
                {
                    Id = transacao.Id,
                    Descricao = transacao.Descricao,
                    Valor = transacao.Valor,
                    Tipo = transacao.Tipo,
                    Pessoa = pessoa.Nome!,
                    Categoria = categoria.Descricao!
                };

                return Results.Created($"/transacoes/{transacao.Id}", response);
        });

        // Listar transações
        app.MapGet("/transacoes", async (AppDbContext db) =>
            {
                
                var transacoes = await db.Transacoes
                    .Include(t => t.Pessoa)
                    .Include(t => t.Categoria)
                    .Select(t => new TransacaoResponseDto
                    {
                        Id = t.Id,
                        Descricao = t.Descricao!,
                        Valor = t.Valor,
                        Tipo = t.Tipo,
                        Pessoa = t.Pessoa!.Nome!,
                        Categoria = t.Categoria!.Descricao!
                    })
                    .ToListAsync();

                return Results.Ok(transacoes);
            });
    }
    }
}