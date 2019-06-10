// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using System;
using System.Linq;
using System.Reflection;
using System.Security.Claims;
using IdentityModel;
using IdentityServer4.EntityFramework.DbContexts;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServerAspNetIdentity.Data;
using IdentityServerAspNetIdentity.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace IdentityServerAspNetIdentity
{
    public class SeedData
    {
        public static void EnsureSeedData(IServiceProvider provider)
        {
            provider.GetRequiredService<ApplicationDbContext>().Database.Migrate();
            provider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();
            provider.GetRequiredService<ConfigurationDbContext>().Database.Migrate();

            {
                var userMgr = provider.GetRequiredService<UserManager<ApplicationUser>>();
                var greg = userMgr.FindByNameAsync("Greg").Result;
                if (greg == null)
                {
                    greg = new ApplicationUser
                    {
                        UserName = "Greg"
                    };
                    var result = userMgr.CreateAsync(greg, "Pass123$").Result;
                    if (!result.Succeeded)
                    {
                        throw new Exception(result.Errors.First().Description);
                    }

                    greg = userMgr.FindByNameAsync("Greg").Result;

                    result = userMgr.AddClaimsAsync(greg, new Claim[]{
                                new Claim(JwtClaimTypes.Name, "Greg Santos"),
                                new Claim(JwtClaimTypes.GivenName, "Greg"),
                                new Claim(JwtClaimTypes.FamilyName, "Santos"),
                                new Claim(JwtClaimTypes.Email, "gregsantos00@yahoo.com.br"),
                                new Claim(JwtClaimTypes.EmailVerified, "true", ClaimValueTypes.Boolean),
                                new Claim(JwtClaimTypes.WebSite, "http://greg.com"),
                                new Claim(JwtClaimTypes.Address, @"{ 'street_address': 'address', 'locality': 'Curitiba', 'postal_code': 8300000, 'country': 'Brasil' }", IdentityServer4.IdentityServerConstants.ClaimValueTypes.Json)
                            }).Result;
                    if (!result.Succeeded)
                    {
                        throw new Exception(result.Errors.First().Description);
                    }
                    Console.WriteLine("Greg created");
                }
                else
                {
                    Console.WriteLine("Greg already exists");
                }
            }

            {
                var context = provider.GetRequiredService<ConfigurationDbContext>();
                if (!context.Clients.Any())
                {
                    foreach (var client in Config.GetClients())
                    {
                        context.Clients.Add(client.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.IdentityResources.Any())
                {
                    foreach (var resource in Config.GetIdentityResources())
                    {
                        context.IdentityResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (!context.ApiResources.Any())
                {
                    foreach (var resource in Config.GetApis())
                    {
                        context.ApiResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
            }
        }
    }
}