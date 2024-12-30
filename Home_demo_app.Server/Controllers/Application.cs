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
				Id = applicationDto.Id,
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
            // Fetch the application details, including property and tenant (from Regs table using Id)
            var application = await dbc.Appssubmit
                .Include(a => a.Property)  // Include property details
                .Where(a => a.ApplicationId == applicationId)  // Filter by ApplicationId
                .FirstOrDefaultAsync();  // Get the application by ID

            if (application == null)
            {
                return NotFound("Application not found.");
            }

            // Fetch tenant details from the Regs table based on the Id (foreign key)
            var tenant = await dbc.Regs
                .Where(r => r.Id == application.Id)  // Match Regs.Id with Appssubmit.Id
                .FirstOrDefaultAsync();  // Get the tenant details

            if (tenant == null)
            {
                return NotFound("Tenant not found.");
            }

            // Update the application status
            application.Status = "Accepted";

            // Save changes to the database
            await dbc.SaveChangesAsync();

            // Fetch tenant and property details
            var tenantName = tenant.Name;
            var tenantEmail = tenant.Email;
            var propertyType = application.Property.PropertyType;

            

            // Return response with tenant and property details for frontend to send email
            return Ok(new
            {
                message = "Application accepted successfully.",
                tenantName = tenantName,
                tenantEmail = tenantEmail,
                propertyType = propertyType,
               
            });
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

		[HttpGet("view/applications")]
		public async Task<IActionResult> GetUserApplications([FromQuery] Guid userId)
		{
			var userApplications = await dbc.Appssubmit
				.Where(a => a.Id == userId)
				.Include(a => a.Property)  
				.Select(a => new
				{
					a.ApplicationId,
					a.Status,
					a.SubmittedAt,
					a.TenantType,
					a.Comments,
					Property = new
					{
						a.Property.PropertyType,
						a.Property.Price,
						a.Property.Street,
						a.Property.City,
						a.Property.Pincode,
						a.Property.Images,
						a.Property.Description,
						a.Property.RentalTerms,
						a.Property.Furnished,
						a.Property.Bedrooms,
						a.Property.Rooms,
						a.Property.Area,
						a.Property.MobileNumber
					}
				})
				.ToListAsync();

			if (userApplications == null || !userApplications.Any())
			{
				return NotFound("No applications found for the user.");
			}

			return Ok(userApplications);
		}

		[HttpGet("applications/pending")]
		public async Task<IActionResult> GetUserPendingApplications([FromQuery] Guid userId)
		{
			var userPendingApplications = await dbc.Appssubmit
				.Where(a => a.Id == userId && a.Status == "Pending") // Filter by 'Pending' status
				.Include(a => a.Property)
				.Select(a => new
				{
					a.ApplicationId,
					a.Status,
					a.SubmittedAt,
					a.TenantType,
					a.Comments,
					Property = new
					{
						a.Property.PropertyType,
						a.Property.Price,
						a.Property.Street,
						a.Property.City,
						a.Property.Pincode,
						a.Property.Images,
						a.Property.Description,
						a.Property.RentalTerms,
						a.Property.Furnished,
						a.Property.Bedrooms,
						a.Property.Rooms,
						a.Property.Area,
						a.Property.MobileNumber
					}
				})
				.ToListAsync();

			if (userPendingApplications == null || !userPendingApplications.Any())
			{
				return NotFound("No pending applications found for the user.");
			}

			return Ok(userPendingApplications);
		}


		[HttpGet("applications/accepted/{userId}")]
		public async Task<IActionResult> GetApplicationsForUser(Guid userId)
		{
			var applications = await dbc.Appssubmit
				.Where(app => app.Id == userId && app.Status == "Accepted")
				.Include(app => app.Property) // Include property details
				.Join(dbc.Regs,
					  app => app.Property.Id,    // Match Property.Id to Regs.Id (Owner's ID)
					  owner => owner.Id,
					  (app, owner) => new
					  {
						  ApplicationId = app.ApplicationId,
                          Property = new
                          {
                              app.Property.PropertyType,
                              app.Property.Price,
                              app.Property.Street,
                              app.Property.City,
                              app.Property.Pincode,
                              app.Property.Images,
                              app.Property.Description,
                              app.Property.RentalTerms,
                              app.Property.Furnished,
                              app.Property.Bedrooms,
                              app.Property.Rooms,
                              app.Property.Area,
                              app.Property.MobileNumber
                          },
                          PropertyType = app.Property.PropertyType,
						  MobileNumber = app.Property.MobileNumber,
						  Status = app.Status,
						  SubmittedAt=app.SubmittedAt,
						  OwnerName = owner.Name,
						  OwnerGender = owner.Gender,
						  PropertyId = app.Property.PropertyId
					  })
				.ToListAsync();

			if (!applications.Any())
			{
				return NotFound("No accepted applications found.");
			}

			return Ok(applications);
		}

		[HttpGet("applications/pending/owner")]
		public async Task<IActionResult> GetOwnerPendingApplications([FromQuery] Guid ownerId)
		{
			// Fetch all properties listed by the owner using their OwnerId
			var ownerPendingApplications = await dbc.Appssubmit
				.Where(a => a.Status == "Pending" &&
							dbc.AddProps.Any(p => p.PropertyId == a.PropertyId && p.Id == ownerId)) // Match PropertyId and OwnerId
				.Select(a => new
				{
					a.ApplicationId,   
					a.Status,          
					a.SubmittedAt,     
					a.TenantType,      
					a.Comments,
					PropertyType = dbc.AddProps
				.Where(p => p.PropertyId == a.PropertyId)
				.Select(p => p.PropertyType)
				.FirstOrDefault(),
					Property = new
					{
						PropertyDetails = dbc.AddProps
							.Where(p => p.PropertyId == a.PropertyId)
							.Select(p => new
							{
								p.PropertyType,      
								p.Price,             
								p.Street,            
								p.City,              
								p.Pincode,           
								p.Images,            
								p.Description,       
								p.RentalTerms,       
								p.Furnished,         
								p.Bedrooms,          
								p.Rooms,             
								p.Area,              
								p.MobileNumber       
							})
							.FirstOrDefault()
					}
				})
				.ToListAsync();

			// Check if there are no pending applications
			if (ownerPendingApplications == null || !ownerPendingApplications.Any())
			{
				return NotFound("No pending applications found for the owner's properties.");
			}

			// Return the list of pending applications
			return Ok(ownerPendingApplications);
		}

		[HttpGet("applications/accepted/owner")]
		public async Task<IActionResult> GetOwnerAcceptedApplications([FromQuery] Guid ownerId)
		{
			// Fetch all accepted applications for the properties listed by the owner
			var ownerAcceptedApplications = await dbc.Appssubmit
				.Where(a => a.Status == "Accepted" &&
							dbc.AddProps.Any(p => p.PropertyId == a.PropertyId && p.Id == ownerId)) // Match PropertyId and OwnerId
				.Select(a => new
				{
					a.ApplicationId,
					a.Status,
					a.SubmittedAt,
					a.TenantType,
					a.Comments,
					PropertyType = dbc.AddProps
						.Where(p => p.PropertyId == a.PropertyId)
						.Select(p => p.PropertyType)
						.FirstOrDefault(), // Get PropertyType directly
					Property = new
					{
						PropertyDetails = dbc.AddProps
							.Where(p => p.PropertyId == a.PropertyId)
							.Select(p => new
							{
								p.Price,
								p.Street,
								p.City,
								p.Pincode,
								p.Images,
								p.Description,
								p.RentalTerms,
								p.Furnished,
								p.Bedrooms,
								p.Rooms,
								p.Area,
								p.MobileNumber
							})
							.FirstOrDefault()
					}
				})
				.ToListAsync();

			return Ok(ownerAcceptedApplications);
		}

		[HttpGet("viewapplications/admin")]
		public async Task<IActionResult> GetAllApplications()
		{
			
			var applications = await dbc.Appssubmit
				.Select(a => new
				{
					a.ApplicationId,
					a.Status,
					a.SubmittedAt,
					a.TenantType,
					a.Comments,
					a.Id,
					Property = new
					{
						a.Property.PropertyType,
						a.Property.Price,
						a.Property.Street,
						a.Property.City,
						a.Property.Pincode,
						a.Property.Images,
						a.Property.Description
					}
				})
				.ToListAsync();

			if (applications == null || !applications.Any())
			{
				return NotFound("No applications found.");
			}

			return Ok(applications);
		}
		[HttpDelete("applications/delete/{applicationId}")]
		public async Task<IActionResult> DeleteApplication(Guid applicationId)
		{
			var application = await dbc.Appssubmit.FindAsync(applicationId);
			if (application == null)
			{
				return NotFound("Application not found.");
			}

			dbc.Appssubmit.Remove(application);
			await dbc.SaveChangesAsync();

			return Ok("Application deleted successfully.");
		}
	}

}

