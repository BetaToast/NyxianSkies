﻿using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(NyxianSkies.Startup))]

namespace NyxianSkies
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.MapSignalR();
        }
    }
}
