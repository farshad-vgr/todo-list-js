class Todo {
  constructor(todoInputId, addBtnId, searchInputId, clearBtnId, todoListId) {
    this.todoInput = document.getElementById(todoInputId);
    this.addBtn = document.getElementById(addBtnId);
    this.searchInput = document.getElementById(searchInputId);
    this.clearBtn = document.getElementById(clearBtnId);
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

    this.searchInput.addEventListener("input", (event) =>
      this.searchTodo(event)
    );

    this.clearBtn.addEventListener("click", () => this.clearTodoList());

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
    const deleterSpan = document.createElement("span");

    deleterSpan.addEventListener("click", () => {
      this.deleteTodo(todo);
    });

    deleterSpan.innerText = "Delete!";

    li.innerHTML = `
    <span>${this.todos.indexOf(todo) + 1}.</span>
    <span>${todo}</span>
    `;

    li.append(deleterSpan);

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

  searchTodo(event) {
    if (this.todos.length === 0) {
      return;
    } else {
      let arryOfLi = Array.from(
        document.querySelector("#todo-list ul").children
      );

      arryOfLi.forEach((li) => {
        let textOfLi = li
          .querySelector("span")
          .nextElementSibling.innerText.toLowerCase();
        let enteredText = event.target.value.toLowerCase().trim();
        if (textOfLi.includes(enteredText)) {
          li.style.display = "flex";
        } else {
          li.style.display = "none";
        }
      });
    }
  }

  clearTodoList() {
    if (this.todos.length === 0) {
      return;
    } else {
      if (confirm(`Are you sure you want to clear list??`)) {
        this.todos = [];
        this.saveTodo();
        this.renderUl();
      }
    }
  }
}

new Todo("todo-input", "add-btn", "search-input", "clear-btn", "todo-list");

class Theme {
  constructor(styleSrcId, themeBtnId) {
    this.styleSrc = document.getElementById(styleSrcId);
    this.themeBtn = document.getElementById(themeBtnId);

    this.themeBtn.addEventListener("click", () => this.themeChanger());
  }

  themeChanger() {
    if (this.themeBtn.innerText === "Dark mode") {
      this.themeBtn.innerText = "Light mode";
      this.styleSrc.setAttribute("href", "styleDarkTheme.css");
    } else {
      this.themeBtn.innerText = "Dark mode";
      this.styleSrc.setAttribute("href", "styleLightTheme.css");
    }
  }
}

new Theme("style-src", "theme");
