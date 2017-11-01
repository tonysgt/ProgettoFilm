using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Linq;
using System.Threading;
using MongoDB.Driver;
using ServiceAPI.Entities;
using System.Collections.Generic;

namespace ServiceAPI
{
    [Route("api")]
    public class UserApiController : Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        IMongoCollection<User> collection;

        public UserApiController()
        {
            collection = Database.getIstance().getUsers();
        }

        //Ottengo tutti i dati degli utenti presenti nel DB. Utile per scopi di debug
        [HttpGet("users")] 
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                await parallelism.WaitAsync();
                var users = collection.AsQueryable().Where(x => true);          
                return Ok(users);
            }
            finally
            {
                parallelism.Release();
            }
        }

        //Classe di appoggio per la ricezione dei dati per il LogIn da parte del Front-End tramine json
        public class DatiLogIn{
            public string Email { get; set; }
            public string Password { get; set; }
        }

        /*Ha lo scopo di simulare la funzione di LonIn di un utente restituento tutti i relativi dati
         *per l'elaborazione da parte del front-end 
        */
        [HttpPost("user/LogIn")]
        public async Task<IActionResult> GetUser([FromBody]DatiLogIn dati)
        {
            try
            {
                await parallelism.WaitAsync();
                var user = await collection.FindAsync(u => u.Email==dati.Email && u.Password==dati.Password);
                return Ok(user.First());
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return Unauthorized();
            }
            finally
            {
                parallelism.Release();
            }
        }
        
        //Usata per la registrazione dei nuovi utenti
        [HttpPut("user")]
        public async Task<IActionResult> CreateUser([FromBody]User user)
        {
            try
            {
                await parallelism.WaitAsync();
                user.filmVisti = new List<string>();
                var utente = collection.Find(u => u.Email == user.Email);
                if (utente.Count()>0)
                    return Unauthorized();
                await collection.InsertOneAsync(user);
                return Ok();
            }
            finally
            {
                parallelism.Release();
            }
        }
        
        //usata per modificare i dati dell'utente
        [HttpPost("user")]
        public async Task<IActionResult> UpdateUser([FromBody]User user)
        {
            try
            {
                await parallelism.WaitAsync();
                var tmp = await collection.FindOneAndReplaceAsync(u => u._id == user._id, user);
                if (tmp == null)
                    return NotFound();
                return Ok();
            }
            finally
            {
                parallelism.Release();
            }
        }

        //usata per l'eliminazione di un utente
        [HttpDelete("user")]
        public async Task<IActionResult> DeleteUser([FromQuery]string IDUser)
        {
            try
            {
                await parallelism.WaitAsync();
                var user = await collection.FindOneAndDeleteAsync(u => u._id == IDUser);
                if (user == null)
                    return NotFound();
                return Ok();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
                return NotFound();
            }
            finally
            {
                parallelism.Release();
            }
        }

        //utilizzata per ottenere i film non visti da un utente
        [HttpGet("user/films")]
        public async Task<IActionResult> GetUserFilms([FromQuery]string IDUser)
        {
            try
            {
                await parallelism.WaitAsync();
                var user = collection.Find(u => u._id == IDUser).First();
                if (user == null)
                    return NotFound();
                var listafilm = Database.getIstance().getFilms().AsQueryable().Where(f=> !user.filmVisti.Contains(f._id));
                return Ok(listafilm.ToList());
            }
            finally
            {
                parallelism.Release();
            }
        }
    }
}