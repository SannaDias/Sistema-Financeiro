using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SistemaFinanceiro.Models
{
    public class Categoria
    {
        public int Id { get; set; }
        public string? Descricao { get; set; }= string.Empty;
        public Finalidade Finalidade{ get; set; }

        
        
        public List<Transacao> Transacoes { get; set; } = new();
    }
}