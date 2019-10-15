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
    public class QuestionGroupsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public QuestionGroupsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: QuestionGroups
        public async Task<IActionResult> Index()
        {
            return View(await _context.QuestionGroup.ToListAsync());
        }

        // GET: QuestionGroups/Details/5
        public async Task<IActionResult> Details(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var questionGroup = await _context.QuestionGroup
                .FirstOrDefaultAsync(m => m.Id == id);
            if (questionGroup == null)
            {
                return NotFound();
            }

            return View(questionGroup);
        }

        // GET: QuestionGroups/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: QuestionGroups/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Name")] QuestionGroup questionGroup)
        {
            if (ModelState.IsValid)
            {
                _context.Add(questionGroup);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(questionGroup);
        }

        // GET: QuestionGroups/Edit/5
        public async Task<IActionResult> Edit(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var questionGroup = await _context.QuestionGroup.FindAsync(id);
            if (questionGroup == null)
            {
                return NotFound();
            }
            return View(questionGroup);
        }

        // POST: QuestionGroups/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(long id, [Bind("Id,Name")] QuestionGroup questionGroup)
        {
            if (id != questionGroup.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(questionGroup);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!QuestionGroupExists(questionGroup.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(questionGroup);
        }

        // GET: QuestionGroups/Delete/5
        public async Task<IActionResult> Delete(long? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var questionGroup = await _context.QuestionGroup
                .FirstOrDefaultAsync(m => m.Id == id);
            if (questionGroup == null)
            {
                return NotFound();
            }

            return View(questionGroup);
        }

        // POST: QuestionGroups/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(long id)
        {
            var questionGroup = await _context.QuestionGroup.FindAsync(id);
            _context.QuestionGroup.Remove(questionGroup);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool QuestionGroupExists(long id)
        {
            return _context.QuestionGroup.Any(e => e.Id == id);
        }
    }
}
