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

function renderIndex() {
    let body = document.querySelector('body');
    
    body.innerHTML = `
    
    `;
}