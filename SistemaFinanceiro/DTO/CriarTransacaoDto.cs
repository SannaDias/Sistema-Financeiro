using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SistemaFinanceiro.Models;


namespace SistemaFinanceiro.DTO
{
    public class CriarTransacaoDto
    {
         public string Descricao { get; set; } = string.Empty;
        public decimal Valor { get; set; }
        public TipoTransacao Tipo { get; set; }
        public int PessoaId { get; set; }
        public int CategoriaId { get; set; }
    }
}