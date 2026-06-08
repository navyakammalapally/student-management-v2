# Student Management System

## Description
A Student Management System developed using HTML, CSS, and JavaScript. The application allows users to register, log in, add students, edit student details, view student records, and delete students. Data is stored using the browser's Local Storage.

## Features

### User Authentication
- User Registration
- Confirm Password Validation
- Duplicate Email Check
- User Login
- Logout Functionality

### Student Management
- Add New Student
- View Students
- Edit Student Information
- Delete Student
- Prevent Duplicate Roll Numbers

### Storage
- Local Storage based data persistence
- No external database required

### User Interface
- Responsive Design
- Navigation Menu
- Styled Tables
- Dashboard Quick Access Buttons

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Local Storage

## Project Structure

## Project Structure

```text
student-management-v2/
│
├── index.html              # Home Page
├── register.html           # User Registration Page
├── login.html              # User Login Page
├── dashboard.html          # Dashboard Page
├── addstudents.html        # Add Student Page
├── viewstudents.html       # View Students Page
├── editstudents.html       # Edit Student Page
├── logout.html             # Logout Page
├── styles.css              # CSS Styling
├── script.js               # Authentication & Student Management Logic
└── README.md               # Project Documentation
```

## Functionalities

### Registration
- Users can create an account.
- Duplicate email registration is prevented.
- Password and Confirm Password must match.

### Login
- Only registered users can log in.

### Add Student
- Add student details including:
  - Name
  - Roll Number
  - Branch
  - CGPA
- Duplicate roll numbers are not allowed.

### View Students
- Displays all student records in a table.

### Edit Student
- Modify existing student details.
- Updated information is saved to Local Storage.

### Delete Student
- Remove student records from Local Storage.

## Live Demo

 https://navyakammalapally.github.io/student-management-v2/


## Author
Developed as a Student Management System project using HTML, CSS, and JavaScript.
