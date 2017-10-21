using Microsoft.EntityFrameworkCore;

namespace ServiceAPI.Dal
{
    public class ProgettoDbContext : DbContext
    {
        public DbSet<Film> Films { get; set; }
        public DbSet<Utente> Users { get; set; }
        public DbSet<Visti> Visti { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder
                .UseMySql(@"Server=localhost;database=ProgettoListaFilm;uid=root;");


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            /*modelBuilder.Entity<Visti>()
                .HasOne(v => v.film)
                .WithMany(f => f.visti)
                .HasForeignKey(v => v.FilmID);

            modelBuilder.Entity<Visti>()
                .HasOne(v => v.utente)
                .WithMany(u => u.visti)
                .HasForeignKey(v=> v.UtenteID);*/

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                // Skip shadow types
                if (entityType.ClrType == null)
                    continue;

                entityType.Relational().TableName = entityType.ClrType.Name;
            }
            base.OnModelCreating(modelBuilder);
        }
    }
}
