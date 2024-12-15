namespace Home_demo_app.Server.Models
{
	public class Appsubmit_details
	{
		public Guid PropertyId { get; set; }
		public string TenantType { get; set; } = string.Empty;
		public string Comments { get; set; } = string.Empty;
		public DateTime SubmittedAt { get; set; }
		public string Status { get; set; }
	}
}
