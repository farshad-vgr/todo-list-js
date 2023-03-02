const mb = document.getElementById("main-btn");

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

		this.todoInput.addEventListener("keyup", (event) => (event.key === "Enter" ? this.addTodo() : null));

		this.todoInput.addEventListener("input", () => {
			let inputLength = this.todoInput.value.length;

			inputLength === 0 ? this.todoInput.classList.remove("checking") : this.todoInput.classList.add("checking");
		});

		this.searchInput.addEventListener("input", (event) => this.searchTodo(event));

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

		deleterSpan.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 cursor-pointer">
  			<path class="cursor-pointer" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		`;

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

			let arryOfLi = Array.from(document.querySelector("#todo-list ul").children);

			arryOfLi[indexTodo].classList.add("fall"); // delete item with animation

			setTimeout(() => {
				this.todos.splice(indexTodo, 1);
				this.saveTodo();
				this.renderUl();
			}, 500);
		}
	}

	searchTodo(event) {
		if (this.todos.length === 0) {
			return;
		} else {
			let arryOfLi = Array.from(document.querySelector("#todo-list ul").children);

			arryOfLi.forEach((li) => {
				let textOfLi = li.querySelector("span").nextElementSibling.innerText.toLowerCase();
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
	constructor(themeBtnId) {
		this.themeBtn = document.getElementById(themeBtnId);

		this.storage = window.localStorage;

		// this.themeBtn.addEventListener("click", () => this.themeChanger(this.themeBtn.innerText));

		// this.loadThemeState();
	}

	// themeChanger(mode) {
	// 	let themeSensitiveElements = [
	// 		document.querySelector("body"),
	// 		document.querySelector("#container"),
	// 		document.querySelector("#container #theme-btn"),
	// 		document.querySelector("#container h1"),
	// 		document.querySelector("#container #actions"),
	// 		document.querySelector("#container #todo-input"),
	// 		document.querySelector("#container #add-btn"),
	// 		document.querySelector("#container #search-input"),
	// 		document.querySelector("#container #clear-btn"),
	// 		document.querySelector("#todo-list p"),
	// 		document.querySelector("#todo-list ul li"),
	// 		document.querySelector("#todo-list ul li span:nth-child(3)"),
	// 	];

	// 	if (mode === "Dark mode") {
	// 		this.themeBtn.innerText = "Light mode";
	// 		this.saveThemeState(mode);

	// 		for (const element of themeSensitiveElements) {
	// 			if (element !== null) {
	// 				element.classList.add("dark-mode");
	// 			}
	// 		}
	// 	} else {
	// 		this.themeBtn.innerText = "Dark mode";
	// 		this.saveThemeState(mode);

	// 		for (const element of themeSensitiveElements) {
	// 			if (element !== null) {
	// 				element.classList.remove("dark-mode");
	// 			}
	// 		}
	// 	}
	// }

	// saveThemeState(mode) {
	// 	this.storage.setItem("theme", mode);
	// }

	// loadThemeState() {
	// 	this.themeChanger(this.storage.getItem("theme"));
	// }
}

new Theme("theme-btn");

// Heart beat section
setInterval(() => {
	mb.classList.add("bg-rose-500");
	setTimeout(() => {
		mb.classList.remove("bg-rose-500");
	}, 150);
}, 2000);
