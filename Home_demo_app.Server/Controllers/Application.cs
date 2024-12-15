using Home_demo_app.Server.Infrastructure;
using Home_demo_app.Server.Models;
using Home_demo_app.Server.Models.Owner_module;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Home_demo_app.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class Application : ControllerBase
	{
		private readonly DataContext dbc;
		public Application(DataContext dbc)
		{
			this.dbc = dbc;
        }
		[HttpPost]
		public async Task<IActionResult> SubmitApplication([FromBody] Appsubmit_details applicationDto)
		{
			if (applicationDto == null)
			{
				return BadRequest("Application data is required.");
			}

			var application = new Appsubmit
			{
				ApplicationId = Guid.NewGuid(),
				PropertyId = applicationDto.PropertyId,
				TenantType = applicationDto.TenantType,
				Comments = applicationDto.Comments,
				SubmittedAt = DateTime.UtcNow,
				Status = "Pending"
			};

			await dbc.Appssubmit.AddAsync(application);
			await dbc.SaveChangesAsync();

			return Ok(new { message = "Application submitted successfully!" });
		}
		[HttpGet("Applications/{propertyId}")]
		public async Task<IActionResult> GetApplications(Guid propertyId)
		{
			var applications = await dbc.Appssubmit
				.Where(a => a.PropertyId == propertyId)
				.Select(a => new Appsubmit
				{
					ApplicationId = a.ApplicationId,
					PropertyId = a.PropertyId,
					TenantType = a.TenantType,
					Comments = a.Comments,
					SubmittedAt = a.SubmittedAt,
					Status = a.Status
				})
				.ToListAsync();

			return Ok(applications);
		}

		// Accept an application
		[HttpPost("Applications/{applicationId}/Accept")]
		public async Task<IActionResult> AcceptApplication(Guid applicationId)
		{
			var application = await dbc.Appssubmit.FindAsync(applicationId);

			if (application == null)
			{
				return NotFound("Application not found.");
			}

			application.Status = "Accepted";

			await dbc.SaveChangesAsync();

			return Ok(new { message = "Application accepted successfully." });
		}

		// Reject an application
		[HttpPost("Applications/{applicationId}/Reject")]
		public async Task<IActionResult> RejectApplication(Guid applicationId)
		{
			var application = await dbc.Appssubmit.FindAsync(applicationId);

			if (application == null)
			{
				return NotFound("Application not found.");
			}

			application.Status = "Rejected";

			await dbc.SaveChangesAsync();

			return Ok(new { message = "Application rejected successfully." });
		}
	}
}
