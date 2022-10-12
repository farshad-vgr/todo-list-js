class Todo {
  constructor(todoInputId, addBtnId, todoListId) {
    this.todoInput = document.getElementById(todoInputId);
    this.addBtn = document.getElementById(addBtnId);
    this.todoList = document.getElementById(todoListId);
    this.todos = [];
    this.storage = window.localStorage;

    this.addBtn.addEventListener("click", () => this.addTodo());

    this.todoInput.addEventListener("keyup", (event) =>
      event.key === "Enter" ? this.addTodo() : null
    );

    this.todoInput.addEventListener("input", () => {
      let inputLength = this.todoInput.value.length;

      inputLength === 0
        ? this.todoInput.classList.remove("checking")
        : this.todoInput.classList.add("checking");
    });

    this.loadTodo();

    this.renderUl();
  }

  addTodo() {
    const todo = this.todoInput.value;

    if (todo.length > 0 && !/^\s*$/.test(todo)) {
      this.todos.push(todo);
      this.todoInput.value = "";
      this.todoInput.classList.remove("checking");
      this.saveTodo();
      this.renderUl();
    }
  }

  renderUl() {
    this.todoList.innerText = "";

    if (this.todos.length === 0) {
      const p = document.createElement("p");
      p.innerText = "TODO List is Empty!";
      this.todoList.append(p);
    } else {
      const ul = document.createElement("ul");
      for (const todo of this.todos) {
        ul.append(this.renderLi(todo));
      }
      this.todoList.append(ul);
    }
  }

  renderLi(todo) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const deleteLink = document.createElement("a");

    deleteLink.addEventListener("click", () => {
      this.deleteTodo(todo);
    });

    deleteLink.innerText = "Delete!";
    span.append(deleteLink);

    li.innerText = todo;
    li.append(span);

    return li;
  }

  saveTodo() {
    this.storage.setItem("todos", JSON.stringify(this.todos));
  }

  loadTodo() {
    const storagedTodo = this.storage.getItem("todos");
    storagedTodo ? (this.todos = JSON.parse(storagedTodo)) : null;
  }

  deleteTodo(todo) {
    if (confirm(`Are you sure you want to delete?? \n    "${todo}"`)) {
      const indexTodo = this.todos.indexOf(todo);
      this.todos.splice(indexTodo, 1);
      this.saveTodo();
      this.renderUl();
    }
  }
}

new Todo("todo-input", "add-btn", "todo-list");
