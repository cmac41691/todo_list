import createTodo from "./modules/todo";
import renderTodo from "./modules/ui";
import "./style.css";

const todo = createTodo("Buy groceries", "Milk, eggs, and bread", "2025-06-14", "High");
renderTodo(todo);
