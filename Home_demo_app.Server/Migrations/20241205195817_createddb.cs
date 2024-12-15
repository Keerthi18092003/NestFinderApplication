using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Home_demo_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class createddb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_User_Regs",
                table: "User_Regs");

            migrationBuilder.RenameTable(
                name: "User_Regs",
                newName: "Regs");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DateOfBirth",
                table: "Regs",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(DateOnly),
                oldType: "date");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Regs",
                table: "Regs",
                column: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Regs",
                table: "Regs");

            migrationBuilder.RenameTable(
                name: "Regs",
                newName: "User_Regs");

            migrationBuilder.AlterColumn<DateOnly>(
                name: "DateOfBirth",
                table: "User_Regs",
                type: "date",
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2");

            migrationBuilder.AddPrimaryKey(
                name: "PK_User_Regs",
                table: "User_Regs",
                column: "Id");
        }
    }
}
