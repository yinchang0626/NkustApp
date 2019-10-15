using Microsoft.EntityFrameworkCore.Migrations;

namespace WebApplication3.Data.Migrations
{
    public partial class modify_question_1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionType_QuestionGroup_GroupId",
                table: "QuestionType");

            migrationBuilder.AlterColumn<long>(
                name: "GroupId",
                table: "QuestionType",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionType_QuestionGroup_GroupId",
                table: "QuestionType",
                column: "GroupId",
                principalTable: "QuestionGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_QuestionType_QuestionGroup_GroupId",
                table: "QuestionType");

            migrationBuilder.AlterColumn<long>(
                name: "GroupId",
                table: "QuestionType",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddForeignKey(
                name: "FK_QuestionType_QuestionGroup_GroupId",
                table: "QuestionType",
                column: "GroupId",
                principalTable: "QuestionGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
