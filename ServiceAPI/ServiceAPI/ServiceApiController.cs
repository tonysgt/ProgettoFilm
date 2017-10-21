using Microsoft.AspNetCore.Mvc;
using ServiceAPI.Dal;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading;

namespace ServiceAPI
{
    [Route("api")]
    public class ServiceApiController : Controller
    {
        static readonly object setupLock = new object();
        static readonly SemaphoreSlim parallelism = new SemaphoreSlim(2);

        [HttpGet("films")]
        public async Task<IActionResult> GetFilms()
        {
            try
            {
                await parallelism.WaitAsync();

                using (var context = new ProgettoDbContext())
                {              
                    return Ok(await context.Films.ToListAsync());
                }
            }
            finally
            {
                parallelism.Release();
            }
        }

        [HttpGet("film")]
        public async Task<IActionResult> GetFilm([FromQuery]int IDFilm)
        {
            using (var context = new ProgettoDbContext())
            {
                return Ok(await context.Films.FirstOrDefaultAsync(x => x.FilmID == IDFilm));
            }
        }

        [HttpPut("films")]
        public async Task<IActionResult> CreateFilm([FromBody]Film film)
        {
            using (var context = new ProgettoDbContext())
            {
                context.Films.Add(film);

                await context.SaveChangesAsync();

                return Ok();
            }
        }

        [HttpDelete("films")]
        public async Task<IActionResult> DeleteFilm([FromQuery]int IDFilm)
        {
            using (var context = new ProgettoDbContext())
            {
                var film = await context.Films.FirstOrDefaultAsync(x => x.FilmID == IDFilm);
                context.Films.Remove(film);
                await context.SaveChangesAsync();
                return Ok();
            }
        }
    }
}