using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using ToDoService.Dtos;

namespace ToDoService.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ToDosController : ControllerBase
    {
        private static long currentId = 0;
        private static long thorwExceptionIndex = 0;
        private static List<ToDoItem> toDoItems = new List<ToDoItem>()
        {
            new ToDoItem()
            {
                Title = "Home work",
                Description = "Have to complete home work",
                Id = currentId,
                IsDone = false
            }
        };

        [HttpGet("{id}")]
        public ToDoItem Get(long id)
        {
            CheckAndThrowException();

            return toDoItems.FirstOrDefault(todoItem => todoItem.Id == id);
        }

        [HttpGet]
        public List<ToDoItem> List()
        {
            CheckAndThrowException();
            return toDoItems;
        }

        [HttpPost]
        public ActionResult<ToDoItem> Post(ToDoItem toDoItem)
        {
            CheckAndThrowException();
            if (toDoItem == null)
            {
                return BadRequest();
            }

            currentId++;
            toDoItem.Id = currentId;
            toDoItems.Add(toDoItem);

            return CreatedAtAction(nameof(Get), new { id = toDoItem.Id }, toDoItem);
        }

        [HttpPut]
        public ToDoItem Update(ToDoItem todoItem)
        {
            CheckAndThrowException();
            var foundToDoItem = toDoItems.FirstOrDefault(item => item.Id == todoItem.Id);
            if (foundToDoItem != null)
            {
                foundToDoItem.IsDone = true;
                foundToDoItem.Description = todoItem.Description;
                foundToDoItem.Title = todoItem.Title;
            }

            return foundToDoItem;
        }

        [HttpDelete]
        public ToDoItem Delete(long id)
        {
            CheckAndThrowException();
            var foundToDoItem = toDoItems.FirstOrDefault(todoItem => todoItem.Id == id);

            if (foundToDoItem != null)
            {
                toDoItems.Remove(foundToDoItem);
            }

            return foundToDoItem;
        }

        private void CheckAndThrowException()
        {
            thorwExceptionIndex++;
        }
    }
}