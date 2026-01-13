using Microsoft.EntityFrameworkCore;
using SistemaFinanceiro.Data;
using SistemaFinanceiro.Endpoints;
using SistemaFinanceiro.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=sistema_financeiro.db"));

//cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173") // endereço do React
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();


//ativa o cors
app.UseCors("AllowFrontend");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapPessoasEndpoints();
app.MapCategoriasEndpoints();
app.MapTransacoesEndpoints();
app.MapRelatoriosEndpoints();

app.Run();
