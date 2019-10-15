using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication3.Data.Migrations
{
    public partial class modify_question_3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionOption_Questions_QuestionId",
                table: "QuestionOption");

            migrationBuilder.AlterColumn<long>(
                name: "QuestionId",
                table: "QuestionOption",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionOption_Questions_QuestionId",
                table: "QuestionOption",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionOption_Questions_QuestionId",
                table: "QuestionOption");

            migrationBuilder.AlterColumn<long>(
                name: "QuestionId",
                table: "QuestionOption",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionOption_Questions_QuestionId",
                table: "QuestionOption",
                column: "QuestionId",
                principalTable: "Questions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
