using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Linq;
using System.Threading;
using MongoDB.Driver;
using ServiceAPI.Entities;
using System.Net;
using System.IO;
using System.Text.RegularExpressions;

namespace ServiceAPI
{
    [Route("api")]
    public class FilmApiController : Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        IMongoCollection<Film> collection;

        public FilmApiController() {
            collection = Database.getIstance().getFilms();
        }

        //Tale funzione si occupa di restituire i dati dei film presenti in IDFilms.
        [HttpGet("films/many")]
        public async Task<IActionResult> GetManyFilms([FromQuery]string[] IDFilms)
        {
            try
            {
                await parallelism.WaitAsync();
                var films = await collection.FindAsync(f => IDFilms.Contains(f._id));
                if (films == null)
                    return NotFound();
                return Ok(films.ToList());
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

        //Utilizzata per ottenere tutti i film presenti nel DB
        [HttpGet("films")]
        public async Task<IActionResult> GetFilms()
        {
            try
            {
                await parallelism.WaitAsync();
                var film = collection.AsQueryable().Where(x => true);
                return Ok(film);
            }
            finally
            {
                parallelism.Release();
            }
        }
        
        //Utilizzata per ottenere in dettaglio i dati di un singolo Film
        [HttpGet("film")]
        public async Task<IActionResult> GetFilm([FromQuery]string IDFilm)
        {
            try
            {
                await parallelism.WaitAsync();
                var film = await collection.FindAsync(f => f._id == IDFilm);
                if (film == null)
                    return NotFound();
                return Ok(film.First());
            }
            catch (Exception e) {
                Console.WriteLine(e.Message);
                return NotFound();
            }
            finally
            {
                parallelism.Release();
            }
        }

        //Usata per l'inserimento nel db di un nuovo film
        [HttpPut("film")]
        public async Task<IActionResult> CreateFilm([FromBody]Film film)
        {
            try
            {
                await parallelism.WaitAsync();
                var presente = collection.Find(f => f.NomeFilm == film.NomeFilm);
                if (presente.Count() > 0)
                    return Unauthorized();

                await collection.InsertOneAsync(film);
                return Ok();
            }
            finally
            {
                parallelism.Release();
            }
            
            
        }

        //utilizzata per la modifica dei dati relativi ad un film
        [HttpPost("film")]
        public async Task<IActionResult> UpdateFilm([FromBody]Film film)
        {
            try
            {
                await parallelism.WaitAsync();
                var filmo = await collection.FindOneAndReplaceAsync(f => f._id == film._id, film);
                if (filmo == null)
                    return NotFound();
                return Ok();
            }
            catch(Exception e) {
                Console.WriteLine(e.Message);
                return NotFound();
            }
            finally
            {
                parallelism.Release();
            }
        }

        //utilizzata per rimuovere un film dal DB
        [HttpDelete("film")]
        public async Task<IActionResult> DeleteFilm([FromQuery]string IDFilm)
        {
            try
            {
                await parallelism.WaitAsync();
                var film = await collection.FindOneAndDeleteAsync(f => f._id == IDFilm);
                if (film == null)
                    return NotFound();
                return Ok();
            }
            finally
            {
                parallelism.Release();
            }
        }

    }
}