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
using HostBooking.ViewModels;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.EntityFrameworkCore;
using HostBooking.Models;

namespace HostBooking.Controllers
{
    public class AuthController : Controller
    {
        private ApplicationContext context;
        public AuthController(ApplicationContext context)
        {
            this.context = context;
        }
        
        [HttpGet]
        public IActionResult Login() => Json("0");

        [HttpPost]
        [ValidateAntiForgeryToken]
       
        /*public async Task<IActionResult> Login(string login, string password)
        {
            var model = new LoginModel(login, password);
            var user = await UserRepository.IsAuth(context, model);
            if (user != null)
            {
                // Создаем заявку на аутентификацию
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, model.Login)
                };
                // Идентифицируем заявку.
                var identity = new ClaimsIdentity(claims, "login");
                // Передаем заявку в Principal
                var principal = new ClaimsPrincipal(identity);
                // производим запись в контекст данные о Куки с использованием имени схемы
                // и объекта ClaimsPrincipal
                await HttpContext.SignInAsync("CookieAuth", principal);

                //Перенаправляем на домашнюю страницу, после входа в систему.
                return Json(user);
            }

            return new NotFoundResult();
        }
        */
        [HttpPost]
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
        


        public async Task<IActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
            return RedirectToAction("Login", "Auth");
        }
    }
}

