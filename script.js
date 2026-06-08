// USER REGISTRATION 
function registerUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Check password match
    if (password !== confirmPassword) {
        alert("Password and Confirm Password do not match!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let existingUser = users.find(
        user => user.email === email
    );

    if (existingUser) {
        alert("User already registered with this email!");
        return;
    }

    users.push({
        email,
        username,
        password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration Successful!");
    window.location.href = "login.html";
}
// USER LOGIN 
function loginUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    let user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify(user));

        alert("Login Successful!");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Email or Password");
    }
}

// LOGOUT
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}

// ADD STUDENT
function addStudent(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;
    let branch = document.getElementById("branch").value;
    let cgpa = document.getElementById("cgpa").value;

    let students = JSON.parse(localStorage.getItem("students")) || [];

    // Check if roll number already exists
    let existingStudent = students.find(
        student => student.roll === roll
    );

    if (existingStudent) {
        alert("Student with this Roll Number already exists!");
        return;
    }

    students.push({
        name,
        roll,
        branch,
        cgpa
    });

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student Added Successfully!");

    window.location.href = "viewstudents.html";
}

// DISPLAY STUDENTS
function loadStudents() {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    let tableBody = document.getElementById("studentTableBody");

    if (!tableBody) return;

    tableBody.innerHTML = "";

    students.forEach((student, index) => {

        tableBody.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.branch}</td>
            <td>${student.cgpa}</td>
            <td>
                <a href="editstudents.html?index=${index}" class="update-btn">
                    Edit
                </a>

                <button onclick="deleteStudent(${index})" class="delete-btn">
                    Delete
                </button>
            </td>
        </tr>
        `;

    });
}

//EDIT STUDENT
function loadStudentForEdit() {

    let params = new URLSearchParams(window.location.search);
    let index = params.get("index");

    let students = JSON.parse(localStorage.getItem("students")) || [];

    if(index === null || !students[index]) return;

    document.getElementById("name").value = students[index].name;
    document.getElementById("roll").value = students[index].roll;
    document.getElementById("branch").value = students[index].branch;
    document.getElementById("cgpa").value = students[index].cgpa;
}

// SAVE EDITED STUDENT
function updateStudent(event) {

    event.preventDefault();

    let params = new URLSearchParams(window.location.search);
    let index = params.get("index");

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students[index] = {
        name: document.getElementById("name").value,
        roll: document.getElementById("roll").value,
        branch: document.getElementById("branch").value,
        cgpa: document.getElementById("cgpa").value
    };

    localStorage.setItem("students", JSON.stringify(students));

    alert("Student updated successfully!");

    window.location.href = "viewstudents.html";
}

// DELETE STUDENT
function deleteStudent(index) {

    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.splice(index, 1);

    localStorage.setItem(
        "students",
        JSON.stringify(students)
    );

    loadStudents();
}