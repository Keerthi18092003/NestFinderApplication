using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Home_demo_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class applictable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AddProps_Regs_Id",
                table: "AddProps");

            migrationBuilder.DropIndex(
                name: "IX_AddProps_Id",
                table: "AddProps");

            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "AddProps",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<Guid>(
                name: "Id",
                table: "AddProps",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.CreateIndex(
                name: "IX_AddProps_Id",
                table: "AddProps",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AddProps_Regs_Id",
                table: "AddProps",
                column: "Id",
                principalTable: "Regs",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }
    }
}
