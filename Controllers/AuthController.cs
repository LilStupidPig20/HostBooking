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
using System.Text;
using System.Threading.Tasks;

namespace HostBooking.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        [Route("login")]
		[HttpPost]
        public async void LoginAsync([FromBody] LoginRequest data)
        {
            var login = data.Login;
            var password = data.Password;

            try
            {
                using (var dbCon = PostgresConn.GetConn())
                {
                    var isAuth = UserRepository.IsAuth(login, password, dbCon);

                    if (!isAuth )
                    {
                        Response.StatusCode = 400;
                        await Response.WriteAsync("Incorrect login or password");
                    }
                    else
                    {
                        var now = DateTime.UtcNow;
                        var jwt = new JwtSecurityToken(
                        issuer: AuthOptions.ISSUER,
                        audience: AuthOptions.AUDIENCE,
                        notBefore: now,
                        expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                        signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                        var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
                        var serializerSettings = new JsonSerializerSettings();
                        var response = new LoginResponse { Login = login, Token = encodedJwt };
                        serializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                        var json = JsonConvert.SerializeObject(response, serializerSettings);
                        await Response.Body.WriteAsync(Encoding.UTF8.GetBytes(json));
                    }
                }
            }
                catch (Exception e)
            {
                Response.StatusCode = 400;
                await Response.WriteAsync(e.Message);
            }
            //Console.WriteLine($"Login {login} password {password}");
            //return new HttpResponseMessage(System.Net.HttpStatusCode.Created);
        }

        
    }

    public class LoginResponse
    {
        public string Token;
        public string Login;
    }

    public class LoginRequest{
        public string Login { get; set; }
        public string Password { get; set; }
    }
}
