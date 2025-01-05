using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Home_demo_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class appointremove : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Appointments_Regs_User_RegId",
                table: "Appointments");

            migrationBuilder.DropIndex(
                name: "IX_Appointments_User_RegId",
                table: "Appointments");

            migrationBuilder.DropColumn(
                name: "User_RegId",
                table: "Appointments");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "User_RegId",
                table: "Appointments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_User_RegId",
                table: "Appointments",
                column: "User_RegId");

            migrationBuilder.AddForeignKey(
                name: "FK_Appointments_Regs_User_RegId",
                table: "Appointments",
                column: "User_RegId",
                principalTable: "Regs",
                principalColumn: "Id");
        }
    }
}
