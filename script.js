// Current time – header
let time = document.querySelector(".time");

setInterval(() => {
  let date = new Date();
  time.innerHTML = date.toLocaleTimeString();
}, 1000);

// Greeting based on time – header
const greetingElement = document.getElementById("greeting");
const hours = new Date().getHours();

if (hours >= 0 && hours < 12) {
  greetingElement.textContent = "Good Morning!";
} else if (hours >= 12 && hours < 18) {
  greetingElement.textContent = "Good Afternoon!";
} else {
  greetingElement.textContent = "Good Night!";
}

document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const taskInput = document.querySelector("#task-input");
  const addTaskBtn = document.querySelector("#add-task-btn");
  const taskList = document.querySelector(".task-list");
  const taskContainer = document.querySelector(".tasks");
  const currentDate = document.querySelector("#current-date");

  // Function to get the current date
  function getCurrentDate() {
    const today = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    return today.toLocaleDateString("en-EN", options);
  }

  // Display the current date in the task list header
  const dateElement = document.getElementById("current-date");
  const current_date = new Date().toLocaleDateString(undefined, {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  dateElement.textContent = current_date;

  // Function to add a task
  function addTask(taskName) {
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <label class="custom-checkbox">
        <input type="checkbox" />
        <span class="checkmark"></span>
      </label>
      <span class="task-name" contenteditable="true">${taskName}</span>
      <button class="delete-btn">
        <img src="icons/delete.png" alt="Delete" />
      </button>
    `;

    taskContainer.appendChild(taskItem);

    // Show task list and current date if this is the first task added
    if (taskContainer.children.length === 1) {
      taskList.style.display = "block";
      currentDate.textContent = getCurrentDate(); // Set current date
    }

    addTaskListeners(taskItem);

    // Reset input
    taskInput.value = "";
  }

  // Event listener for the Add button
  addTaskBtn.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (taskName) {
      addTask(taskName);
    }
  });

  // Add listeners to handle task actions
  function addTaskListeners(taskItem) {
    const checkbox = taskItem.querySelector("input[type='checkbox']");
    const taskName = taskItem.querySelector(".task-name");
    const deleteBtn = taskItem.querySelector(".delete-btn");

    // Toggle strike-through on task name when checkbox is clicked
    checkbox.addEventListener("change", () => {
      taskName.classList.toggle("completed");
    });

    // Delete task when delete button is clicked
    deleteBtn.addEventListener("click", () => {
      taskItem.remove();

      // Hide task list if no more tasks are present
      if (taskContainer.children.length === 0) {
        taskList.style.display = "none";
      }
    });

    // End edit when Enter is pressed
    taskName.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();  // Prevent line break
        taskName.blur();      // Remove focus to save changes
      }
    });

    // Save changes when the task name loses focus
    taskName.addEventListener("blur", () => {
      console.log(`Task updated: ${taskName.textContent}`);
    });
  }
});
