using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MusicAppAPI.Data;
using MusicAppAPI.Details;
using MusicAppAPI.Models;
using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace MusicAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;
        private AppDbContext _db;
        private readonly Settings _settings;

        public UserController(AppDbContext db,UserManager<User> userManager,SignInManager<User> signInManager, IOptions<Settings> settings)
        {
            this._signInManager = signInManager;
            this._userManager = userManager;
            this._settings = settings.Value;
            this._db = db;
        }

       

        [HttpPost]
        [Route("register")]

        public async Task<object> UserPost(UserModel userModel)
        {
            var user = new User
            {
                UserName = userModel.userName,
                Email=userModel.email,
                fullName=userModel.fullName
            };

            try
            {
                var usr = await this._userManager.CreateAsync(user, userModel.password);
                return Ok(usr);
            }
            catch (Exception ex)
            {
                return ex;
            }
        }

        [HttpPost]
        [Route("login")]

        public async Task<IActionResult> Login(LoginModel loginModel)
        {
            var user = await _userManager.FindByNameAsync(loginModel.UserName);
            if (user != null && await _userManager.CheckPasswordAsync(user,loginModel.password))
            {
                var tokenD = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new Claim[]
                    {
                        new Claim("UserID",user.Id.ToString())
                    }),
                    Expires = DateTime.UtcNow.AddDays(1),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                };
                var tokenHandler = new JwtSecurityTokenHandler();
                var securityToken = tokenHandler.CreateToken(tokenD);
                var token = tokenHandler.WriteToken(securityToken);

                return Ok(new { token });
            }
            else
            {
                return BadRequest(new { message = "Username or password is incorrect!" });
            }
        }

        [HttpGet]
        public async Task<object> GetCurrentUser()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                return new
                {
                    user.Email
                };
            }
            else
                return null;
        }

    }
}
