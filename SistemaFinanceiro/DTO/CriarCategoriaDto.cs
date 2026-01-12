using SistemaFinanceiro.Models;


namespace SistemaFinanceiro.DTO
{
    public class CriarCategoriaDto
    {
        public string Descricao { get; set; } = string.Empty;
        public Finalidade Finalidade { get; set; }
    }
}