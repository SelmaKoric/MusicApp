using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppAPI.Migrations
{
    public partial class newFileSong : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "imageCurrent",
                table: "song",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageCurrent",
                table: "song");
        }
    }
}
