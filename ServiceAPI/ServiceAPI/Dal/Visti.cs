namespace ServiceAPI.Dal
{
    public class Visti
    {
        public int VistiID { get; set; }
        public int FilmID { get; set; }
        public int UtenteID { get; set; }


        public Film film { get; set; }
        public Utente utente { get; set; }
    }
}
