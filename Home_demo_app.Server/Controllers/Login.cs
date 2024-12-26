using Home_demo_app.Server.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Home_demo_app.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class Login : ControllerBase
	{
		private readonly DataContext dbc;
		private readonly IConfiguration conf;
		public Login(DataContext dbc, IConfiguration conf)
		{
			this.dbc = dbc;
			this.conf = conf;
		}
		[HttpPost]
		public IActionResult User_Login([FromBody] LoginRequest request)
		{
			if (string.IsNullOrEmpty(request.Email) || string.IsNullOrEmpty(request.Password))
			{
				return BadRequest("Email and password are required.");
			}

			var user = dbc.Regs
				.FirstOrDefault(u => u.Email == request.Email && u.Password == request.Password);
			if (user == null)
			{
				return Unauthorized("Invalid credentials.");
			}

			return Ok(new
			{
				message = "Login successful!",
				userId = user.Id,
			});
		}
	}
}
