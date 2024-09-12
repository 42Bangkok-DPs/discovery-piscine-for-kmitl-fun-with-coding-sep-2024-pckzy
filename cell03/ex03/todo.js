function saveTasks() {
    const tasks = Array.from(document.querySelectorAll('.task-item')).map(task => task.textContent);
    document.cookie = `tasks=${JSON.stringify(tasks)}; expires=${new Date(Date.now() + 86400000).toUTCString()}; path=/`;
}

function loadTasks() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('tasks='));
    if (cookie) {
        const tasks = JSON.parse(cookie.split('=')[1]);
        tasks.slice().reverse().forEach(task => addTask(task));
    }
}

function addTask(taskText) {
    const taskElement = document.createElement("div");
    taskElement.textContent = taskText;
    taskElement.className = "task-item";

    taskElement.addEventListener("click", () => {
        if (confirm("Do you want to remove this task?")) {
            taskElement.remove();
            saveTasks();
        }
    });

    document.getElementById("ft_list").prepend(taskElement);
}

document.getElementById("btn").addEventListener("click", () => {
    let newtodo = prompt("Enter your task!");
    if (newtodo != null && newtodo.trim() !== "") {
        addTask(newtodo);
        saveTasks();
    }
});

window.addEventListener('load', loadTasks);