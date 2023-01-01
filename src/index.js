import './style.css';

class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

class Project {
    constructor(name) {
        this.name = name;
    }
}

class Note {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

const projects = [new Project("Gym"), new Project("Study"), new Project("Work"), new Project("Diet")];
const notes = [];

function renderIndex() {
    let body = document.querySelector('body');
    
    body.innerHTML = `
    <header>
        <p>todo</p>
    </header>
    <nav>
        <button>Home</button>
        <br>
        <button>Today</button>
        <br>
        <button>Week</button>
        <p>Projects</p>
        <ul class="ul-projects"></ul>
        <button>Notes</button>
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

    let divProjects = document.querySelector(".ul-projects");

    for (let project of projects) {
        let li = document.createElement("li");
        li.innerHTML = `
        <button>${project.name}</button>
        `;
        divProjects.appendChild(li);
    }

    // ADD MODAL
    // Get the modal
    var modal = document.querySelector(".modal-add");

    // Get the button that opens the modal
    var btn = document.querySelector("#btn-add");

    // Get the <span> element that closes the modal
    var span = document.querySelector(".close");

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
    modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
    modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
    }

    // Add event listeners to add new XXX buttons
    let btnTodo = document.querySelector("btn-todo");
    let btnProject = document.querySelector("btn-project");
    let btnNote = document.querySelector("btn-note");

    btnTodo.addEventListener("click", () => {
        renderAddTodo();
    });
    btnProject.addEventListener("click", () => {
        renderAddProject();
    });
    btnNote.addEventListener("click", () => {
        renderAddNote();
    });
}

function renderAddTodo() {
    let rightDiv = document.querySelector(".add-right");
    rightDiv.innerHTML = "";

    let addTodo = document.createElement("div");
    addTodo.classList.add("add-right-todo");

    addTodo.innerHTML = `
    
    `;

    rightDiv.appendChild(addTodo);
}

function renderAddNote() {
    let rightDiv = document.querySelector(".add-right");
    rightDiv.innerHTML = "";

    let addNote = document.createElement("div");
    addNote.classList.add("add-right-note");

    addNote.innerHTML = `
    
    `;

    rightDiv.appendChild(addNote);
}

function renderAddProject() {
    let rightDiv = document.querySelector(".add-right");
    rightDiv.innerHTML = "";

    let addProject = document.createElement("div");
    addProject.classList.add("add-right-project");

    addProject.innerHTML = `
    
    `;

    rightDiv.appendChild(addProject);
}

// MAIN LOOP



renderIndex();