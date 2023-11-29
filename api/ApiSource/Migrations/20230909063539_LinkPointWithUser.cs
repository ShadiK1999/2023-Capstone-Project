using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ApiSource.Migrations {
    /// <inheritdoc />
    public partial class LinkPointWithUser : Migration {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder) {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "Points",
                type: "varchar(255)",
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Points_UserId",
                table: "Points",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Points_AspNetUsers_UserId",
                table: "Points",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder) {
            migrationBuilder.DropForeignKey(
                name: "FK_Points_AspNetUsers_UserId",
                table: "Points");

            migrationBuilder.DropIndex(
                name: "IX_Points_UserId",
                table: "Points");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Points");
        }
    }
}
