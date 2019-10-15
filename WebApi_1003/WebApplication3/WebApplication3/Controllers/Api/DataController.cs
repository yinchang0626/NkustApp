using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Data;

namespace WebApplication3.Controllers.Api
{
    [ApiController]
    public class DataController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DataController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/QuestionGroups
        [HttpGet]
        [Route("api/QuestionGroups")]
        public async Task<ActionResult<IEnumerable<QuestionGroup>>> GetQuestionGroups()
        {
            return await _context.QuestionGroup.ToListAsync();
        }
        [HttpGet]
        [Route("api/QuestionType")]
        public dynamic GetQuestionGroup(long groupId)
        {
            var result = _context.QuestionGroup
                .Include(x => x.QuestionTypes)
                .ThenInclude(x => x.Questions)
                .ThenInclude(x => x.Options)
                .SingleOrDefault(x => x.Id == groupId);


            return new
            {
                Group = result.Name,
                QuestionTypes = result.QuestionTypes.Select(x =>
                  {

                      return new
                      {
                          Title = x.Title,
                          Description = x.Description,
                          Questions = x.Questions.Select(y =>
                          {
                              return new
                              {
                                  Question = y.Text,
                                  Answer = y.Answer,
                                  Options = y.Options.Select(z =>
                                  {
                                      return new { Value = z.Value, Text = z.Text };
                                  })
                              };
                          })
                      };

                  })
            };
        }

    }
}
