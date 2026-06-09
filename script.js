// USER REGISTRATION
function registerUser(event) {
    event.preventDefault();

    let email = document.getElementById("email").value.trim();
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    // Regular Expressions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{4,15}$/;
    const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!emailRegex.test(email)) {
        alert("Enter a valid email address!");
        return;
    }

    if (!usernameRegex.test(username)) {
        alert("Username must be 4-15 characters and contain only letters, numbers, and underscore.");
        return;
    }

    if (!passwordRegex.test(password)) {
        alert("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
        return;
    }

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

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Enter a valid email address!");
        return;
    }

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

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let branch = document.getElementById("branch").value.trim();
    let cgpa = document.getElementById("cgpa").value.trim();

    // Regular Expressions
    const nameRegex = /^[A-Za-z ]{3,50}$/;
    const rollRegex = /^[A-Za-z0-9]{4,15}$/;
    const cgpaRegex = /^(10(\.0)?|[0-9](\.[0-9]{1,2})?)$/;

    if (!nameRegex.test(name)) {
        alert("Name should contain only letters and spaces (3-50 characters).");
        return;
    }

    if (!rollRegex.test(roll)) {
        alert("Roll Number must be 4-15 alphanumeric characters.");
        return;
    }

    if (!cgpaRegex.test(cgpa) || parseFloat(cgpa) > 10) {
        alert("Enter a valid CGPA between 0 and 10.");
        return;
    }

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

// EDIT STUDENT
function loadStudentForEdit() {

    let params = new URLSearchParams(window.location.search);
    let index = params.get("index");

    let students = JSON.parse(localStorage.getItem("students")) || [];

    if (index === null || !students[index]) return;

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

    let name = document.getElementById("name").value.trim();
    let roll = document.getElementById("roll").value.trim();
    let branch = document.getElementById("branch").value.trim();
    let cgpa = document.getElementById("cgpa").value.trim();

    // Regular Expressions
    const nameRegex = /^[A-Za-z ]{3,50}$/;
    const rollRegex = /^[A-Za-z0-9]{4,15}$/;
    const cgpaRegex = /^(10(\.0)?|[0-9](\.[0-9]{1,2})?)$/;

    if (!nameRegex.test(name)) {
        alert("Name should contain only letters and spaces.");
        return;
    }

    if (!rollRegex.test(roll)) {
        alert("Roll Number must be 4-15 alphanumeric characters.");
        return;
    }

    if (!cgpaRegex.test(cgpa) || parseFloat(cgpa) > 10) {
        alert("Enter a valid CGPA between 0 and 10.");
        return;
    }

    students[index] = {
        name,
        roll,
        branch,
        cgpa
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