document.addEventListener("DOMContentLoaded", () => {
    const ourTodoForm = document.querySelector(".todo-form");
    const ourTodoList = document.querySelector(".todo-list");
    const userNameInput = document.getElementById("user-name");
    const userSubmitButton = document.querySelector(".user-submit-button");
    const userGreeting = document.createElement("p");
    const deleteAllButton = document.querySelector(".delete-all-button");

    function createNewTaskItem(newItemText) {
        const ourTaskItem = document.createElement("div");
        ourTaskItem.className = "todo-item";
        ourTaskItem.setAttribute("data-id", Date.now());

        const checkBox = document.createElement("input");
        checkBox.className = "input-box";
        checkBox.type = "checkbox";
        ourTaskItem.appendChild(checkBox);

        const labelText = document.createElement("label");
        labelText.innerText = newItemText;
        ourTaskItem.appendChild(labelText);

        const editButton = document.createElement("button");
        editButton.className = "edit-button";
        editButton.innerHTML = "Edit";
        ourTaskItem.appendChild(editButton);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "X";
        ourTaskItem.appendChild(deleteButton);

        return ourTaskItem;
    }

    ourTodoForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const newTasktext = document.getElementById("new-task");
        console.log("New input text is : ", newTasktext.value);

        if (newTasktext.value.trim() !== "") {
            if (newTasktext.dataset.editId) {
                // Update existing task
                const taskItem = document.querySelector(`[data-id="${newTasktext.dataset.editId}"]`);
                const taskLabel = taskItem.querySelector("label");
                taskLabel.innerText = newTasktext.value;
                newTasktext.dataset.editId = ""; // Clear edit ID
            } else {
                // Add new task
                const newlyCreatedItem = createNewTaskItem(newTasktext.value);
                ourTodoList.appendChild(newlyCreatedItem);
            }

            newTasktext.value = "";
        }
    });

    ourTodoList.addEventListener("click", (event) => {
        if (event.target.matches(".delete-button")) {
            const ourItem = event.target.parentElement;
            if (confirm("Do you want to delete it?")) {
                ourTodoList.removeChild(ourItem);
            }
        } else if (event.target.matches(".edit-button")) {
            const taskItem = event.target.closest(".todo-item");
            const taskLabel = taskItem.querySelector("label");
            const taskText = taskLabel.innerText;

            const inputBox = document.getElementById("new-task");
            inputBox.value = taskText;
            inputBox.dataset.editId = taskItem.getAttribute("data-id");
        }
    });

    userSubmitButton.addEventListener("click", () => {
        const userName = userNameInput.value;
        if (userName.trim() !== "") {
            userGreeting.textContent = `Hello, ${userName}! Welcome to Taskinator.`;
            document.querySelector(".user-greeting").appendChild(userGreeting);
            userNameInput.value = "";
        }
    });

    deleteAllButton.addEventListener("click", () => {
        if (confirm("Do you want to delete all tasks?")) {
            while (ourTodoList.firstChild) {
                ourTodoList.removeChild(ourTodoList.firstChild);
            }
        }
    });
});



  