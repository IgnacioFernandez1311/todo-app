
const date = document.querySelector('#date');
const taskList = document.querySelector('.task-list');
const input = document.querySelector('#input');
const buttonEnter = document.querySelector('#enter');
const check = 'fa-check-circle';
const unchecked = 'fa-circle';
const lineThrough = 'line-through';
let id;
let LIST;
const DATE = new Date();

date.innerHTML = DATE.toLocaleDateString('en-US', {
    weekday: 'long',
    month:'short', 
    day: 'numeric'
});


function addTask(task, id, done = false, deleted = false) {

    if(deleted) {
        return;
    }

    const DONE = done ? check : unchecked;
    const LINE = done ? lineThrough : '';

    const element = `<li id="element">
                        <i class="far ${DONE} co" data="done" id="${id}"></i>
                        <p class="text ${LINE}">${task}</p>
                        <i class="fas fa-trash de" data="deleted" id="${id}"></i>
                    </li>`;
    taskList.insertAdjacentHTML('beforeend', element);
} 

function taskDone(element) {
    element.classList.toggle(check);
    element.classList.toggle(unchecked);
    element.parentNode.querySelector('.text').classList.toggle(lineThrough);
    LIST[element.id].done = LIST[element.id].done ? false : true;
    console.log(LIST);
}

function taskDeleted(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].deleted = LIST[element.id].deleted ? false : true;
    console.log(LIST);
}


buttonEnter.addEventListener('click', () => {
    const task = input.value;
    if (task) {
        addTask(task, id);
        LIST.push({
            name: task,
            id: id,
            done: false,
            deleted: false
        });
        console.log(LIST);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
    input.value = '';
    id++;
});

document.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        const task = input.value;
        if (task) {
            addTask(task, id);
            LIST.push({
                name: task,
                id: id,
                done: false,
                deleted: false
            });
            console.log(LIST);
        }
        localStorage.setItem('TODO', JSON.stringify(LIST));
        input.value = '';
        id++;
    }
});

taskList.addEventListener('click', (event) => {
    const element = event.target;
    const elementData = element.attributes.data.value;
    if(elementData === 'done') {
        taskDone(element);
    } else if(elementData === 'deleted') {
        taskDeleted(element);
    }
    localStorage.setItem('TODO', JSON.stringify(LIST));
});

let data = localStorage.getItem('TODO');
if(data) {
    LIST = JSON.parse(data);
    id = LIST.lenght;
    loadList(LIST);
} else {
    LIST = [];
    id = 0;
}

function loadList(data) {
    data.forEach((element) => {
        addTask(element.name, element.id, element.done, element.deleted);
    });
}



