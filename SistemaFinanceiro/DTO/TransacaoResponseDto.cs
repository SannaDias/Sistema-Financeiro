using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SistemaFinanceiro.Models;


namespace SistemaFinanceiro.DTO
{
    public class TransacaoResponseDto
    {
        public int Id { get; set; }
        public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }

        public string Pessoa { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
    }
}