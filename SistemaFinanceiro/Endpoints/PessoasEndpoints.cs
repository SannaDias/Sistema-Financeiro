using Microsoft.EntityFrameworkCore;
using SistemaFinanceiro.Data;
using SistemaFinanceiro.Models;
using SistemaFinanceiro.DTO;
namespace SistemaFinanceiro.Endpoints;

public static class PessoasEndpoints
{
    public static void MapPessoasEndpoints(this WebApplication app)
    {
        // Criar pessoa
       app.MapPost("/pessoas", async (CriarPessoaDto dto, AppDbContext db) =>
        {
            var pessoa = new Pessoa
            {
                Nome = dto.Nome,
                Idade = dto.Idade
            };

            db.Pessoas.Add(pessoa);
            await db.SaveChangesAsync();

            return Results.Created($"/pessoas/{pessoa.Id}", pessoa);
        });

        // Listar pessoas
        app.MapGet("/pessoas", async (AppDbContext db) =>
        {
            return await db.Pessoas.ToListAsync();
        });

        // Deletar pessoas 
        app.MapDelete("/pessoas/{id:int}", async (int id, AppDbContext db) =>
        {
            var pessoa = await db.Pessoas
                .Include(p => p.Transacoes)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (pessoa == null)
                return Results.NotFound();

            db.Transacoes.RemoveRange(pessoa.Transacoes);
            db.Pessoas.Remove(pessoa);

            await db.SaveChangesAsync();
            return Results.NoContent();
        });
    }
}
