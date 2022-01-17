namespace HostBooking.Models.RequestModels
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public string UserId { get; set; }
        public string Login { get; set; }
        public string FullName { get; set; }
        
    }
}