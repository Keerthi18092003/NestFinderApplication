using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using Org.BouncyCastle.Ocsp;
using Home_demo_app.Server.Models.Domain;

namespace Home_demo_app.Server.Models.Owner_module
{
    public class Appointment
    {
        [Key]
        public Guid AppointmentId { get; set; }

        [ForeignKey("Addprops")]
        public Guid PropertyId { get; set; }
        public Addprop Property { get; set; }

        [Required]
        [MaxLength(15)]
        public string MobileNumber { get; set; }

        [Required]
        public DateTime PreferredDate { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [ForeignKey("Regs")]
        public Guid Id { get; set; } 
       
    }

}
