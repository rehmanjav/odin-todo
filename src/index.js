import './style.css';

class Todo {
    constructor(title, details, project, dueDate, priority, dateCreated) {
        this.title = title;
        this.details = details;
        this.dueDate = dueDate;
        this.priority = priority;
        this.dateCreated = dateCreated;
        this.project = project;
        this.uuid = crypto.randomUUID();
        this.complete = false;
    }
}

class Project {
    constructor(name, dateCreated) {
        this.name = name;
        this.dateCreated = dateCreated;
    }
}

class Note {
    constructor(title, description, dateCreated) {
        this.title = title;
        this.description = description;
        this.dateCreated = dateCreated;
        this.uuid = crypto.randomUUID();
    }
}

let projects = [new Project("Gym", new Date()), new Project("Study", new Date()), new Project("Work", new Date()), new Project("Diet", new Date())];
let notes = [];
let todos = [];

function renderIndex() {
    let body = document.querySelector('body');

    body.innerHTML = `
    <header>
        <p>todo</p>
    </header>
    <nav>
        <button class="nav-home">Home</button>
        <br>
        <button>Today</button>
        <br>
        <button>Week</button>
        <p>Projects</p>
        <ul class="ul-projects"></ul>
        <button class="nav-notes">Notes</button>
        <button id="btn-add"></button>
    </nav>
    <main>

    </main>

    <!-- Add modal -->
    <div class="modal-add">
        <div class="modal-add-content">
            <span class="close">&times;</span>
            <p>ADD NEW</p>
            <div class="add-container">
                <div class="add-left">
                    <button class="btn-todo">TODO</button>
                    <button class="btn-note">NOTE</button>
                    <button class="btn-project">PROJECT</button>
                </div>
                <div class="add-right">

                </div>
            </div>
            
        </div>
    </div>
    `;

    renderAddTodo();

    renderNavProjects();

    // ADD MODAL
    // Get the modal
    var modal = document.querySelector(".modal-add");

    // Get the button that opens the modal
    var btn = document.querySelector("#btn-add");

    // Get the <span> element that closes the modal
    var span = document.querySelector(".close");

    // When the user clicks the button, open the modal 
    btn.onclick = function () {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Add event listeners to add new XXX buttons
    let btnTodo = document.querySelector(".btn-todo");
    let btnProject = document.querySelector(".btn-project");
    let btnNote = document.querySelector(".btn-note");

    btnTodo.addEventListener("click", () => {
        console.log("clicked");
        renderAddTodo();
    });
    btnProject.addEventListener("click", () => {
        console.log("clicked");
        renderAddProject();
    });
    btnNote.addEventListener("click", () => {
        console.log("clicked");
        renderAddNote();
    });

    // Add listeners to Nav bar
    let navNotes = document.querySelector(".nav-notes");
    navNotes.addEventListener("click", () => {
        renderNotes("recentFirst");
    });

    let navHome = document.querySelector(".nav-home");
    navHome.addEventListener('click', () => {
        console.log("clicked home");
        renderHome("recentFirst");
    });
}

function renderNavProjects() {
    let divProjects = document.querySelector(".ul-projects");

    divProjects.innerHTML = "";

    for (let project of projects) {
        let li = document.createElement("li");
        li.innerHTML = `
        <button>${project.name}</button>
        `;
        divProjects.appendChild(li);
    }
};

function renderAddTodo() {
    let rightDiv = document.querySelector(".add-right");
    rightDiv.innerHTML = "";

    let addTodo = document.createElement("div");
    // addTodo.classList.add("add-right-todo");

    addTodo.innerHTML = `
    <div class="add-right-todo">
  <form action="" onsubmit="return false" class="form-todo">
    <label for="" class="font-size-large">Title: <input type="text" required class="black font-size-large aTTitle"></label>
    <label for="" class="font-size-large">Details: <input type="text" class="black font-size-large aTDetails"></label>
    <label for="" class="font-size-large">Project: <select name="" id="" class="black font-size-large aTProject">
    ${generateProjectSelection()}</select></label>
    <label for="" class="font-size-large">Due date: <input type="date" required class="black font-size-large aTDueDate"></label>
    <label for="" class="font-size-large">Priority: 
      <label for=""><input type="radio" name="priority" value="high" required> High </label>
      <label for=""><input type="radio" name="priority" value="medium" checked="checked"> Medium </label>
      <label for=""><input type="radio" name="priority" value="low"> Low </label>
    </label>
      <input type="submit" value="+ Todo" class="btn-add-todo">
  </form>
</div>
    `;

    rightDiv.appendChild(addTodo);

    let btnAddTodo = document.querySelector(".form-todo");
    btnAddTodo.addEventListener("submit", () => {

        let title = document.querySelector(".aTTitle").value;
        let details = document.querySelector(".aTDetails").value;
        let project = document.querySelector(".aTProject").value;
        let inputDate = document.querySelector(".aTDueDate");
        let dueDate = new Date(inputDate.value.replaceAll("-", "/"));
        let priority = document.querySelector('input[name="priority"]:checked').value;

        console.log({ title: title, details: details, project: project, dueDate: dueDate.toDateString(), priority: priority });

        todos.push(new Todo(title, details, project, dueDate, priority, new Date()));

        renderAddTodo();
        renderHome("recentFirst");


    });
}

function renderAddNote() {
    let rightDiv = document.querySelector(".add-right");
    rightDiv.innerHTML = "";

    let addNote = document.createElement("div");
    // addNote.classList.add("add-right-note");

    addNote.innerHTML = `
    <div class="add-right-note">
  <form action="" onsubmit="return false" class="form-note">
    <label for="" class="font-size-large">Title: <input type="text" required class="black font-size-large aNTitle" minlength="3"></label>
    <label for="" class="font-size-large">Details: <input type="text" class="black font-size-large aNDetails" required minlength="3"></label>
    <input type="submit" value="+ Note" class="btn-add-note">
  </form>
</div>
    `;

    rightDiv.appendChild(addNote);

    let btnAddNote = document.querySelector(".form-note");
    btnAddNote.addEventListener("submit", () => {
        console.log("clicked");

        let title = document.querySelector(".aNTitle");
        let details = document.querySelector(".aNDetails");


        notes.push(new Note(title.value, details.value, new Date()));

        renderNotes("recentFirst");
        renderAddNote();
    });
}

function renderAddProject() {
    let rightDiv = document.querySelector(".add-right");
    rightDiv.innerHTML = "";

    let addProject = document.createElement("div");
    // addProject.classList.add("add-right-project");

    addProject.innerHTML = `
    <div class="add-right-project">
  <form action="" onsubmit="return false" class="form-project">
    <label for="" class="font-size-large">Title: <input type="text" required class="black font-size-large aPTitle"></label>
    <input type="submit" value="+ Project" class="btn-add-project">
  </form>
</div>
    `;

    rightDiv.appendChild(addProject);

    let btnAddProject = document.querySelector(".form-project");
    btnAddProject.addEventListener("submit", () => {
        console.log("clicked");

        let title = document.querySelector(".aPTitle");

        projects.push(new Project(title.value, new Date()));
        renderNavProjects();
        renderAddProject();
    });


}

function renderNotes(order) {
    let mainDiv = document.querySelector("main");
    mainDiv.innerHTML = `
    <div class="notes-btns"></div>
    <div class="notes-container"></div>

    `;

    let notesContainer = document.querySelector(".notes-container");

    if (order == "recentFirst") {
        for (let [index, note] of notes.entries()) {
            console.log(`${index} ${note}`)
            notesContainer.prepend(generateNotesCard(note, index));
        }
    } else if (order == "oldestFirst") {
        for (let [index, note] of notes.entries()) {
            notesContainer.append(generateNotesCard(note, index));
        }
    }

    let btnDelete = document.querySelectorAll(".btn-delete-note");
    btnDelete.forEach(btn => {
        btn.addEventListener('click', (e) => {
            console.log(e.target.dataset.index);
            notes.splice(e.target.dataset.index, 1);
            renderNotes("recentFirst");
        });
    });
}

function renderHome(order) {
    let mainDiv = document.querySelector("main");
    mainDiv.innerHTML = `
    <div class="home-btns"></div>
    <div class="home-container"></div>
    `;

    let homeContainer = document.querySelector(".home-container");

    if (order == "recentFirst") {
        todos.sort(sortDateRecentFirst);

        for (let todo of todos) {
            homeContainer.appendChild(generateTodoCard(todo));
        }
    } else if (order == "farFirst") {
        todos.sort(sortDateFarFirst);

        for (let todo of todos) {
            homeContainer.appendChild(generateTodoCard(todo));
        }
    }

    let btnsDeleteTodo = document.querySelectorAll(".btn-delete-todo");
    btnsDeleteTodo.forEach(todo => {
        todo.addEventListener('click', (e) => {
            let index = todos.findIndex((todo) => {
                if (todo.uuid == e.target.dataset.uuid) {
                    return true
                }
                return false;
            });
            todos.splice(index, 1);
            renderHome("recentFirst");
        });
    });


}

function generateProjectSelection() {
    let generatedHTML = ``;
    for (let project of projects) {
        generatedHTML += `<option value="${project.name}">${project.name}</option>`;
    }

    return generatedHTML;
}

function generateNotesCard(note, index) {
    let noteCard = document.createElement("div");

    noteCard.innerHTML = `
    <button class="btn-delete-note" data-index="${index}">X</button>
    <p>${note.title}</p>
    <p>${note.description}</p>
    `;

    noteCard.classList.add("notes-card");
    noteCard.dataset.index = index;

    return noteCard;
}

function sortDateRecentFirst(a, b) {
    if (a.dueDate < b.dueDate) { return -1; };
    if (a.dueDate > b.dueDate) { return 1; };
    return 0;
};

function sortDateFarFirst(a, b) {
    if (a.dueDate > b.dueDate) { return -1; };
    if (a.dueDate < b.dueDate) { return 1; };
    return 0;
};

function generateTodoCard(todo) {
    let todoCard = document.createElement("div");

    todoCard.innerHTML = `
    <input type="checkbox" data-uuid="${todo.uuid}">
    <p>${todo.title}</p>
    <button data-uuid="${todo.uuid}">Details</button>
    <p>${todo.dueDate.toDateString()}</p>
    <button data-uuid="${todo.uuid}">edit</button>
    <button class="btn-delete-todo" data-uuid="${todo.uuid}">Trash</button>
    `;

    todoCard.classList.add("todo-card");
    todoCard.dataset.uuid = todo.uuid;

    return todoCard;
}

// MAIN LOOP



renderIndex();