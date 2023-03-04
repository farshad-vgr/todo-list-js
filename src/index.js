const heartBtn = document.getElementById("heart-btn");
const emptyMessage = document.getElementById("empty-message");

// Heart-Beat animation button
setInterval(() => {
	heartBtn.classList.add("bg-rose-500");
	setTimeout(() => {
		heartBtn.classList.remove("bg-rose-500");
	}, 150);
}, 2000);

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
			this.todoList.append(emptyMessage);
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

		// Creating number label and todo text container
		li.innerHTML = `
    <span>${this.todos.indexOf(todo) + 1}.</span>
    <span>${todo}</span>
    `;

		// Creating deleting button
		const deletingSpan = document.createElement("span");
		deletingSpan.classList.add("option-btn");
		deletingSpan.addEventListener("click", () => {
			this.deleteTodo(todo);
		});
		deletingSpan.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 cursor-pointer">
  			<path class="cursor-pointer" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		`;
		li.append(deletingSpan);

		// Creating editing button
		const editingSpan = document.createElement("span");
		editingSpan.classList.add("option-btn");
		editingSpan.addEventListener("click", () => {
			// editing todo text codes here
		});
		editingSpan.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 cursor-pointer">
  			<path class="cursor-pointer" stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
			</svg>
		`;
		li.append(editingSpan);

		// Creating completing button
		const completingSpan = document.createElement("span");
		completingSpan.classList.add("option-btn");
		completingSpan.addEventListener("click", () => {
			this.completedTodo(todo);
		});
		completingSpan.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 cursor-pointer">
  			<path class="cursor-pointer" stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
			</svg>
		`;
		li.append(completingSpan);

		// Creating sharing button
		const sharingSpan = document.createElement("span");
		sharingSpan.classList.add("option-btn");
		sharingSpan.addEventListener("click", () => {
		});
		sharingSpan.innerHTML = `
			<a href = "mailto:?subject=Sharing my ToDo&body=${todo}" target="_blank">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 cursor-pointer">
  				<path class="cursor-pointer" d="M13 4.5a2.5 2.5 0 11.702 1.737L6.97 9.604a2.518 2.518 0 010 .792l6.733 3.367a2.5 2.5 0 11-.671 1.341l-6.733-3.367a2.5 2.5 0 110-3.475l6.733-3.366A2.52 2.52 0 0113 4.5z" />
				</svg>
			</a>
		`;
		li.append(sharingSpan);

		return li;
	}

	saveTodo() {
		this.storage.setItem("todos", JSON.stringify(this.todos));
	}

	loadTodo() {
		const storagedTodo = this.storage.getItem("todos");
		storagedTodo ? (this.todos = JSON.parse(storagedTodo)) : null;
	}

	// This method deletes selected todo item
	deleteTodo(todo) {
		if (confirm(`Are you sure you want to delete?? \n    "${todo}"`)) {
			const indexTodo = this.todos.indexOf(todo);

			let arryOfLi = Array.from(document.querySelector("#todo-list ul").children);

			arryOfLi[indexTodo].classList.add("fall"); // Delete item with animation

			setTimeout(() => {
				this.todos.splice(indexTodo, 1);
				this.saveTodo();
				this.renderUl();
			}, 500);
		}
	}

	// This method changes the styles of the disabled todo item
	completedTodo(todo) {
		const indexTodo = this.todos.indexOf(todo);
		const arryOfLi = Array.from(document.querySelector("#todo-list ul").children);
		const targetLi = arryOfLi[indexTodo];
		const undoBtn = targetLi.lastElementChild.previousElementSibling;

		targetLi.classList.toggle("line-through"); // Drawing a horizontal line through the text
		setTimeout(() => {
			targetLi.classList.toggle("no-hover"); // Disabling hovering on completed item
			[...targetLi.children].map((element) => element.classList.toggle("disabled")); // Disabling option buttons
			undoBtn.classList.toggle("enabled"); // Enabling just undo button

			// Changing undo button icon
			if (targetLi.classList.contains("no-hover")) {
				undoBtn.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 cursor-pointer">
  				<path class="cursor-pointer" stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
				</svg>
			`;
			} else {
				undoBtn.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-6 h-6 cursor-pointer">
  				<path class="cursor-pointer" stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>
			`;
			}
		}, 500);
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
