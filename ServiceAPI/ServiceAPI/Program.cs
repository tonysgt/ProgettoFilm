using Microsoft.AspNetCore.Hosting;
using System;

namespace ServiceAPI
{
    class Program
    {
        static void Main(string[] args)
        {
            /*using (var context = new ProgettoDbContext())
            {
                context.Database.EnsureCreated();
            }*/

            var host = new WebHostBuilder()
                .UseKestrel()
                .UseStartup<Startup>()
                .Build();

            host.Run();
            
        }
    }
}