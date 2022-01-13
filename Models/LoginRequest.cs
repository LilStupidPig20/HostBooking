namespace HostBooking.Models
{
    public class LoginResponse
    {
        public string Login { get; set; }
        public string Token { get; set; }
    }

    public class LoginRequest
    {
        public string Login { get; set; }
        public string Password { get; set; }
    }
}