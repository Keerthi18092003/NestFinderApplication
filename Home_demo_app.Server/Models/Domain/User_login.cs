using System.ComponentModel.DataAnnotations;

namespace Home_demo_app.Server.Models.Domain
{
	public class User_login
	{

		[Required(ErrorMessage = "Email is required")]
		public string email {  get; set; }

		[Required(ErrorMessage = "Password is required")]
		public string Password { get; set; }



	}
}
