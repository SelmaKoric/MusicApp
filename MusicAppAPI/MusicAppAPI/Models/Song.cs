using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace MusicAppAPI.Models
{
    public class Song
    {
        [Key]
        public int Id { get; set; }
        public string name { get; set; }
        public string artistName { get; set; }
        public string songUrl { get; set; }
        public double rating { get; set; }
        public bool IsFavorite { get; set; }
        public DateTime dateOfAdding { get; set; }
        public DateTime dateOfEditing { get; set; }
        public int categoryId { get; set; }
        public Category category { get; set; }

        [NotMapped]
        public IFormFile imageNew { get; set; }
        public string imageCurrent { get; set; }
    }
}
