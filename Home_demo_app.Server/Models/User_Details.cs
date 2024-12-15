namespace Home_demo_app.Server.Models
{
	public class User_Details
	{
		public string Name { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string Gender { get; set; }
		public DateTime DateOfBirth { get; set; }
		public string Password { get; set; }
		public string ConfirmPassword { get; set; }

		public bool IsSuspended { get; set; } = false;
	}
}
