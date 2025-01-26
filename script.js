document.addEventListener('DOMContentLoaded', () => {
    const saveBtn = document.getElementById('saveBtn');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');

    saveBtn.addEventListener('click', addTask);

    function addTask() {
        const title = titleInput.value.trim();
        const description = descriptionInput.value.trim();

        if (title === '' || description === '') {
            alert('Please fill out all fields.');
            return;
        }

        const dateAdded = new Date().toLocaleString();
        const taskItem = createTaskItem(title, description, dateAdded, '');

        pendingList.appendChild(taskItem);

        titleInput.value = '';
        descriptionInput.value = '';
    }

    function createTaskItem(title, description, dateAdded, dateCompleted) {
        const li = document.createElement('li');
        li.className = 'task-item';

        const taskInfo = document.createElement('div');
        taskInfo.className = 'task-info';
        taskInfo.innerHTML = `
            <strong>${title}</strong>
            <p>${description}</p>
            <div class="timestamp">
                <small>Added: ${dateAdded}</small>
                ${dateCompleted ? `<small>Completed: ${dateCompleted}</small>` : ''}
            </div>
        `;
        li.appendChild(taskInfo);

        const buttons = document.createElement('div');
        buttons.className = 'buttons';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit';
        editBtn.addEventListener('click', () => editTask(li, title, description, dateAdded, dateCompleted));

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.className = 'complete';
        completeBtn.addEventListener('click', () => completeTask(li));

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete';
        deleteBtn.addEventListener('click', () => deleteTask(li));

        buttons.appendChild(editBtn);
        buttons.appendChild(completeBtn);
        buttons.appendChild(deleteBtn);

        li.appendChild(buttons);

        return li;
    }

    function editTask(taskItem, oldTitle, oldDescription, dateAdded, dateCompleted) {
        const newTitle = prompt('Edit Title', oldTitle);
        const newDescription = prompt('Edit Description', oldDescription);

        if (newTitle !== null && newDescription !== null) {
            taskItem.querySelector('.task-info').innerHTML = `
                <strong>${newTitle}</strong>
                <p>${newDescription}</p>
                <div class="timestamp">
                    <small>Added: ${dateAdded}</small>
                    ${dateCompleted ? `<small>Completed: ${dateCompleted}</small>` : ''}
                </div>
            `;
        }
    }

    function completeTask(taskItem) {
        const dateCompleted = new Date().toLocaleString();
        taskItem.querySelector('.timestamp').innerHTML += `<br><small>Completed: ${dateCompleted}</small>`;
        taskItem.querySelector('.complete').remove();
        completedList.appendChild(taskItem);
    }

    function deleteTask(taskItem) {
        taskItem.remove();
    }
});
