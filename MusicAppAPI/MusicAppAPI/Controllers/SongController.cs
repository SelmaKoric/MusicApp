using Microsoft.AspNetCore.Mvc;
using MusicAppAPI.Data;
using MusicAppAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.IO;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using MusicAppAPI.Details;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;

namespace MusicAppAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SongController : Controller
    {
        private AppDbContext _db;

        public SongController(AppDbContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("songList")]
        public async Task<ActionResult<IEnumerable<Song>>> GetSongs()
        {

            return await _db.song.Include(x => x.category).OrderByDescending(x => x.dateOfEditing).ToListAsync();

        }

        [HttpGet]
        [Route("categoryList")]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {

            return await _db.category.ToListAsync();

        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddSong([FromBody] Song song)
        {
            song.dateOfAdding = DateTime.Now;
            _db.song.Add(song);
            await _db.SaveChangesAsync();

            return Ok();

        }

        [HttpGet]
        [Route("getSong")]
        public async Task<ActionResult<Song>> GetSong(int Id)
        {
            try
            {
                var result = await _db.song.FirstOrDefaultAsync(x => x.Id == Id);

                if (result == null) return NotFound();

                return result;
            }
            catch (Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    "Error retrieving data from the database");
            }
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteSong(int Id)
        {
            var song = await _db.song.FirstOrDefaultAsync(x => x.Id == Id);
            if (song == null) return NotFound();
            _db.Remove(song);
            await _db.SaveChangesAsync();
            return Ok();
        }

        [HttpPut]
        [Route("editSong")]
        public async Task<ActionResult> EditSong(int Id, [FromBody] Song song)
        {
            var thisSong = await _db.song.FirstOrDefaultAsync(x => x.Id == Id);
            if (thisSong == null)
            {
                return NotFound();
            }

            thisSong.name = song.name;
            thisSong.artistName = song.artistName;
            thisSong.songUrl = song.songUrl;
            thisSong.dateOfEditing = DateTime.Now;
            thisSong.categoryId = song.categoryId;
            thisSong.imageCurrent = song.imageCurrent;

            _db.SaveChanges();
            return Ok();
        }

    }
}
