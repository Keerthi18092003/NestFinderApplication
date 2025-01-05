using System.ComponentModel.DataAnnotations;
using Home_demo_app.Server.Models.Owner_module;

namespace Home_demo_app.Server.Models.Domain
{
	public class User_Reg
	{
		
		public Guid  Id { get; set; }
		public string ? Name { get; set; }
		public string ? Email { get; set; }
		public string ? PhoneNumber { get; set; }
		public string ? Gender { get; set; }
		public DateTime ? DateOfBirth { get; set; }
		public string ? Password { get; set; }
		public string ? ConfirmPassword { get; set; }

		public bool? IsSuspended { get; set; } = false;

        
    }
}
