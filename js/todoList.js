export class ToDoList {
  constructor() {
    this.tdList = [];
  }

  addTodo(todo) {
    this.tdList.push(todo);
  }

  renderToDo() {
    let content = "";
    content = this.tdList.reduceRight((tdContent, item, index) => {
      tdContent += `
       <li>
            <span>${item.textTodo}</span>
            <div class="buttons">
                <button class="remove" data-id="${index}" data-completed=${item.completed} onclick="removeToDo(event)">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" data-id="${index}" data-completed=${item.completed} onclick="completeToDo(event)">
                    <i class="far fa fa-check-circle"></i>
                    <i class="fas fa fa-check-circle"></i>
                </button>
            </div>
        </li>
      `;
      return tdContent;
    }, "");

    return content;
  }

  removeToDo(index) {
    this.tdList.splice(index, 1);
  }

  sortToDoList(isDES) {
    this.tdList.sort((todo, nextTodo) => {
      const textA = todo.textTodo.toLowerCase();
      const textB = nextTodo.textTodo.toLowerCase();
      // ASC - localCompare(so sanh tieng viet co dau)
      return textB.localeCompare(textA);
    });
    if (isDES) {
      this.tdList.reverse();
    }
  }
}
