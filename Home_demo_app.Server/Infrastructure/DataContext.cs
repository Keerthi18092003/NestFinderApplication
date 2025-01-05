using Home_demo_app.Server.Controllers;
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
        public DbSet<Appointment> Appointments { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			base.OnModelCreating(modelBuilder);
			modelBuilder.Entity<Appsubmit>()
				.HasOne(a => a.Property) 
				.WithMany() 
				.HasForeignKey(a => a.PropertyId) 
				.OnDelete(DeleteBehavior.Cascade);

           

        }
	}

}

