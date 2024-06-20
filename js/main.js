// Import
import { ToDo } from "./todo.js";
import { ToDoList } from "./todoList.js";

// Create Intance
let todoList = new ToDoList();
let completedList = new ToDoList();
// Get Ele by id
const getEle = (id) => {
  return document.getElementById(id);
};

// Render UI
// render Task
const showToDoList = (ulToDo) => {
  ulToDo.innerHTML = todoList.renderToDo();
};
const showCompletedList = (ulCompleted) => {
  ulCompleted.innerHTML = completedList.renderToDo();
};
// End Render UI

// Add to do method
const addToDo = () => {
  const txtToDo = getEle("newTask").value;
  if (txtToDo.trim() === "") {
    alert("Vui lòng nhập nội dung cần thêm!");
    return;
  }
  const ulToDo = getEle("todo");

  let todo = new ToDo(txtToDo.trim());

  todoList.addTodo(todo);

  showToDoList(ulToDo);

  // Clear input and focus
  getEle("newTask").value = "";
  getEle("newTask").focus();
};

// Remove todo method
const removeTodo = (e) => {
  let tdIndex = e.currentTarget.getAttribute("data-id");
  let completed = e.currentTarget.getAttribute("data-completed");

  let ulToDo = getEle("todo");
  let ulCompleted = getEle("completed");
  console.log(completed);
  if (completed === "true") {
    completedList.removeToDo(tdIndex);
    showCompletedList(ulCompleted);
  } else if (completed === "false") {
    todoList.removeToDo(tdIndex);
    showToDoList(ulToDo);
  } else {
    alert("Không thể xóa nhiệm vụ!");
  }
};

// Move to do
const moveToDo = (depart, arrival, tdIndex, objToDo) => {
  // Remove to do from depart
  depart.removeToDo(tdIndex);
  // Add to do to arrival
  arrival.addTodo(objToDo);
};

// Complete todo Method
const completeToDo = (e) => {
  let tdIndex = e.currentTarget.getAttribute("data-id");
  let completed = e.currentTarget.getAttribute("data-completed");

  let ulToDo = getEle("todo");
  let ulCompleted = getEle("completed");

  if (completed === "false") {
    let completedItem = todoList.tdList.slice(tdIndex, tdIndex + 1);

    let objToDo = new ToDo(completedItem[0].textTodo, true);

    // move todo
    moveToDo(todoList, completedList, tdIndex, objToDo);
    showToDoList(ulToDo);
    showCompletedList(ulCompleted);
  } else if (completed === "true") {
    let undoItem = completedList.tdList.slice(tdIndex, tdIndex + 1);
    let objToDo = new ToDo(undoItem[0].textTodo, false);
    // move todo
    moveToDo(completedList, todoList, tdIndex, objToDo);
    showToDoList(ulToDo);
    showCompletedList(ulCompleted);
  } else {
    alert("Please reload page!");
  }
};

// Sort
const sortASC = (e) => {
  let ulToDo = getEle("todo");
  todoList.sortToDoList(false);

  showToDoList(ulToDo);
};

const sortDES = (e) => {
  let ulToDo = getEle("todo");
  todoList.sortToDoList(true);

  showToDoList(ulToDo);
};
// Add Event for buttons
getEle("addItem").addEventListener("click", () => {
  addToDo();
});

window.removeToDo = removeTodo;
window.completeToDo = completeToDo;
window.sortASC = sortASC;
window.sortDES = sortDES;
