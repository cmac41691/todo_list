import './style.css'; 
import { createTodo, addTodo } from './modules/todo.js';
import { renderTodos } from './modules/ui.js';
import { filterTodosByDueDates } from './modules/todo.js';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const due = document.getElementById('todo-due');

const filterSelect = document.getElementById('filter-select');

filterSelect.addEventListener('change', () => {
// This goes through the chosen filter, then it pull from filtered list and re-render
const filtered =filterTodosByDueDates(filterSelect.value);
renderTodos(filtered); 
});

form.addEventListener('submit', e => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;


  const todo = createTodo(text, due.value);
  addTodo(todo);

  
 
  form.reset();
 
});

// initial render (will be empty)
renderTodos();
