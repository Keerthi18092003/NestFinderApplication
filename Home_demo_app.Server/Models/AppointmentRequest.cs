namespace Home_demo_app.Server.Models
{
    public class AppointmentRequest
    {
        public Guid PropertyId { get; set; }
        public Guid Id { get; set; }
        public string MobileNumber { get; set; }
        public DateTime PreferredDate { get; set; }
    }
}
