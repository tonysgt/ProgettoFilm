using System.Collections.Generic;

namespace ServiceAPI.Dal
{
    public class Film
    {
       /* public Film() {
            this.visti = new HashSet<Visti>();
        }*/

        public int FilmID{ get; set; }
        public string NomeFilm { get; set; }
        public string Genere { get; set; }
        public string Regista { get; set; }
        public string Descrizione { get; set; }
        public int Durata { get; set; }
        public int Anno { get; set; }

        public virtual ICollection<Visti> Visti { get; set; }
        // public string Copertina { get; set; } temporaneo
    }
}
