import './style.css';

const projects = [];
const notes = [];

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
        <ul>
            <li><button>Gym</button></li>
            <li><button>Study</button></li>
            <li><button>Work</button></li>
        </ul>
        <button>Notes</button>
        <button id="btn-add"></button>
    </nav>
    <main>

    </main>

    <!-- Add modal -->
    <div class="modal-add">
        <div class="modal-add-content">
            <span class="close">&times;</span>
            <p>hello</p>
            <button class="close"></button>
        </div>
    </div>
    `;

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
}

// MAIN LOOP



renderIndex();