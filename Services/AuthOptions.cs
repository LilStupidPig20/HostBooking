using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HostBooking
{
    interface AuthOptions
    {
        public const string ISSUER = "Team3153"; // издатель токена
        public const string AUDIENCE = "HostUser"; // потребитель токена
        const string KEY = "there_is_the_way";   // ключ для шифрации
        public const int LIFETIME = 1 * 60 * 24 * 14; // время жизни токена - 1 минута
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
