using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Home_demo_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class fkeysadded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "Appssubmit",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "AddProps",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Id",
                table: "Appssubmit");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "AddProps");
        }
    }
}
