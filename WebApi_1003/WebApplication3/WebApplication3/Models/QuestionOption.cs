using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication3.Data
{
    public class QuestionOption
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }
        [HiddenInput]
        public string Value { get; set; }
        public string Text { get; set; }
        public Question Question { get; set; }
        [HiddenInput]
        public long QuestionId { get; set; }

    }
}
