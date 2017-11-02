using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Collections.Generic;

namespace ServiceAPI.Entities
{
    //Tale classe rappresenta l'entità Utente all'interno del DB Mongo
    public class User
    {
        [BsonRepresentation(BsonType.ObjectId)]
        public string _id { get; set; }
        public string Nome { get; set; }
        public string Cognome { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        //Questa lista contiene le reference alla collection Films(ovvero gli ID) dei film visti dall'utente
        public List<string> filmVisti { get; set; }
    }
}