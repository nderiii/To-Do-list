
// Add Task
function addTask() {
    const task = document.getElementById('task').value.trim();
    const date = document.getElementById('date').value;

    if (!task || !date) {
        alert('All fields are required');
        return;
    }

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ task, date, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));

    window.location.href = 'index.html';
}

// Displaying Tasks
function displayTasks() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    taskList.innerHTML = '';

    tasks.forEach((item, index) => {
        const li = document.createElement('li');

        const leftSide = document.createElement('div');
        leftSide.innerHTML = `
            <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span class="${item.completed ? 'completed' : ''}">${item.task} (due: ${item.date})</span>
        `;

        const delBtn = document.createElement('button');
        delBtn.textContent = '✖';
        delBtn.classList.add('delete-btn');
        delBtn.onclick = () => deleteTask(index);

        li.appendChild(leftSide);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

// Toggling Tasks
function toggleTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks[index].completed = !tasks[index].completed;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Delete Tasks
function deleteTask(index) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}