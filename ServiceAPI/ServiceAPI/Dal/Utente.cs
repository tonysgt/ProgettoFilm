using System.Collections.Generic;

namespace ServiceAPI.Dal
{
    public class Utente
    {
        /*public Utente() {
            this.visti = new HashSet<Visti>();
        }*/
        public int UtenteID { get; set; }
        public string Username { get; set; }
        public string Psw { get; set; }
        public string Email { get; set; }

        public virtual ICollection<Visti> Visti { get; set; }
    }
}
