import './style.css'; 
import { createTodo, addTodo } from './modules/todo.js';
import { renderTodos } from './modules/ui.js';
import { filterTodosByDueDates, sortTodosByDueDate } from './modules/todo.js';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const due = document.getElementById('todo-due');
const filterSelect = document.getElementById('filter-select');
const sortSelect = document.getElementById('sort-select');

// The refresh function will apply the filter & sort then it will re-render
function refreshView(){
  // starts by filter
  const filtered = filterTodosByDueDates(filterSelect.value);
  // next it sort the value
  const sorted = sortTodosByDueDate(filtered, sortSelect.value);
  // lastly it renders it all
  renderTodos(sorted);
}

filterSelect.addEventListener('change', refreshView);
sortSelect.addEventListener('change', refreshView);



form.addEventListener('submit', e => {
  e.preventDefault();

  const text = input.value.trim();
  if (!text) return;


  const todo = createTodo(text, due.value);
  addTodo(todo);

  
 
  form.reset();
 
});

// initial render (and now its all wire up)
refreshView();
