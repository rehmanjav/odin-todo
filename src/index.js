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

    renderAddTodo();

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
}

function renderAddTodo() {
    let rightDiv = document.querySelector(".add-right");
    rightDiv.innerHTML = "";

    let addTodo = document.createElement("div");
    // addTodo.classList.add("add-right-todo");

    addTodo.innerHTML = `
    <div class="add-right-todo">
  <form action="" onsubmit="return false">
    <label for="">Title: <input type="text" required></label>
    <label for="">Details: <input type="text"></label>
    <label for="">Project: <select name="" id=""></select></label>
    <label for="">Due date: <input type="date"></label>
    <label for="">Priority: 
      <label for=""><input type="radio" name="priority" value="high"> High </label>
      <label for=""><input type="radio" name="priority" value="medium"> Medium </label>
      <label for=""><input type="radio" name="priority" value="low"> Low </label>
      </label>
      <input type="submit" value="+ Todo" class="btn-add-todo">
  </form>
</div>
    `;

    rightDiv.appendChild(addTodo);

    let btnAddTodo = document.querySelector(".btn-add-todo");
    btnAddTodo.addEventListener("submit", () => {
        console.log("clicked");
    });
}

function renderAddNote() {
    let rightDiv = document.querySelector(".add-right");
    rightDiv.innerHTML = "";

    let addNote = document.createElement("div");
    // addNote.classList.add("add-right-note");

    addNote.innerHTML = `
    <div class="add-right-note">
  <form action="" onsubmit="return false">
    <label for="">Title: <input type="text" required></label>
    <label for="">Details: <input type="text"></label>
    <input type="submit" value="+ Note" class="btn-add-note">
  </form>
</div>
    `;

    rightDiv.appendChild(addNote);

    let btnAddNote = document.querySelector(".btn-add-note");
    btnAddNote.addEventListener("submit", () => {
        console.log("clicked");
    });
}

function renderAddProject() {
    let rightDiv = document.querySelector(".add-right");
    rightDiv.innerHTML = "";

    let addProject = document.createElement("div");
    // addProject.classList.add("add-right-project");

    addProject.innerHTML = `
    <div class="add-right-project">
  <form action="" onsubmit="return false">
    <label for="">Title: <input type="text" required></label>
    <input type="submit" value="+ Project" class="btn-add-project">
  </form>
</div>
    `;

    rightDiv.appendChild(addProject);

    let btnAddProject = document.querySelector(".btn-add-project");
    btnAddProject.addEventListener("submit", () => {
        console.log("clicked");
    });

    
}

// MAIN LOOP



renderIndex();