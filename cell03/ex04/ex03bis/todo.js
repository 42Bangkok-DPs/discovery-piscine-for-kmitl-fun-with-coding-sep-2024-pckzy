function saveTasks() {
    const tasks = $.map($('.task-item'), task => $(task).text());
    const expires = new Date(Date.now() + 86400000).toUTCString();
    document.cookie = `tasks=${encodeURIComponent(JSON.stringify(tasks))}; expires=${expires}; path=/`;
}

function loadTasks() {
    const cookie = document.cookie.split('; ').find(row => row.startsWith('tasks='));
    if (cookie) {
        const tasks = JSON.parse(decodeURIComponent(cookie.split('=')[1]));
        $.each(tasks.reverse(), function (index, task) {
            addTask(task);
        });
    }
}

function addTask(taskText) {
    const $taskElement = $('<div></div>')
        .text(taskText)
        .addClass('task-item')
        .on('click', function () {
            if (confirm("Do you want to remove this task?")) {
                $(this).remove();
                saveTasks();
            }
        });

    $('#ft_list').prepend($taskElement);
}

$('#btn').on('click', function () {
    const newtodo = prompt("Enter your task!");
    if (newtodo && newtodo.trim() !== "") {
        addTask(newtodo);
        saveTasks();
    }
});

$(window).on('load', loadTasks);
