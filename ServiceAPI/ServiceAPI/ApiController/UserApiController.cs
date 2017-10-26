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

        public class DatiLogIn{
            public string Email { get; set; }
            public string Password { get; set; }
        }

        [HttpPost("user/LogIn")]
        public async Task<IActionResult> GetUser([FromBody]DatiLogIn dati)
        {
            try
            {
                await parallelism.WaitAsync();
                var user = await collection.FindAsync(u => u.Email==dati.Email && u.Password==dati.Password);
                if (user == null)
                    return NotFound();
                return Ok(user.First());
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
        
        [HttpPut("user")]
        public async Task<IActionResult> CreateUser([FromBody]User user)
        {
            try
            {
                await parallelism.WaitAsync();
                user.filmVisti = new List<string>();
                await collection.InsertOneAsync(user);               
                return Ok();
            }
            finally
            {
                parallelism.Release();
            }
        }
        

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
    }
}