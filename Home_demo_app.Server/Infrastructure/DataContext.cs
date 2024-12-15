using Home_demo_app.Server.Models;
using Home_demo_app.Server.Models.Domain;
using Home_demo_app.Server.Models.Owner_module;
using Microsoft.EntityFrameworkCore;

namespace Home_demo_app.Server.Infrastructure
{
	public class DataContext : DbContext
	{
		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
		}
		public DbSet<User_Reg> Regs { get; set; }
		public DbSet<Addprop> AddProps { get; set; }
        public DbSet<Appsubmit> Appssubmit { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<Appsubmit>()
				.HasOne(a => a.Property) // Application has one related Property
				.WithMany() // A Property can have many Applications
				.HasForeignKey(a => a.PropertyId) // Foreign key in Application table
				.OnDelete(DeleteBehavior.Cascade); // Cascade delete if a Property is deleted
		}
	}

}

