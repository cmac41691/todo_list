import { container } from "webpack";

function renderTodo(todo) {
  const todoContainer = document.createElement('div');
  todoContainer.classList.add('todo');

  const title = document.createElement('h3');
  title.textContent = todo.title;

  const desc = document.createElement('p');
  desc.textContent = todo.description;

  const dueDate = document.createElement('p');
  dueDate.textContent = `Due: ${todo.dueDate}`;

  const priority = document.createElement('p');
  priority.textContent = `Priority: ${todo.priority}`;

  container.appendChild(title);
  container.appendChild(description);
  container.appendChild(dueDate);
  container.appendChild(priority);

  // The container been added to DOM
  document.body.appendChild(container);
  
  
}

export default renderTodo;
