using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Data;

namespace WebApplication3.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {

        public DbSet<Question> Questions { get; set; }
        public DbSet<WebApplication3.Data.QuestionGroup> QuestionGroup { get; set; }
        public DbSet<WebApplication3.Data.QuestionType> QuestionType { get; set; }
        public DbSet<WebApplication3.Data.QuestionOption> QuestionOption { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

    }
}
