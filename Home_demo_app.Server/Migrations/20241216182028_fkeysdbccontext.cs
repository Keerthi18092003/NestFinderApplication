using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Home_demo_app.Server.Migrations
{
    /// <inheritdoc />
    public partial class fkeysdbccontext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AddProps_Regs_Id",
                table: "AddProps");

            migrationBuilder.AddForeignKey(
                name: "FK_AddProps_Regs_Id",
                table: "AddProps",
                column: "Id",
                principalTable: "Regs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AddProps_Regs_Id",
                table: "AddProps");

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
