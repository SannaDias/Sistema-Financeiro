using Microsoft.EntityFrameworkCore;
using SistemaFinanceiro.Data;
using SistemaFinanceiro.DTO;   
using SistemaFinanceiro.Models;

namespace SistemaFinanceiro.Endpoints;

public static class CategoriasEndpoints
{
    public static void MapCategoriasEndpoints(this WebApplication app)
    {
        app.MapPost("/categorias", async (CriarCategoriaDto dto, AppDbContext db) =>
        {
            var categoria = new Categoria
            {
                Descricao = dto.Descricao,
                Finalidade = dto.Finalidade
            };

            db.Categorias.Add(categoria);
            await db.SaveChangesAsync();

            return Results.Created($"/categorias/{categoria.Id}", categoria);
        });

        app.MapGet("/categorias", async (AppDbContext db) =>
        {
            return await db.Categorias.ToListAsync();
        });
    }
}
