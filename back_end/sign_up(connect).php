<?php
// Database connection details
$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$dbname = "recyclocarts"; 

// Create a database connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
if ($conn->connect_error) {
    die("Database Connection Failed: " . $conn->connect_error);
} else {
    echo "Database Connected Successfully!";
}


// Retrieve form data
$first_name = trim($_POST['First_Name']);
$last_name = trim($_POST['Last_Name']);
$email_id = trim($_POST['Email_id']);
$username = trim($_POST['Username']);
$password = trim($_POST['Password']);
$confirm_password = trim($_POST['Confirm_Password']);

// Validate form fields
if (empty($first_name) || empty($last_name) || empty($email_id) || empty($username) || empty($password) || empty($confirm_password)) {
    die("All fields are required.");
}

// Check if passwords match
if ($password !== $confirm_password) {
    die("Passwords do not match.");
}

// Hash the password
$hashed_password = password_hash($password, PASSWORD_BCRYPT);

// ✅ Check if Username or Email already exists BEFORE inserting
$check_user_sql = "SELECT Username FROM sign_up WHERE Username = ? OR Email_id = ?";
$check_stmt = $conn->prepare($check_user_sql);
$check_stmt->bind_param("ss", $username, $email_id);
$check_stmt->execute();
$check_stmt->store_result();

if ($check_stmt->num_rows > 0) {
    die("Error: Username or Email already exists.");
}
$check_stmt->close();

// ✅ Insert user into database
$sql = "INSERT INTO sign_up (First_Name, Last_Name, Email_id, Username, Password) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $first_name, $last_name, $email_id, $username, $hashed_password);

if ($stmt->execute()) {
    // ✅ Redirect to log_in.html after successful signup
    header("Location: index.html");
    exit();
} else {
    echo "Error: " . $stmt->error;
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>
