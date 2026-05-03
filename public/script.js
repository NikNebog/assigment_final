const API_URL = "/api/assignments";

const form = document.getElementById("assignmentForm");
const assignmentId = document.getElementById("assignmentId");
const title = document.getElementById("title");
const course = document.getElementById("course");
const description = document.getElementById("description");
const deadline = document.getElementById("deadline");
const status = document.getElementById("status");
const assignmentsList = document.getElementById("assignmentsList");
const message = document.getElementById("message");

async function loadAssignments() {
  try {
    const response = await fetch(API_URL);
    const assignments = await response.json();

    assignmentsList.innerHTML = "";

    assignments.forEach((assignment) => {
      const card = document.createElement("div");
      card.className = "assignment-card";
      card.setAttribute("data-cy", "assignment-card");

      const deadlineValue = assignment.deadline
        ? String(assignment.deadline).split("T")[0]
        : "";

      card.innerHTML = `
        <h3>${assignment.title}</h3>
        <p><strong>Course:</strong> ${assignment.course}</p>
        <p><strong>Description:</strong> ${assignment.description}</p>
        <p><strong>Deadline:</strong> ${deadlineValue}</p>
        <p><strong>Status:</strong> ${assignment.status}</p>
        <button class="edit-btn" data-cy="edit-btn">Edit</button>
        <button class="delete-btn" data-cy="delete-btn">Delete</button>
      `;

      card.querySelector('[data-cy="edit-btn"]').addEventListener("click", () => {
        assignmentId.value = assignment.id;
        title.value = assignment.title;
        course.value = assignment.course;
        description.value = assignment.description;
        deadline.value = deadlineValue;
        status.value = assignment.status;
      });

      card.querySelector('[data-cy="delete-btn"]').addEventListener("click", async () => {
        await fetch(`${API_URL}/${assignment.id}`, {
          method: "DELETE"
        });

        message.textContent = "Assignment deleted";
        loadAssignments();
      });

      assignmentsList.appendChild(card);
    });
  } catch (error) {
    assignmentsList.innerHTML = "<p>Database is not connected or server error occurred.</p>";
  }
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = {
    title: title.value,
    course: course.value,
    description: description.value,
    deadline: deadline.value,
    status: status.value
  };

  const id = assignmentId.value;

  const response = await fetch(id ? `${API_URL}/${id}` : API_URL, {
    method: id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    message.textContent = id ? "Assignment updated" : "Assignment created";
    form.reset();
    assignmentId.value = "";
    loadAssignments();
  } else {
    message.textContent = "Please fill in all fields";
  }
});

loadAssignments();
