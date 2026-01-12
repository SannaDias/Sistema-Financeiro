using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SistemaFinanceiro.Models
{
    public class Transacao
    {
        public int Id { get; set; }
        public string? Descricao { get; set; }
        public decimal Valor { get; set; }
        public TipoTransacao Tipo{ get; set; }
        
        public int PessoaId { get; set; }
        public Pessoa? Pessoa { get; set; }

        public int CategoriaId { get; set; }   
         public Categoria? Categoria { get; set; } 
    }
}