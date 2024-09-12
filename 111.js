window.onload = () => {
    renderTasks();
};


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const addTask = () => {
    const taskInput = document.querySelector('#input-field').value.trim();
    if (!taskInput) {
        alert("אנא הכנס משימה");
        return;
    }

    const id = Math.random().toString(36).substr(2, 9);

    const task = {
        id: id,
        task: taskInput,
        done: false
    };
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    document.querySelector('#input-field').value = '';
    renderTasks();
}

const addTaskBtn = document.querySelector('#add-task');
addTaskBtn.addEventListener('click', addTask);

const renderTasks = (taskList = tasks) => {
    const taskTableBody = document.querySelector('table #task-list');

    taskTableBody.textContent = '';

    taskList.forEach((task, index) => {
        const tr = document.createElement('tr');
        tr.classList.add('fade-in');

        const idTd = document.createElement('td');
        idTd.textContent = `${task.id.substr(0, 3)}...`;

        const taskTd = document.createElement('td');
        taskTd.textContent = task.task;

        const checkboxTd = document.createElement('td');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.onchange = () => toggleComplete(index);
        checkboxTd.appendChild(checkbox);
        if(task.done) {
            tr.classList.add('done');
        }
        const actionsCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.id = 'edit-btn';
        editButton.className = 'btn';
        editButton.textContent = 'ערוך';
        editButton.onclick = () => editTask(index);



        const deleteButton = document.createElement('button');
        deleteButton.id = 'delete-btn';
        deleteButton.className = 'btn';
        deleteButton.textContent = 'מחק';
        deleteButton.onclick = () => deleteTask(index);

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);

        tr.appendChild(idTd);
        tr.appendChild(taskTd);
        tr.appendChild(checkboxTd);
        tr.appendChild(actionsCell);

        taskTableBody.appendChild(tr);
    });
};

const deleteTask = (index) => {
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
};


const toggleComplete = (index) => {
    tasks[index].done = !tasks[index].done;
    localStorage.setItem('tasks', JSON.stringify(tasks));

    renderTasks();
}


// const editTask = (index) => {
//     const task = tasks[index];
//     const newTask = prompt('ערוך המשימה', task.task);
//     if (newTask !== null) {
//         task.task = newTask;
//         localStorage.setItem('tasks', JSON.stringify(tasks));
//         renderTasks();
//     }
// };


const filterDone = document.querySelector('#done-tasks');
const filterUnDone = document.querySelector('#undone-tasks');
const sort_hole = document.querySelector('#sort-hole');
const sort_yored = document.querySelector('#sort-yored');
const search_input = document.querySelector('#search-input');

 filterDone.addEventListener('click', () => {
    const filteredTasks = tasks.filter(task => task.done);
    renderTasks(filteredTasks);
});

filterUnDone.addEventListener('click', () => {
    const filteredTasks = tasks.filter(task => !task.done);
    renderTasks(filteredTasks);
});


sort_hole.addEventListener('click', () => {
    tasks.sort((a, b) => a.task.localeCompare(b.task));
    renderTasks();
});

sort_yored.addEventListener('click', () => {
    tasks.sort((a, b) => b.task.localeCompare(a.task));
    renderTasks();
});


search_input.addEventListener('input', () => {
    const searchTerm = search_input.value.toLowerCase();
    const filteredTasks = tasks.filter(task => task.task.toLowerCase().includes(searchTerm));
    renderTasks(filteredTasks);
});


window.onload = () => {
    renderTasks();
};

// let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Your existing functions here

const editTask = (index) => {
    const task = tasks[index];
    const modal = document.getElementById('editModal');
    const overlay = document.getElementById('modalOverlay');
    const editInput = document.getElementById('editInput');
    const saveBtn = document.getElementById('saveEditBtn');
    const cancelBtn = document.getElementById('cancelEditBtn');

    editInput.value = task.task;
    modal.style.display = 'block';
    overlay.style.display = 'block';

    saveBtn.onclick = () => {
        const newTask = editInput.value.trim();
        if (newTask) {
            task.task = newTask;
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
            closeModal();
        }
    };

    cancelBtn.onclick = closeModal;
};

const closeModal = () => {
    const modal = document.getElementById('editModal');
    const overlay = document.getElementById('modalOverlay');
    modal.style.display = 'none';
    overlay.style.display = 'none';
};

// Update the renderTasks function to use the new editTask function
// const renderTasks = (taskList = tasks) => {
//     const taskTableBody = document.querySelector('table #task-list');

//     taskTableBody.textContent = '';

//     taskList.forEach((task, index) => {
//         // ... (existing code)

//         const editButton = document.createElement('button');
//         editButton.id = 'edit-btn';
//         editButton.className = 'btn';
//         editButton.textContent = 'ערוך';
//         editButton.onclick = () => editTask(index);

//         // ... (rest of the existing code)
//     });
// };

