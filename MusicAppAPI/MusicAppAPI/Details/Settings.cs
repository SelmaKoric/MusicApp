﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MusicAppAPI.Models
{
    public class Settings
    {
        public string JWT_Secret { get; set; }
        public string Client_URL { get; set; }
    }
}