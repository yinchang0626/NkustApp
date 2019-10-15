using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication3.Data
{
    public class Question
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        public int Seq { get; set; }
        public string Text { get; set; }
        public string Answer { get; set; }
        public ICollection<QuestionOption> Options { get; set; }
        public QuestionType QuestionType { get; set; }
        [HiddenInput]
        public long QuestionTypeId { get; set; }
    }
}
