using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ServiceAPI.Entities
{
    public class Film
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string NomeFilm { get; set; }
        public string Descrizione { get; set; }
        public int Durata { get; set; }
        public string Regista { get; set; }
        public string Categoria { get; set; }
        public int Anno { get; set; }
        public string Copertina { get; set; }
    }
}
