using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppAPI.Migrations
{
    public partial class changeSongFieldRateToDouble : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "imageCurrent",
                table: "song");

            migrationBuilder.AlterColumn<double>(
                name: "rating",
                table: "song",
                type: "float",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "rating",
                table: "song",
                type: "int",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<string>(
                name: "imageCurrent",
                table: "song",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
