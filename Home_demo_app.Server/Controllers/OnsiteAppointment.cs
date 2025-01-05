using Home_demo_app.Server.Infrastructure;
using Home_demo_app.Server.Models.Owner_module;
using Home_demo_app.Server.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Home_demo_app.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OnsiteAppointment : ControllerBase
    {
        private readonly DataContext dbc;
        public OnsiteAppointment(DataContext dbc)
        {
            this.dbc = dbc;
        }
        [HttpPost("book-appointment")]
        public async Task<IActionResult> BookAppointment([FromBody] AppointmentRequest request)
        {
            if (request == null || string.IsNullOrWhiteSpace(request.MobileNumber))
            {
                return BadRequest(new { Message = "Invalid request data." });
            }
            var property = await dbc.AddProps
                             .FirstOrDefaultAsync(p => p.PropertyId == request.PropertyId);
            var preferredDate = DateTime.SpecifyKind(request.PreferredDate, DateTimeKind.Utc);

            var tenant = await dbc.Regs
                             .FirstOrDefaultAsync(r => r.Id == request.Id);

            // Save the appointment to the database
            var appointment = new Appointment
            {
                PropertyId = request.PropertyId,
                MobileNumber = request.MobileNumber,
                PreferredDate = request.PreferredDate,
                Property = property,
                Id = request.Id
            };

            await dbc.Appointments.AddAsync(appointment);
            await dbc.SaveChangesAsync();

            return Ok(new { Message = "Appointment booked successfully!", Appointment = appointment });
        }

        [HttpGet("property/{propertyId}")]
        public async Task<IActionResult> GetAppointmentsByProperty(Guid propertyId)
        {
            var appointments = await dbc.Appointments
                .Where(a => a.PropertyId == propertyId)
                .ToListAsync();

            return Ok(appointments);
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetAppointmentsByUserId(Guid userId)
        {
            // Fetch appointments with property details
            var appointments = await dbc.Appointments
                .Where(a => a.Id == userId) // Assuming 'Id' corresponds to the userId in your appointments table
                .Select(a => new
                {
                    AppointmentId = a.AppointmentId,
                    PropertyId = a.PropertyId,
                    PreferredDate = a.PreferredDate,
                    MobileNumber = a.MobileNumber,
                    CreatedAt = a.CreatedAt,
                    PropertyDetails = dbc.AddProps 
                        .Where(p => p.PropertyId == a.PropertyId)
                        .Select(p => new
                        {
                            p.PropertyId,
                            p.PropertyType, 
                            p.Street,
                            p.City,
                            p.Price
                        })
                        .FirstOrDefault()
                })
                .ToListAsync();

            // Check if appointments exist
            if (appointments == null || !appointments.Any())
            {
                return NotFound(new { Message = "No appointments found for the specified user." });
            }

            return Ok(appointments);
        }

        [HttpDelete("delete-completed-appointments")]
        public async Task<IActionResult> DeleteCompletedAppointments()
        {
            var currentDateTime = DateTime.UtcNow; // Get the current UTC time
            TimeZoneInfo istTimeZone = TimeZoneInfo.FindSystemTimeZoneById("India Standard Time");

            // Convert the current UTC time to IST
            DateTime currentDateTimeInIST = TimeZoneInfo.ConvertTimeFromUtc(currentDateTime, istTimeZone);
            var completedAppointments = await dbc.Appointments
                .Where(a => a.PreferredDate < currentDateTimeInIST) // Find appointments where preferred date is in the past
                .ToListAsync();

            if (completedAppointments.Any())
            {
                dbc.Appointments.RemoveRange(completedAppointments); // Delete appointments
                await dbc.SaveChangesAsync(); // Save changes to the database
                return Ok(new { Message = "Completed appointments deleted successfully." });
            }

            return NotFound(new { Message = "No completed appointments to delete." });
        }

    }
}
