using HostBooking.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using HostBooking.Models;
using HostBooking.Models.Context;
using HostBooking.Models.Repositories;
using HostBooking.Models.RequestModels;

namespace HostBooking.Controllers
{
    public class AuthController : Controller
    {
        private ApplicationContext context;
        public AuthController(ApplicationContext context)
        {
            this.context = context;
        }
        
        // создаем JWT-токен
        private static string Token(string login,  string password)
        {
            var claims = new List<Claim> {new(ClaimsIdentity.DefaultNameClaimType, login)};
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                AuthOptions.ISSUER,
                AuthOptions.AUDIENCE,
                claims,
                now,
                now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(),
                    SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            return encodedJwt;
        }
        
        [HttpPost]

        public async void Login([FromBody] LoginRequest data)

        {
            Console.WriteLine(data.Login);
            var login = data.Login;
            var password = data.Password;
            var user = context.Users.FirstOrDefault(a => a.Login == login
                                                            && a.Password == password);
            try
            {
                if (!UserRepository.IsAuth(context, login, password))
                {
                    Response.StatusCode = 400;
                    await Response.WriteAsync("Incorrect login or password");
                }
                else
                {
                    var encodedJwt = Token(login, password);
                    var serializerSettings = new JsonSerializerSettings();
                    var fullNameUser = $"{user.Surname} {user.Name} {user.SecondName}";
                    var loginResponse = new LoginResponse {Token = encodedJwt, UserId = user.UserId, Login = login, FullName = fullNameUser};
                    serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    var jsonLoginResponse = JsonConvert.SerializeObject(loginResponse, serializerSettings);
                    await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(jsonLoginResponse));
                }
            }
            catch (Exception e)
            {
                Response.StatusCode = 500;
                await Response.WriteAsync(e.Message);
            }
        }
    }
}

