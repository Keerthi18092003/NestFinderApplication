using Home_demo_app.Server.Infrastructure;
using Home_demo_app.Server.Models;
using Home_demo_app.Server.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Home_demo_app.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class Registration : ControllerBase
	{
		private readonly DataContext dbc;
		private readonly IEmailService _emailService;
		public Registration(DataContext dbc, IEmailService emailService)
		{
			this.dbc = dbc;
		}
		[HttpGet]
		public IActionResult GetDetails()
		{
			var users=dbc.Regs.ToList();
			return Ok(users);
		}
		[HttpPost]
		public IActionResult AddDetails(User_Details obj)
		{
			if (obj.Password != obj.ConfirmPassword)
			{
				return BadRequest("Passwords do not match.");
			}

			var user_reg = new User_Reg
				{
					Id=Guid.NewGuid(),
					Name = obj.Name,
					Email = obj.Email,
					PhoneNumber = obj.PhoneNumber,
					Gender = obj.Gender,
					DateOfBirth = obj.DateOfBirth,
					Password = obj.Password,
					ConfirmPassword=obj.ConfirmPassword
				};
				dbc.Regs.Add(user_reg);
				dbc.SaveChanges();
				return Ok(user_reg);
			
		}

		[HttpGet("view")]
		public async Task<IActionResult> GetAllUsers()
		{
			var users = dbc.Regs.ToList();
			if (users == null || !users.Any())
			{
				return NotFound("No properties found.");
			}
			return Ok(users);
		}
		[HttpPut("suspend/{id}")]
		public async Task<IActionResult> SuspendUser(Guid id)
		{
			var user = await dbc.Regs.FindAsync(id); 
			if (user == null)
			{
				return NotFound(new { message = "User not found" });
			}

			user.IsSuspended = true; // Add an "IsSuspended" column in your user table
			await dbc.SaveChangesAsync();

			return Ok(new { message = "User suspended successfully" });
		}

		[HttpDelete]
		[Route("delete/{id:guid}")]
		public IActionResult DeleteUser(Guid id)
		{
			var user = dbc.Regs.FirstOrDefault(u => u.Id == id);

			if (user == null)
			{
				return NotFound();
			}

			dbc.Regs.Remove(user);
			dbc.SaveChanges();

			return Ok(new { message = "User Deleted successfully" }); // Success response
		}
		[HttpGet("suspendedaccounts")]
		public async Task<IActionResult> GetSuspendedUsers()
		{
			var users = await dbc.Regs.Where(u => u.IsSuspended == true).ToListAsync();
			return Ok(users);
		}

		[HttpPatch("suspensionstatus/{id}")]
		public async Task<IActionResult> UpdateSuspensionStatus(Guid id)
		{
			var user = await dbc.Regs.FindAsync(id);
			if (user == null)
			{
				return NotFound();
			}

			user.IsSuspended = false;
			await dbc.SaveChangesAsync();

			return NoContent();
		}

	}
}
