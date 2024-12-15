using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations;

namespace Home_demo_app.Server.Models.Owner_module
{
	public class Appsubmit
	{
		[Key]
		public Guid ApplicationId { get; set; }

		// Foreign key to Property table
		public Guid PropertyId { get; set; }
		public Addprop Property { get; set; } // Navigation property

		public string TenantType { get; set; } = string.Empty;
		public string Comments { get; set; } = string.Empty;
		public DateTime SubmittedAt { get; set; }
		public string Status { get; set; }
	}
}
