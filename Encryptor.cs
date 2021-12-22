using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace HostBooking
{
    public class Encryptor
    {
        public static string GetHashString(string s)
        {
            byte[] bytes = Encoding.UTF8.GetBytes(s);

            MD5CryptoServiceProvider CSP =
                new MD5CryptoServiceProvider();

            byte[] byteHash = CSP.ComputeHash(bytes);

            string hash = string.Empty;

            foreach (byte b in byteHash)
                hash += string.Format("{0:x2}", b);

            return hash;
        }
    }
}
