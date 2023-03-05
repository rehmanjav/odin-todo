import './style.css';

class Todo {
    constructor(title, description, dueDate, priority, dateCreated) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.dateCreated = dateCreated;
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
    }
}

let projects = [new Project("Gym", new Date()), new Project("Study", new Date()), new Project("Work", new Date()), new Project("Diet", new Date())];
let notes = [];

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

    // Add listeners to Nav bar
    let navNotes = document.querySelector(".nav-notes");
    navNotes.addEventListener("click", () => {
        renderNotes("recentFirst");
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
        console.log("clicked");

        let title = document.querySelector(".aTTitle");
        let details = document.querySelector(".aTDetails");
        let project = document.querySelector(".aTProject");
        let dueDate = document.querySelector(".aTDueDate");
        let priority = document.querySelector(".aTPriority");

        // document.querySelector("input[name="rate"]:checked").value;



        // let btnSubmit = document.querySelector(".btn-submit");

        //     btnSubmit.addEventListener('click', () => {
        //     let inputDate = document.querySelector(".aTDueDate");
        //     let p = document.querySelector(".para");
        //     let p2 = document.querySelector(".para2");
            
        //     p.textContent = inputDate.value.replaceAll("-", "/");
        //     let dueDate = new Date(inputDate.value.replaceAll("-", "/"));
        //     p2.textContent = dueDate.toDateString();
});

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

        console.log(`title:${title.value}, details:${details.value}`);
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

// MAIN LOOP



renderIndex();