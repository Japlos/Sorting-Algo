let tasks = [];
let recentAdds = [];
let recentRemoves = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();
    if (task) {
        tasks.push(task);
        recentAdds.push(task);
        taskInput.value = "";
        displayList("lines");
        updateRecentChanges();
    }
}

function displayList(mode) {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    if (tasks.length === 0) {
        taskList.innerHTML = "<p>No tasks added yet.</p>";
        return;
    }
    const ul = document.createElement("ul");
    ul.className = mode === "columns" ? "columns" : "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = `${index + 1}. ${task}`;
        ul.appendChild(li);
    });
    taskList.appendChild(ul);
}

function removeTask() {
    const removeIndex = document.getElementById("removeIndex").value;
    const index = parseInt(removeIndex) - 1;

    if (isNaN(index) || index < 0 || index >= tasks.length) {
        alert("Invalid index. Please enter a valid index number.");
        return;
    }

    const removedTask = tasks.splice(index, 1)[0];
    recentRemoves.push(removedTask);
    displayList("lines");
    updateRecentChanges();
}

function searchTasks() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const searchResults = document.getElementById("searchResults");
    searchResults.innerHTML = "";
    const matchingTasks = tasks.filter((task) =>
        task.toLowerCase().includes(searchTerm)
    );
    if (matchingTasks.length > 0) {
                const ul = document.createElement("ul");
        matchingTasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task;
            ul.appendChild(li);
        });
        searchResults.appendChild(ul);
    } else {
        searchResults.innerHTML = "<p>No matching tasks found.</p>";
    }
}

function quicksort(arr) {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return [...quicksort(left), pivot, ...quicksort(right)];
}

function arrangeList(order) {
    const arrangedList = document.getElementById("arrangedList");
    let sortedTasks;

    if (order === 'asc') {
        sortedTasks = quicksort([...tasks]);
    } else {
        sortedTasks = quicksort([...tasks]).reverse();
    }

    arrangedList.innerHTML = "";
    const ul = document.createElement("ul");
    sortedTasks.forEach((task) => {
        const li = document.createElement("li");
        li.textContent = task;
        ul.appendChild(li);
    });
    arrangedList.appendChild(ul);
}

function updateRecentChanges() {
    const recentChangesDiv = document.getElementById("recentChanges");
    recentChangesDiv.innerHTML = `
        <h3>Recent Adds</h3>
        <ul>${recentAdds.map((task) => `<li>${task}</li>`).join("")}</ul>
        <h3>Recent Removes</h3>
        <ul>${recentRemoves.map((task) => `<li>${task}</li>`).join("")}</ul>
    `;
}

function displayGroupMembers() {
    const groupMembers = [
        "Avila, Nash E.",
        "Japlos, Marvin Joseph D.",
        "Umali, Mark Ahron M.",
    ];
    const groupMembersList = document.getElementById("groupMembers");
    groupMembers.forEach((member) => {
        const li = document.createElement("li");
        li.textContent = member;
        groupMembersList.appendChild(li);
    });
}

displayList("lines");
updateRecentChanges();
displayGroupMembers();