﻿using MongoDB.Driver;
using ServiceAPI.Entities;
namespace ServiceAPI
{
    public class Database
    {
        /*Questa classe singleton ha il ruolo di raggruppare parte del codice utile per l'accesso al DB 
         *evitando così la replicazione oltre a fornire un unico punto di accesso per lo stesso DB.
         */

        private MongoClient client;
        private IMongoDatabase db;
        static Database istance;
        private Database() {
            client = new MongoClient("mongodb://127.0.0.1");
            db = client.GetDatabase("Progetto");
        }

        public static Database getIstance() {
            if (istance == null)
                istance = new Database();
            return istance;
        }

        public IMongoCollection<Film> getFilms() {
            return db.GetCollection<Film>("films");
        }

        public IMongoCollection<User> getUsers(){
            return db.GetCollection<User>("users");
        }

    }
}
