using Home_demo_app.Server.Infrastructure;
using Home_demo_app.Server.Migrations;
using Home_demo_app.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.IO;  // For File-related methods
using System.Threading.Tasks;  // For async methods

namespace Home_demo_app.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AddProperty : ControllerBase
	{
		private readonly DataContext dbc;

		public AddProperty(DataContext dbc)
		{
			this.dbc = dbc;
			
		}
		[HttpPost("Add")]
		
		public async Task<IActionResult> CreateProperty(Addpropdetails model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			

			List<string> imagePaths = new List<string>();

			
			if (model.Images != null && model.Images.Count > 0)
			{
				

				foreach (var base64Image in model.Images)
				{
					if (!string.IsNullOrEmpty(base64Image))
					{
						try
						{
							
							var base64Parts = base64Image.Split(',');
							if (base64Parts.Length > 1)
							{
								
								var imageBytes = Convert.FromBase64String(base64Parts[1]); // Get the base64 part

								
								var fileName = Guid.NewGuid().ToString() + ".jpg"; // You can change the extension based on the image format
								var filePath = Path.Combine("wwwroot", "images", fileName); // Save image in the wwwroot/images folder (for example)
								Console.WriteLine(filePath);

								
								var directory = Path.GetDirectoryName(filePath);
								
								if (!Directory.Exists(directory))
								{
									Directory.CreateDirectory(directory);
								}

								
								await System.IO.File.WriteAllBytesAsync(filePath, imageBytes);

								
								imagePaths.Add($"images/{fileName}");

							}
							else
							{
								
								Console.WriteLine("Invalid base64 string format.");
							}
						}
						catch (FormatException ex)
						{
							
							Console.WriteLine("Invalid base64 string: " + ex.Message);
						}
					}
					else
					{
						
						Console.WriteLine("Empty or null image.");
					}
				}


				
				model.Images = imagePaths;
			}
			
			var property = new Addprop
			{
				PropertyId = Guid.NewGuid(),
				Id = model.Id,
				PropertyType = model.PropertyType,
				Price = model.Price,
				Street = model.Street,
				City = model.City,
				Pincode = model.Pincode,
				Description = model.Description,
				RentalTerms = model.RentalTerms,
				Furnished = model.Furnished,
				Bedrooms = model.Bedrooms,
				Rooms = model.Rooms,
				Area = model.Area,
				MobileNumber = model.MobileNumber,
				Images = model.Images,
			};


			// Add the property to the database
			await dbc.AddProps.AddAsync(property);
			await dbc.SaveChangesAsync();

			

			return Ok(new { message = "Property added successfully!", propertyId = property.PropertyId });
		}

		[HttpGet("view/{id}")]
		public async Task<IActionResult> GetUserProperties(Guid id)
		{
			var user = await dbc.Regs.FirstOrDefaultAsync(u => u.Id == id);
			if (user == null)
			{
				return NotFound("User not found.");
			}
			var userProperties = await dbc.AddProps
				.Where(p => p.Id == id) // Filter by UserId
				.ToListAsync();

			if (userProperties == null || !userProperties.Any())
			{
				return NotFound("No properties found for the user.");
			}

			return Ok(userProperties);
		}

		[HttpGet("view")]
		public async Task<IActionResult> GetAllProperties()
		{
			var props = dbc.AddProps.ToList();
			if (props == null || !props.Any())
			{
				return NotFound("No properties found.");
			}
			return Ok(props);
		}


		[HttpGet("edit/{id}")]
		public async Task<IActionResult> GetPropertyById(Guid id)
		{
			if (id == Guid.Empty)
			{
				return BadRequest("Invalid property ID.");
			}


			// Find the property by ID
			var property = await dbc.AddProps.FindAsync(id);
			if (property == null)
			{
				return NotFound("Property not found.");
			}

			return Ok(property);
		}

		[HttpPut("edit/{id}")]
		public async Task<IActionResult> EditListing(Guid id,[FromBody] Addpropdetails updatedProperty)
		{
			if (updatedProperty == null || id == Guid.Empty)
			{
				return BadRequest("Invalid property data.");
			}


			// Find the existing property by ID
			var existingProperty = await dbc.AddProps.FindAsync(id);
			if (existingProperty == null)
			{
				return NotFound("Property not found.");
			}

			// Update the fields of the property
			existingProperty.PropertyType = updatedProperty.PropertyType;
			existingProperty.Price = updatedProperty.Price;
			existingProperty.Street = updatedProperty.Street;
			existingProperty.City = updatedProperty.City;
			existingProperty.Pincode = updatedProperty.Pincode;
			existingProperty.Description = updatedProperty.Description;
			existingProperty.RentalTerms = updatedProperty.RentalTerms;
			existingProperty.Bedrooms = updatedProperty.Bedrooms;
			existingProperty.Rooms = updatedProperty.Rooms;
			existingProperty.Area = updatedProperty.Area;
			existingProperty.Furnished = updatedProperty.Furnished;
			existingProperty.MobileNumber = updatedProperty.MobileNumber;
			if (updatedProperty.Images != null && updatedProperty.Images.Any())
			{
				List<string> updatedImagePaths = new List<string>();

				foreach (var base64Image in updatedProperty.Images)
				{
					if (!string.IsNullOrEmpty(base64Image))
					{
						try
						{
							var base64Parts = base64Image.Split(',');
							if (base64Parts.Length > 1)
							{
								var imageBytes = Convert.FromBase64String(base64Parts[1]); // Get the base64 part

								var fileName = Guid.NewGuid().ToString() + ".jpg"; // Generate a unique file name
								var filePath = Path.Combine("wwwroot", "images", fileName); // Path to save image
								Console.WriteLine(filePath);

								var directory = Path.GetDirectoryName(filePath);
								if (!Directory.Exists(directory))
								{
									Directory.CreateDirectory(directory);
								}

								// Save the image
								await System.IO.File.WriteAllBytesAsync(filePath, imageBytes);

								updatedImagePaths.Add($"images/{fileName}");
							}
							else
							{
								Console.WriteLine("Invalid base64 string format.");
							}
						}
						catch (FormatException ex)
						{
							Console.WriteLine("Invalid base64 string: " + ex.Message);
						}
					}
				}

				// Update the image paths
				existingProperty.Images = updatedImagePaths;
			}

			try
			{
				dbc.AddProps.Update(existingProperty);
				await dbc.SaveChangesAsync();
				return Ok("Property updated successfully.");
			}
			catch (Exception ex)
			{
				return StatusCode(500, $"Internal server error: {ex.Message}");
			}
		}
		[HttpDelete]
		[Route("delete/{id:guid}")]
		public IActionResult DeleteProperty(Guid id)
		{

			var property = dbc.AddProps.FirstOrDefault(p => p.PropertyId == id);

			if (property == null)
			{
				return NotFound();
			}

			dbc.AddProps.Remove(property);
			dbc.SaveChanges();

			return Ok(); // Success response
		}

		[HttpGet("filter")]
		public IActionResult GetFilteredProperties(string type)
		{
			var filteredProperties = dbc.AddProps
				.Where(p => p.PropertyType.ToLower() == type.ToLower())
				.ToList();

			if (filteredProperties == null || !filteredProperties.Any())
			{
				return NotFound("No properties found for the selected type.");
			}

			return Ok(filteredProperties);
		}



	}


}
