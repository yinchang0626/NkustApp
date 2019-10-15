using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebApplication3.Data;

namespace WebApplication3.Controllers
{
    public class QuestionsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public QuestionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Questions
        public IActionResult Index(long questionTypeId)
        {
            var questionType = _context.QuestionType
                .Include(x => x.Group)
                .Include(x => x.Questions).SingleOrDefault(x => x.Id == questionTypeId);

            if (questionType == null)
            {
                return NotFound();
            }
            this.ViewBag.QuestionType = questionType;

            //var model = _context.Questions
            //    .Include(x => x.QuestionType)
            //    .Where(x => x.QuestionType.Id == id).ToList()
            //    .ToList();


            return View(questionType.Questions);
        }

        // GET: Questions/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var question = await _context.Questions
                .FirstOrDefaultAsync(m => m.Id == id);
            if (question == null)
            {
                return NotFound();
            }

            return View(question);
        }

        // GET: Questions/Create
        public IActionResult Create(long questionTypeId)
        {
            var questionType = _context.QuestionType.Include(x => x.Questions).SingleOrDefault(x => x.Id == questionTypeId);
            if (questionType == null)
            {
                return NotFound();
            }
            this.ViewBag.QuestionType = questionType;

            return View();
        }

        // POST: Questions/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Seq,Text,Answer,QuestionTypeId")] Question question)
        {
            if (ModelState.IsValid)
            {
                _context.Add(question);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Edit), new { id = question.Id, questionTypeId = question.QuestionTypeId });
            }
            return View(question);
        }

        // GET: Questions/Edit/5
        public async Task<IActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var question = _context.Questions.Include(x => x.Options).Include(x => x.QuestionType).SingleOrDefault(x => x.Id == id);//await _context.Questions.FindAsync(id);
            if (question == null)
            {
                return NotFound();
            }
            this.ViewBag.QuestionType = question.QuestionType;
            return View(question);
        }

        // POST: Questions/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("Id,Seq,Text,Answer,QuestionTypeId")] Question question)
        {
            if (id != question.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(question);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!QuestionExists(question.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index), new { questionTypeId = question.QuestionTypeId });
            }
            return View(question);
        }

        // GET: Questions/Delete/5
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var question = await _context.Questions
                .FirstOrDefaultAsync(m => m.Id == id);
            if (question == null)
            {
                return NotFound();
            }

            return View(question);
        }

        // POST: Questions/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            var question = await _context.Questions.FindAsync(id);
            _context.Questions.Remove(question);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index), new { questionTypeId = question.QuestionTypeId });
        }

        private bool QuestionExists(long id)
        {
            return _context.Questions.Any(e => e.Id == id);
        }

        public async Task<IActionResult> AddOption(QuestionOption newItem)
        {
            var question = _context.Questions.Include(x => x.QuestionType).SingleOrDefault(x => x.Id == newItem.QuestionId);

            if (!ModelState.IsValid)
            {
                return RedirectToAction("Index");
            }
            _context.Add(newItem);
            await _context.SaveChangesAsync();
            return RedirectToAction("Edit", new { id = newItem.Question.Id, questionTypeId = question.QuestionTypeId });
        }
        public async Task<IActionResult> RemoveOption(long id)
        {
            var removeItem = _context.QuestionOption
                .Include(x => x.Question)
                .Include(x => x.Question.QuestionType)
                .SingleOrDefault(x => x.Id == id);
            _context.QuestionOption.Remove(removeItem);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Edit), new { id = removeItem.Question.Id, questionTypeId = removeItem.Question.QuestionTypeId });
        }
    }
}
