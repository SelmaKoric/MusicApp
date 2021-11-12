using Microsoft.AspNetCore.Identity;
using MusicAppAPI.Details;
using MusicAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicAppAPI.Data
{
    public static class Initializator
    {
        public static void Initialize(UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            SeedRoles(roleManager);
            SeedUser(userManager);
        }
        public static void SeedUser(UserManager<User> userManager)
        {
            if (userManager.FindByNameAsync(Roles.AdminUserName).Result == null)
            {
                var user = new User
                {
                    UserName = Roles.AdminUser,
                    Email="admin@gmail.com"
                };


                var result = userManager.CreateAsync(user, "Adm1n123").Result;

                if (result.Succeeded)
                {
                   userManager.AddToRoleAsync(user, Roles.AdminUser).Wait();
                }
            }
        }

        public static async void SeedRoles(RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.RoleExistsAsync(Roles.AdminUser).Result)
            {
                var role = new IdentityRole
                {
                    Name = Roles.AdminUser
                };

                await roleManager.CreateAsync(role);
            }
            if (!roleManager.RoleExistsAsync(Roles.EndUser).Result)
            {
                var role = new IdentityRole
                {
                    Name = Roles.EndUser
                };

                await roleManager.CreateAsync(role);
            }
        }
    }
}
